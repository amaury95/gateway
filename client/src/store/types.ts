import { Color } from "@material-ui/lab/Alert";
import { Action } from "./actions";

export class Notification {
  constructor(public type: Color, public message: string, public key: number) {}
}

export interface State {
  theme: "light" | "dark";
  notifications: Notification[];
}

export interface StoreType {
  state: State;
  dispatch: React.Dispatch<Action>;
}
