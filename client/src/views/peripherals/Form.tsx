import { gql, useMutation } from "@apollo/client";
import {
  FormControl,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
} from "@material-ui/core";
import Form, { TransitionUp, useStyles } from "components/form";
import { Peripheral } from "models";
import React from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { FormProps } from "../gateways/Form";

const ADD_PERIPHERAL = gql`
  mutation CreatePeripheral(
    $uid: Int
    $gatewayId: String!
    $status: PeripheralStatus
    $vendor: String
    $created: String!
  ) {
    createPeripheral(
      uid: $uid
      gatewayId: $gatewayId
      status: $status
      vendor: $vendor
      created: $created
    ) {
      id
      uid
      gatewayId
      status
      vendor
      created
    }
  }
`;

const EDIT_PERIPHERAL = gql`
  mutation CreatePeripheral(
    $id: ID!
    $uid: Int
    $gatewayId: String!
    $status: PeripheralStatus
    $vendor: String
    $created: String!
  ) {
    updatePeripheral(
      id: $id
      uid: $uid
      gatewayId: $gatewayId
      status: $status
      vendor: $vendor
      created: $created
    ) {
      id
      uid
      gatewayId
      status
      vendor
      created
    }
  }
`;

const DESTROY_PERIPHERAL = gql`
  mutation DeletePeripheral($id: ID!) {
    deletePeripheral(id: $id) {
      id
    }
  }
`;

export default function PeripheralForm(props: FormProps<Peripheral>) {
  const classes = useStyles();
  const { target, setTarget } = props;

  const newItem = target.id === undefined;

  const formTitle = newItem ? "Create Peripheral" : "Edit Peripheral";
  const mutation = newItem ? ADD_PERIPHERAL : EDIT_PERIPHERAL;

  const [addPeripheral] = useMutation(mutation);

  const onSubmit = () => {
    const created = newItem
      ? new Intl.DateTimeFormat("en").format(Date.now())
      : target.created;

    addPeripheral({
      variables: { ...target, created },
    })
      .then(props.handleClose)
      .catch((e) => console.log(e));
  };

  const [removePeripheral] = useMutation(DESTROY_PERIPHERAL);

  const onRemove = () =>
    removePeripheral({ variables: target })
      .then(props.handleClose)
      .catch((e) => console.log(e));

  return (
    <Form
      direction={TransitionUp}
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
        placeholder="Uid"
        value={target.uid}
        className={classes.input}
        onChange={(e) =>
          setTarget({ ...target, uid: JSON.parse(e.target.value) })
        }
      />
      <TextField
        fullWidth
        value={target.vendor}
        placeholder="Vendor"
        className={classes.input}
        onChange={(e) => setTarget({ ...target, vendor: e.target.value })}
      />
      <FormControl fullWidth>
        <FormControlLabel
          control={
            <Switch
              checked={target.status === "online"}
              onChange={(e) =>
                setTarget({
                  ...target,
                  status: e.target.checked ? "online" : "offline",
                })
              }
            />
          }
          label={target.status}
        />
      </FormControl>
    </Form>
  );
}
