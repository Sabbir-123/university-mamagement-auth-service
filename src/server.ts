/* eslint-disable no-undef */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import { errorLogger, infoLogger } from "./shared/logger";

let server: Server;

process.on("uncaughtException", (err) => {
  errorLogger.error("Uncaught Exception deteced", err);
  process.exit(1);
});

async function prod() {
  try {
    await mongoose.connect(config.db as string, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    infoLogger.info(" 🛢️ Connected to database");
    server = app.listen(config.port, () => {
      infoLogger.info(` app listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error("Failed to connect", err);
  }

  process.on("unhandledRejection", (err) => {
    if (server) {
      server.close(() => {
        errorLogger.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

prod();

process.on("SIGTERM", () => {
  errorLogger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
