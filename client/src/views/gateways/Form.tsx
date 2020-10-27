import { gql, useMutation } from "@apollo/client";
import { IconButton, TextField } from "@material-ui/core";
import Form, { TransitionDown, useStyles } from "components/form";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Gateway } from "models";
import React, { useContext } from "react";
import { Store } from "store";
import { SetNotification } from "store/actions";

const ADD_GATEWAY = gql`
  mutation CreateGateway($serial: String, $name: String, $address: String) {
    createGateway(serial: $serial, name: $name, address: $address) {
      id
      serial
      name
      address
    }
  }
`;
const EDIT_GATEWAY = gql`
  mutation UpdateGatwway($id: ID!, $serial: String, $name: String, $address: String) {
    updateGateway(id: $id, name: $name, serial: $serial, address: $address) {
      id
      name
      serial
      address
      edges {
        peripherals {
          id
          gatewayId
          uid
          vendor
          created
          status
        }
      }
    }
  }
`;

const DESTROY_GATEWAY = gql`
  mutation DeleteGateway($id: ID!) {
    deleteGateway(id: $id) {
      id
    }
  }
`;

export interface FormProps<T> {
  target: T;
  setTarget: (val: T) => void;
  open: boolean;
  handleClose: () => void;
}

export default function GatewayForm(props: FormProps<Gateway>) {
  const { target, setTarget } = props;

  const classes = useStyles();
  const { dispatch } = useContext(Store);

  const newItem = target.id === undefined;

  const formTitle = newItem ? "Create Gateway" : "Edit Gateway";
  const successMessage = newItem ? "Gateway created" : "Gateway saved";
  const mutation = newItem ? ADD_GATEWAY : EDIT_GATEWAY;

  const [addGateway] = useMutation(mutation, { errorPolicy: "all" });

  const onSubmit = () => {
    addGateway({ variables: target }).then(({ errors }) => {
      if (errors) {
        errors.forEach((err) => {
          dispatch(SetNotification(err.extensions?.response.body.error, "error"));
        });
      } else {
        dispatch(SetNotification(successMessage, "success"));
        props.handleClose();
      }
    });
  };

  const [removeGateway] = useMutation(DESTROY_GATEWAY, { errorPolicy: "all" });

  const onRemove = () =>
    removeGateway({ variables: target }).then(({ errors }) => {
      if (errors) {
        errors.forEach((err) => {
          dispatch(SetNotification(err.extensions?.response.body.error, "error"));
        });
      } else {
        dispatch(SetNotification("Gateway deleted", "warning"));
        props.handleClose();
      }
    });

  return (
    <Form
      direction={TransitionDown}
      title={formTitle}
      open={props.open}
      handleClose={props.handleClose}
      onSubmit={onSubmit}
    >
      {!newItem && (
        <IconButton className={classes.topRight} onClick={onRemove}>
          <DeleteOutlineIcon className={classes.removeIcon} />
        </IconButton>
      )}

      <TextField
        fullWidth
        value={target.name}
        placeholder="Name"
        className={classes.input}
        onChange={(e) => setTarget({ ...target, name: e.target.value })}
      />
      <TextField
        fullWidth
        value={target.serial}
        placeholder="Serial"
        className={classes.input}
        onChange={(e) => setTarget({ ...target, serial: e.target.value })}
      />
      <TextField
        fullWidth
        value={target.address}
        placeholder="IPv4 Address"
        className={classes.input}
        onChange={(e) => setTarget({ ...target, address: e.target.value })}
      />
    </Form>
  );
}
