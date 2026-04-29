import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as tls from '@pulumi/tls';

// 1. Configurações e Networking base
const config = new pulumi.Config();
// Requer que o usuário configure a senha (pulumi config set --secret dbPassword "suaSenhaSegura")
const dbPassword = config.requireSecret('dbPassword');

// Gera uma chave SSH privada/pública dinamicamente para o EC2
const sshKey = new tls.PrivateKey('ec2-ssh-key', {
  algorithm: 'RSA',
  rsaBits: 4096,
});

// Registra a chave pública na AWS
const awsKeyPair = new aws.ec2.KeyPair('web-keypair', {
  keyName: 'twitch-chat-visualizer-key',
  publicKey: sshKey.publicKeyOpenssh,
});

// Utilizando a VPC padrão e suas sub-redes (ótimo para projetos simples/Free Tier)
const vpc = aws.ec2.getVpcOutput({ default: true });
const subnets = aws.ec2.getSubnetsOutput({
  filters: [{ name: 'vpc-id', values: [vpc.id] }],
});

// 2. Security Groups
// SG Público para o EC2 (Servidor Web & API)
const webSg = new aws.ec2.SecurityGroup('web-sg', {
  description: 'Allow HTTP, HTTPS, SSH and Dev Ports',
  ingress: [
    { protocol: 'tcp', fromPort: 80, toPort: 80, cidrBlocks: ['0.0.0.0/0'] },
    { protocol: 'tcp', fromPort: 443, toPort: 443, cidrBlocks: ['0.0.0.0/0'] },
    { protocol: 'tcp', fromPort: 22, toPort: 22, cidrBlocks: ['0.0.0.0/0'] },
    // Permite tráfego para API se necessário teste direto
    { protocol: 'tcp', fromPort: 3000, toPort: 3000, cidrBlocks: ['0.0.0.0/0'] },
  ],
  egress: [{ protocol: '-1', fromPort: 0, toPort: 0, cidrBlocks: ['0.0.0.0/0'] }],
});

// SG Interno para o RDS e Redis
const dataSg = new aws.ec2.SecurityGroup('data-sg', {
  description: 'Allow internal access to Postgres and Redis from Web Server',
  ingress: [
    { protocol: 'tcp', fromPort: 5432, toPort: 5432, securityGroups: [webSg.id] }, // PostgreSQL
    { protocol: 'tcp', fromPort: 6379, toPort: 6379, securityGroups: [webSg.id] }, // Redis
  ],
  egress: [{ protocol: '-1', fromPort: 0, toPort: 0, cidrBlocks: ['0.0.0.0/0'] }],
});

// 3. Redis Cluster (ElastiCache - Free Tier eligible cache.t4g.micro ou cache.t2.micro)
const redisSubnetGroup = new aws.elasticache.SubnetGroup('redis-subnet-group', {
  subnetIds: subnets.ids,
});

const redisCluster = new aws.elasticache.Cluster('redis-cluster', {
  engine: 'redis',
  nodeType: 'cache.t4g.micro', // Free Tier Graviton2
  numCacheNodes: 1,
  parameterGroupName: 'default.redis7',
  engineVersion: '7.1',
  port: 6379,
  securityGroupIds: [dataSg.id],
  subnetGroupName: redisSubnetGroup.name,
});

// 4. PostgreSQL Database (RDS - Free Tier eligible db.t4g.micro)
const dbSubnetGroup = new aws.rds.SubnetGroup('db-subnet-group', {
  subnetIds: subnets.ids,
});

const postgresDb = new aws.rds.Instance('postgres-db', {
  engine: 'postgres',
  engineVersion: '16.13', // Versão suportada verificada na AWS
  instanceClass: 'db.t4g.micro', // Free Tier
  allocatedStorage: 20, // Free Tier contempla 20GB
  dbName: 'twitchchat',
  username: 'postgres',
  password: dbPassword,
  parameterGroupName: 'default.postgres16',
  skipFinalSnapshot: true,
  vpcSecurityGroupIds: [dataSg.id],
  dbSubnetGroupName: dbSubnetGroup.name,
});

// 5. Servidor Web / API (EC2 - Free Tier t4g.micro ARM64)
// Busca a AMI mais recente do Amazon Linux 2023 para ARM64
const ami = aws.ec2.getAmiOutput({
  mostRecent: true,
  owners: ['amazon'],
  filters: [{ name: 'name', values: ['al2023-ami-2023.*-arm64'] }],
});

// Script de inicialização (User Data) que instalará Docker, clonará o projeto e iniciará o compose
// Usa pulumi.all para desempacotar as Promises/Outputs e aplicar o interpolate de forma segura
const userData = pulumi.all([redisCluster.cacheNodes[0].address, postgresDb.address, dbPassword]).apply(([redisHost, dbHost, dbPass]) => `#!/bin/bash
# Atualiza e instala dependências básicas
sudo dnf update -y
sudo dnf install -y docker git
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker ec2-user

# Instala Docker Compose V2
mkdir -p /usr/local/lib/docker/cli-plugins
curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-aarch64 -o /usr/local/lib/docker/cli-plugins/docker-compose
chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# Cria pasta do projeto
mkdir -p /home/ec2-user/app
cd /home/ec2-user/app

# Cria o arquivo .env dinâmico com as URLs provisionadas pelo Pulumi
cat <<EOT >> .env
NODE_ENV=production
REDIS_URL=redis://${redisHost}:6379
DATABASE_URL=postgresql://postgres:${dbPass}@${dbHost}:5432/twitchchat
VITE_API_URL=http://localhost:3000
EOT

chown -R ec2-user:ec2-user /home/ec2-user/app

# Lembre-se de clonar o repositório ou copiar via CI/CD aqui antes de rodar o compose:
# git clone https://github.com/SEU-USUARIO/twitch-chat-visualizer.git .
# docker compose up -d
`);

const webServer = new aws.ec2.Instance('web-server', {
  instanceType: 't4g.micro',
  ami: ami.id,
  keyName: awsKeyPair.keyName,
  vpcSecurityGroupIds: [webSg.id],
  userData: userData,
  tags: {
    Name: 'twitch-chat-visualizer-ec2',
  },
});

// 6. Outputs para o usuário final
export const publicIp = webServer.publicIp;
export const publicDns = webServer.publicDns;
export const redisEndpoint = redisCluster.cacheNodes[0].address;
export const dbEndpoint = postgresDb.address;
// Exporta a chave privada (use com cuidado e não exponha em logs)
export const privateKey = sshKey.privateKeyPem;
