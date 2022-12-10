import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./context/auth-context";
import { OrdersContextProvider } from "./context/orders-context";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <AuthContextProvider>
    <OrdersContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </OrdersContextProvider>
  </AuthContextProvider>,
  rootElement
);
