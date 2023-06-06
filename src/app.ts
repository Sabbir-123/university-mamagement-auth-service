/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from "cors";
import express, { Application } from "express";
import globalErrorHandler from "./app/middlewares/global.errorHandler";
import { UserRoutes } from "./app/modules/users/user.route";
const app: Application = express();

app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application
app.get("env");
app.use("/api/v1/users/", UserRoutes);

// //testing
// app.get("/", async(req: Request, res: Response,) => {
//   throw new Error("Testing")
// });

// global error handler
app.use(globalErrorHandler);

export default app;
