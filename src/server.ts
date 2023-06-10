/* eslint-disable no-undef */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import { errorLogger, infoLogger } from "./shared/logger";

process.on("uncaughtException", (err) => {
  errorLogger.error("Uncaught Exception deteced", err);
  process.exit(1);
});
let server: Server;
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

// process.on("SIGTERM", () => {
//   errorLogger.info("SIGTERM received");
//   if (server) {
//     server.close();
//   }
// });

// "scripts": {
//     "start": "ts-node-dev --respawn --exit-child --transpile-only ./src/server.ts ",
//     "lint:check": "eslint --ignore-path .eslintignore --ext .js,.ts .",
//     "lint:fix": "eslint . --fix",
//     "prettier:check": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\"",
//     "prettier:fix": "prettier --write ",
//     "lint-prettier": "npm run lint:check && npm run prettier:check",
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "prepare": "husky install"
//   },
