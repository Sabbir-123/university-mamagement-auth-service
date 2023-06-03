import cors from "cors";
import express, { Application } from "express";
import userRoute from "../src/app/modules/users/user.route";
import globalErrorHandler from "./app/middlewares/global.errorHandler";
const app: Application = express();

app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application
app.get("env");
app.use("/api/v1/users/", userRoute);

// //testing
// app.get("/", async (req: Request, res: Response, next:NextFunction) => {
//   // res.send("Server is working");
//   // next("orrree bababa error")
//   throw new Error('oore')
// });

// global error handler
app.use(globalErrorHandler);

export default app;
