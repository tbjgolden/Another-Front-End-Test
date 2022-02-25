import React from "react";
import ReactDOM from "react-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { createTheme, BaseProvider } from "baseui";
import App from "./App";
import "./index.css";

const engine = new Styletron();

const Theme = createTheme(
  {
    primaryFontFamily: "objektiv",
  },
  {
    colors: {
      contentPrimary: "#2c938c",
      borderSelected: "#2c938c",
      backgroundPrimary: "rgb(247, 247, 245)",
    },
  }
);

ReactDOM.render(
  <StyletronProvider value={engine}>
    <BaseProvider theme={Theme}>
      <App />
    </BaseProvider>
  </StyletronProvider>,
  document.querySelector("#root")
);
