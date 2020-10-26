import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./router";

dotenv.config();
const port = process.env.SERVER_PORT;

mongoose.connect(process.env.MONGO_ADDR, { useNewUrlParser: true });

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  // tslint:disable-next-line:no-console
  console.log(
    Intl.DateTimeFormat("en").format(Date.now()),
    req.method,
    req.path,
    req.body
  );
  next();
});

app.use("/api", router);

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
