import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";

import "./index.css";
import { store } from "./redux/store";

// Find the root element in the HTML document
const container = document.getElementById("root");

if (!container) {
  // Throw an error if the root element is not found in the document
  throw new Error("Root element not found.");
}

// Create a root and render the application
const root = ReactDOM.createRoot(container as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
