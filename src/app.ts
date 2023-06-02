import cors from "cors";
import express, { Application, Request, Response } from "express";
import userRoute from "../src/app/modules/users/user.route";
const app: Application = express();

app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application
app.get("env");
app.use("/api/v1/users/", userRoute);

//testing
app.get("/", async (req: Request, res: Response) => {
  res.send("Server is working");
});

export default app;
