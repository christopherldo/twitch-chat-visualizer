# Twitch Chat Visualizer - Infrastructure

This module provisions the AWS Free Tier infrastructure using Pulumi.

## Prerequisites

- [Pulumi CLI](https://www.pulumi.com/docs/install/)
- AWS Credentials configured locally (e.g., `aws configure`)

## Configuration (Secrets)

Before running the deployment, you **must** configure the database password. We use Pulumi's secret management to ensure this is never stored in plain text.

Run the following command in this directory (`apps/infra`):

```bash
pulumi config set --secret dbPassword "suaSenhaMuitoSeguraAqui123!"
```

*This will encrypt the password and save it in your local Pulumi stack configuration.*

## Deployment

To preview the infrastructure changes:

```bash
pulumi preview
```

To provision the infrastructure on AWS:

```bash
pulumi up
```

## Destroy

To tear down all resources and stop incurring charges (if outside Free Tier):

```bash
pulumi destroy
```
