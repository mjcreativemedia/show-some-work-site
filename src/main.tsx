import React from "react";
import ReactDOM from "react-dom/client";
import AdminPage from "./Admin";
import App from "./App";
import "./styles.css";

const isAdminRoute =
  window.location.pathname.replace(/\/$/, "").endsWith("/admin") ||
  window.location.search.includes("admin=1");
const Root = isAdminRoute ? AdminPage : App;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
