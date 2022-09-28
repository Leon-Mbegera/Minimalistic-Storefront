import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./pages/components/App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createClient, Provider as UrqlProvider } from 'urql';

const client = createClient({
  url: "http://localhost:4000",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UrqlProvider value={client}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </UrqlProvider>
);