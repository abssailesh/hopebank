import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Correct import for React 18
import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import "./styles.css"; // ✅ Import global styles
import "bootstrap/dist/css/bootstrap.min.css";



// ✅ Create a root and use the new `createRoot` API
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);
