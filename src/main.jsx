import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          error: {
            style: { borderRadius: "40", color: "red" },
          },
          success: {
            style: { borderRadius: "40", color: "green" },
          },
          duration: 2000,
        }}
      />
    </BrowserRouter>
  </Provider>
);
