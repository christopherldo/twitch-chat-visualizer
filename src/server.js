require('dotenv').config();
const http = require('http');
const sockets = require('./sockets');

const app = require('./app');

app.set('port', process.env.PORT || 3000);

const server = http.createServer(app);

sockets.startSocketServer(server);

server.listen(app.get('port'), () => {
  console.log(`Servidor rodando na porta: ${server.address().port}`)
});