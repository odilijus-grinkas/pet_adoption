import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import MainRouter from "./routes/MainRouter.tsx"
import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./components/Layout/Layout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <MainRouter />
    </Layout>
  </React.StrictMode>
);
