require('dotenv').config();
const http = require('http');
const sockets = require('./sockets');
const ClientMiddleware = require('./app/middlewares/ClientMiddleware');

const app = require('./app');

const newClientMiddleware = new ClientMiddleware();

app.use(newClientMiddleware.clientMiddleware);

app.set('port', process.env.PORT || 3000);

const server = http.createServer(app);

sockets.startSocketServer(server);

server.listen(app.get('port'), () => {
  console.log(`Servidor rodando na porta: ${server.address().port}`)
});

module.exports = newClientMiddleware;