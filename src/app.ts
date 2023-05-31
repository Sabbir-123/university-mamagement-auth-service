import express, { Application, Request, Response } from "express";
const app: Application = express();
import userRoute from "../src/app/modules/users/user.route";
import cors from "cors";

app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application
app.use("/api/v1/users/", userRoute);

//testing
app.get("/", async (req: Request, res: Response) => {
  res.send("Server is working");
});

export default app;
