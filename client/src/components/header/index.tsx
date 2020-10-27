import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import ThemeMode from "./ThemeMode";
import IconButton from "@material-ui/core/IconButton";
import RouterIcon from "@material-ui/icons/Router";
import Notifications from "./Notifications";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <>
      <Notifications />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <RouterIcon fontSize="large" />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            Gateways
          </Typography>
          <ThemeMode />
        </Toolbar>
      </AppBar>
    </>
  );
}
