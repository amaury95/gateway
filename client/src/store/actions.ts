import { Color } from "@material-ui/lab/Alert";
import { Notification } from "./types";

// Action interface
export interface IAction {
  type: string;
}

// *********************
// NOTIFICATIONS ACTIONS
// *********************
export const SET_NOTIFICATION = "set_notification";
export const DEL_NOTIFICATION = "del_notification";
export const CLS_NOTIFICATION = "cls_notification";

export interface INotificationAction extends IAction {
  payload: Notification;
}

let notif = 0;

export function SetNotification(message: string, type: Color): INotificationAction {
  return {
    type: SET_NOTIFICATION,
    payload: new Notification(type, message, notif++),
  };
}

export function DelNotification(payload: Notification): INotificationAction {
  return { type: DEL_NOTIFICATION, payload };
}

export function ClsNotification(): IAction {
  return { type: CLS_NOTIFICATION };
}

// *************
// THEME ACTIONS
// *************
export const TOGGLE_THEME = "toggle_theme";

export function ToggleTheme(): IAction {
  return { type: TOGGLE_THEME };
}

// *****************
// UNION TYPE ACTION
// *****************
export type Action = IAction | INotificationAction;
