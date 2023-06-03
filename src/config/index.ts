/* eslint-disable no-undef */
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 9000,
  db: process.env.DB_URL,
  default_User_Pass: process.env.DEFAULT_USER_PASSWORD,
};
