const path = require("path");
const mustacheExpress = require("mustache-express");

const VIEW_PATH = path.join(__dirname, "/views");

function configureViewEngine(server) {
  server.engine(
    "mustache",
    mustacheExpress(path.join(VIEW_PATH, "partials"), ".mustache")
  );
  server.set("view engine", "mustache");
  server.set("views", VIEW_PATH);
}

module.exports = { configureViewEngine };
