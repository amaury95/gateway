import { State } from "./types";
import {
  Action,
  INotificationAction,
  SET_NOTIFICATION,
  DEL_NOTIFICATION,
  CLS_NOTIFICATION,
  TOGGLE_THEME,
  SET_GATEWAY_FORM,
  ISetGatewayFormAction,
  SET_PERIPHERAL_FORM,
  ISetPeripheralFormAction,
} from "./actions";

export const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    // NOTIFICATIONS
    case SET_NOTIFICATION: {
      const { payload } = action as INotificationAction;
      return {
        ...state,
        notifications: [...state.notifications, payload],
      };
    }
    case DEL_NOTIFICATION: {
      const { payload } = action as INotificationAction;
      return {
        ...state,
        notifications: state.notifications.filter((n) => n !== payload),
      };
    }
    case CLS_NOTIFICATION: {
      return { ...state, notifications: [] };
    }

    // THEME
    case TOGGLE_THEME: {
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    }

    // GATEWAY FORM
    case SET_GATEWAY_FORM: {
      const { payload } = action as ISetGatewayFormAction;
      return { ...state, gatewayForm: payload };
    }

    // PERIPHERAL FORM
    case SET_PERIPHERAL_FORM: {
      const { payload } = action as ISetPeripheralFormAction;
      return { ...state, peripheralForm: payload };
    }

    // Nothing matched
    default: {
      return state;
    }
  }
};
