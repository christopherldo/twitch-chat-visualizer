/**
 * Copyright (c) 2026 Christopher Leonardo de Oliveira. Todos os direitos reservados.
 * Licenciado sob a PolyForm Noncommercial License 1.0.0.
 * O uso comercial deste software é estritamente proibido.
 */

require("dotenv").config();

const express = require("express");
const { configureMiddlewares } = require("./middlewares");
const { configureViewEngine } = require("./viewEngine");
const { startSocketServer } = require("./sockets");
const routes = require("./routes");

const server = express();

configureMiddlewares(server);
configureViewEngine(server);

server.use("/", routes);

const httpServer = require("http").createServer(server);

startSocketServer(httpServer);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${httpServer.address().port}`);
});

module.exports = server;
