import { Action } from "./actions";

export type NotificationType = "alert" | "success" | "warning";

export class Notification {
  constructor(public type: NotificationType, public message: string, public key: number) {}
}

export type ModalFormStatus = "open" | "closed";

export class ModalForm<T> {
  constructor(public status: ModalFormStatus, public item: T) {}
}

export interface State {
  theme: "light" | "dark";
  notifications: Notification[];
}

export interface StoreType {
  state: State;
  dispatch: React.Dispatch<Action>;
}
