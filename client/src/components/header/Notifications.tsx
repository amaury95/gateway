import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import React, { useContext } from "react";
import { Store } from "store";
import { DelNotification } from "store/actions";
import { Notification } from "store/types";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Notifications() {
  const { state, dispatch } = useContext(Store);

  const handleClose = (n: Notification) => dispatch(DelNotification(n));

  return (
    <div>
      {state.notifications.map((n) => (
        <Snackbar open={true} autoHideDuration={6000} onClose={() => handleClose(n)}>
          <Alert onClose={() => handleClose(n)} severity={n.type}>
            {n.message}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
}
