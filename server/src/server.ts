import express from "express";
import router from "./router";

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

export default app;
