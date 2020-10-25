import { Gateway, Peripheral } from "models";
import {
  ModalForm,
  ModalFormStatus,
  Notification,
  NotificationType,
} from "./types";

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

export function SetNotification(
  message: string,
  type: NotificationType
): INotificationAction {
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

// ************
// GATEWAY FORM
// ************
export const SET_GATEWAY_FORM = "set_gateway_form";

export interface ISetGatewayFormAction extends IAction {
  payload: ModalForm<Gateway>;
}

export function SetGatewayForm(
  item: Gateway,
  status: ModalFormStatus
): ISetGatewayFormAction {
  return { type: SET_GATEWAY_FORM, payload: new ModalForm(status, item) };
}

// ***************
// PERIPHERAL FORM
// ***************
export const SET_PERIPHERAL_FORM = "set_peripheral_form";

export interface ISetPeripheralFormAction extends IAction {
  payload: ModalForm<Peripheral>;
}

export function SetPeripheralForm(
  item: Peripheral,
  status: ModalFormStatus
): ISetPeripheralFormAction {
  return { type: SET_PERIPHERAL_FORM, payload: new ModalForm(status, item) };
}

// *****************
// UNION TYPE ACTION
// *****************
export type Action =
  | IAction
  | INotificationAction
  | ISetGatewayFormAction
  | ISetPeripheralFormAction;
