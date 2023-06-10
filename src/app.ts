/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from "cors";
import express, { Application } from "express";
import globalErrorHandler from "./app/middlewares/global.errorHandler";
import routes from "./routes/routes";

const app: Application = express();

app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application
app.get("env");
// app.use("/api/v1/users/", UserRoutes);
// app.use("/api/v1/academic-semester/", SemesterRoutes);
app.use("/api/v1", routes);

// //testing
// app.get("/", async(req: Request, res: Response,) => {
//   throw new Error("Testing")
// });

// global error handler
app.use(globalErrorHandler);

export default app;
