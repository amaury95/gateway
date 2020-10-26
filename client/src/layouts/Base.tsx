import { Container, makeStyles } from "@material-ui/core";
import Footer from "components/footer";
import Header from "components/header";
import React, { FunctionComponent } from "react";

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
      <div className={classes.content}>{children}</div>
      <Footer />
    </Container>
  );
};

export default Base;
