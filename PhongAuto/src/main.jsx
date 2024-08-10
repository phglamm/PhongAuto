import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoute from "./routes/AppRoute.jsx";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-image-gallery/styles/css/image-gallery.css";

import "bootstrap/dist/css/bootstrap.min.css";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppRoute />
    <ToastContainer />
  </BrowserRouter>
);
