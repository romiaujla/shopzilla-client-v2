import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./Components/App/App";
import { ShopListProvider } from "./Contexts/ShopListContext";
import { ShopProvider } from "./Contexts/ShopContext";
import { LoggedProvider } from "./Contexts/LoggedContext";

ReactDOM.render(
  <BrowserRouter>
    <LoggedProvider>
      <ShopListProvider>
        <ShopProvider>
          <App />
        </ShopProvider>
      </ShopListProvider>
    </LoggedProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
