import { gql, useMutation } from "@apollo/client";
import { IconButton, TextField } from "@material-ui/core";
import Form, { TransitionDown, useStyles } from "components/form";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Gateway } from "models";
import React from "react";

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
  mutation UpdateGatwway(
    $id: ID!
    $serial: String
    $name: String
    $address: String
  ) {
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
  const classes = useStyles();
  const { target, setTarget } = props;

  const newItem = target.id === undefined;

  const formTitle = newItem ? "Create Gateway" : "Edit Gateway";
  const mutation = newItem ? ADD_GATEWAY : EDIT_GATEWAY;

  const [addGateway] = useMutation(mutation);

  const onSubmit = () =>
    addGateway({ variables: target })
      .then(props.handleClose)
      .catch((e) => console.log(e));

  const [removeGateway] = useMutation(DESTROY_GATEWAY);

  const onRemove = () =>
    removeGateway({ variables: target })
      .then(props.handleClose)
      .catch((e) => console.log(e));

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
        placeholder="IPv4"
        className={classes.input}
        onChange={(e) => setTarget({ ...target, address: e.target.value })}
      />
    </Form>
  );
}
