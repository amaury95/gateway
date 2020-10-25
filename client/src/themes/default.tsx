import { ThemeOptions } from "@material-ui/core";
import { grey, blueGrey } from "@material-ui/core/colors";

export const defaultFonts = "Roboto, Helvetica Neue, Helvetica, sans-serif";

export const defaultTheme: ThemeOptions = {
  palette: {
    secondary: grey,
    primary: blueGrey,
  },
  typography: {
    fontFamily: defaultFonts,
    h2: {
      fontSize: 44,
      fontWeight: "lighter",
      lineHeight: 1.09091,
      letterSpacing: "-.002em",
      fontStyle: "normal",
    },
  },
  shape: {
    borderRadius: 5,
  },
};
