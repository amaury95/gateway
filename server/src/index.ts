import mongoose from "mongoose";
import app from "./server";

import { port, dbaddr, env } from "./setup";

mongoose.connect(dbaddr(env), { useNewUrlParser: true });

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
