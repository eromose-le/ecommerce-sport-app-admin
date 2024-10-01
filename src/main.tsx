import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import App from "./App.tsx";
import "./index.css";
import theme from "../mui.config.ts";
import { CssBaseline } from "@mui/material";

import { Provider } from "react-redux";
import storeQ from "@/store/storeQ";
import { setupInterceptors } from "@/configs/HttpConfig";


setupInterceptors(storeQ);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={storeQ}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
