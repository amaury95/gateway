import mongoose from "mongoose";
import app from "./server";

import { host, port, dbaddr, env } from "./setup";

mongoose.connect(dbaddr(env), { useNewUrlParser: true });

app.listen(port, host, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://${host}:${port}`);
});
