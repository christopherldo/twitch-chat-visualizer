const cors = require("cors");
const express = require("express");
const ClientMiddleware = require("./app/middlewares/ClientMiddleware");
const helpers = require("./helpers");

const { PUBLIC_PATH } = require("./publicPaths");

function configureMiddlewares(server) {
  server.use(cors());
  server.enable("trust proxy");
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(express.static(PUBLIC_PATH));

  server.use((_, res, next) => {
    res.locals.helpers = { ...helpers };
    next();
  });

  const newClientMiddleware = new ClientMiddleware();
  server.use(newClientMiddleware.clientMiddleware);
}

module.exports = { configureMiddlewares };
