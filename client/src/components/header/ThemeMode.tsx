import { Switch } from "@material-ui/core";
import React, { useContext } from "react";
import { Store } from "store";
import { ToggleTheme } from "store/actions";

export default function ThemeMode() {
  const { state, dispatch } = useContext(Store);

  return <Switch checked={state.theme === "dark"} onChange={() => dispatch(ToggleTheme())} />;
}
