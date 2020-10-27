import { gql, useMutation } from "@apollo/client";
import { FormControl, FormControlLabel, IconButton, Switch, TextField } from "@material-ui/core";
import Form, { TransitionUp, useStyles } from "components/form";
import { Peripheral } from "models";
import React, { useContext } from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { FormProps } from "../gateways/Form";
import { Store } from "store";
import { SetNotification } from "store/actions";

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
  const { dispatch } = useContext(Store);
  const { target, setTarget } = props;

  const newItem = target.id === undefined;

  const formTitle = newItem ? "Create Peripheral" : "Edit Peripheral";
  const successMessage = newItem ? "Peripheral added" : "Peripheral saved";
  const mutation = newItem ? ADD_PERIPHERAL : EDIT_PERIPHERAL;

  const [addPeripheral] = useMutation(mutation, { errorPolicy: "all" });

  const onSubmit = () => {
    const created = newItem ? new Intl.DateTimeFormat("en").format(Date.now()) : target.created;

    addPeripheral({
      variables: { ...target, created },
    }).then(({ errors }) => {
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

  const [removePeripheral] = useMutation(DESTROY_PERIPHERAL, { errorPolicy: "all" });

  const onRemove = () =>
    removePeripheral({ variables: target }).then(({ errors }) => {
      if (errors) {
        errors.forEach((err) => {
          dispatch(SetNotification(err.extensions?.response.body.error, "error"));
        });
      } else {
        dispatch(SetNotification("Peripheral deleted", "warning"));
        props.handleClose();
      }
    });

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
        onChange={(e) => setTarget({ ...target, uid: JSON.parse(e.target.value) })}
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
