import Form, { TransitionUp } from "components/form";
import { Peripheral } from "models";
import React, { useContext, useState } from "react";
import { Store } from "store";
import { SetPeripheralForm } from "store/actions";

export default function PeripheralForm() {
  const { state, dispatch } = useContext(Store);

  const { item, status } = state.peripheralForm;
  const setItem = (value: Peripheral) =>
    dispatch(SetPeripheralForm(item, status));

  const handleClose = () => dispatch(SetPeripheralForm(item, "closed"));

  const onSubmit = () => {};

  const formTitle =
    item.id === undefined ? "Add New Peripheral" : "Edit Peripheral";

  return (
    <Form
      direction={TransitionUp}
      title={formTitle}
      open={status === "open"}
      handleClose={handleClose}
      onSubmit={onSubmit}
    ></Form>
  );
}
