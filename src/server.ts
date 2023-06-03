import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import { errorLogger, infoLogger } from "./shared/logger";

async function prod() {
  try {
    await mongoose.connect(config.db as string, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    infoLogger.info(" 🛢️ Connected to database");
    app.listen(config.port, () => {
      infoLogger.info(` app listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error("Failed to connect", err);
  }
}

prod();
