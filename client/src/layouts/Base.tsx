import { Container, makeStyles } from "@material-ui/core";
import Footer from "components/footer";
import Header from "components/header";
import React, { FunctionComponent } from "react";
import GatewayForm from "views/gateways/Form";
import PeripheralForm from "views/peripherals/Form";

const useStyles = makeStyles({
  content: {
    marginTop: 100,
  },
});

const Base: FunctionComponent = ({ children }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Header />
      <PeripheralForm />
      <GatewayForm />
      <div className={classes.content}>{children}</div>
      <Footer />
    </Container>
  );
};

export default Base;
