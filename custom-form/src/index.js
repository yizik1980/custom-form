import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./storage/store";
import App from "./App";
import "./index.css";
import { I18nProvider } from "./i18n/I18nContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <I18nProvider>
        <App />
      </I18nProvider>
    </Provider>
  // </React.StrictMode>
);
