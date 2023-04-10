import express, { Application, Response, Request } from "express";
import errorMiddelware from "./middlewares/erorr.middleware";
import routes from "./routes";
// import fileUpload from "express-fileupload";
const app: Application = express();
// error middlewear

// json parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/", routes);
// unknown route
app.use((_req: Request, res: Response) => {
  res.status(400).json({ message: "Ohh you are lost." });
});
app.use(errorMiddelware);

app.listen(4800, () => {
  console.log(`Server listen to port ${4800}`);
});
