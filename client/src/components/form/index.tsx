import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import React, { FunctionComponent } from "react";

type FormDirection = "left" | "right" | "up" | "down";

export const TransitionUp = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const TransitionDown = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

type FormProps = {
  direction: typeof TransitionDown;

  open: boolean;
  handleClose: () => void;

  title: string;
  description?: string;

  onSubmit: () => void;
};

const Form: FunctionComponent<FormProps> = (props) => {
  const { direction, open, handleClose, onSubmit } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={direction}
      aria-labelledby="alert-dialog-peripheral-title"
      aria-describedby="alert-dialog-peripheral-description"
    >
      <DialogTitle id="alert-dialog-peripheral-title">
        {props.title}
      </DialogTitle>
      <DialogContent>
        {props.description && (
          <DialogContentText id="alert-dialog-peripheral-description">
            {props.description}
          </DialogContentText>
        )}
        {props.children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default" variant="outlined">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary" variant="outlined">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Form;
