import React, { useContext } from "react";
import BaseLayout from "layouts/Base";
import Gateways from "views/gateways/List";
import { Store } from "store";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { defaultTheme } from "themes/default";
import GatewaysProvider from "views/gateways/Provider";

function App() {
  const { state } = useContext(Store);

  const theme = createMuiTheme({
    ...defaultTheme,
    palette: {
      ...defaultTheme.palette,
      type: state.theme,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BaseLayout>
        <GatewaysProvider />
      </BaseLayout>
    </ThemeProvider>
  );
}

export default App;
