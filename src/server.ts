import { Server } from "http";
import { app } from "./app";
import envConfig from "./envConfig";

const server: Server = app.listen(envConfig.port, () => {
  console.log("server running on port", envConfig.port);
});

const existHandler = () => {
  if (server) {
    server.close((err) => {
      console.log("server is closed", err);
    });
  }
  process.exit(1);
};

const unexpectedErrorHandler = (err: Error) => {
  console.log(err);
  existHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
