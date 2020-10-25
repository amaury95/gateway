import Form, { TransitionDown } from "components/form";
import { Gateway } from "models";
import React, { useContext } from "react";
import { Store } from "store";
import { SetGatewayForm } from "store/actions";

export default function GatewayForm() {
  const { state, dispatch } = useContext(Store);

  const { item, status } = state.gatewayForm;
  const setItem = (value: Gateway) => dispatch(SetGatewayForm(item, status));

  const handleClose = () => dispatch(SetGatewayForm(item, "closed"));

  const onSubmit = () => {};

  const formTitle = item.id === undefined ? "Create Gateway" : "Edit Gateway";
  return (
    <Form
      direction={TransitionDown}
      title={formTitle}
      open={status === "open"}
      handleClose={handleClose}
      onSubmit={onSubmit}
    ></Form>
  );
}
