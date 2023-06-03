/* eslint-disable no-undef */

import path from "path";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
const { combine, timestamp, label, prettyPrint, printf } = format;
//custom format

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return `${date.toDateString()} ${hour}:${minutes} } [${label}] ${level}: ${message}`;
});

// Create an instance of the info logger
const infoLogger = createLogger({
  level: "info",
  format: combine(
    label({ label: "PHU" }),
    timestamp({
      format: "ddd MMM DD YYYY HH:mm",
    }),
    myFormat,
    prettyPrint()
  ),
  transports: [
    // Log messages to the console
    new transports.Console(),
    // Log messages with a level of "info" or less to a file named "success.log"
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "winston",
        "successes",
        "phu-%DATE%-success.log"
      ),
      datePattern: "MM-DD-HH-YYYY",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

// Create an instance of the error logger
const errorLogger = createLogger({
  level: "error",
  format: combine(
    label({ label: "PHU" }),
    timestamp({
      format: "ddd MMM DD YYYY HH:mm",
    }),
    //   prettyPrint(),
    myFormat
  ),
  transports: [
    // Log messages to the console
    new transports.Console(),
    // Log messages with a level of "error" or less to a file named "error.log"

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "winston",
        "errors",
        "phu-%DATE%-error.log"
      ),
      datePattern: "MM-DD-HH-YYYY",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

export { infoLogger, errorLogger };
