import "../styles/globals.css";
// eslint-disable-next-line camelcase
import "@fontsource/open-sans";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useLocalStorageState from "use-local-storage-state";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import React from "react";

import { AppState } from "../src/types";
import { AppContext } from "../src/components/AppContext";

Bugsnag.start({
  apiKey: "04e95878207d41d2da7c5d058cc3e3be",
  plugins: [new BugsnagPluginReact()],
});

const ErrorBoundary = Bugsnag.getPlugin("react")?.createErrorBoundary(React);

const theme = createTheme({
  typography: {
    fontFamily: ["Open Sans", "Helvetica"].join(","),
  },
});

function MyApp({ Component, pageProps }): JSX.Element {
  const [appState, setAppState] = useLocalStorageState<AppState>("appState");
  const setWithConsole = (state: AppState) => {
    console.log(JSON.stringify(state));
    setAppState(state);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "1 1 auto",
      }}
    >
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={[appState, setWithConsole]}>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </AppContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
