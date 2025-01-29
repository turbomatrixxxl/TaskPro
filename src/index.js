import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/variables.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";

// Correct basename for GitHub Pages
const basename = process.env.NODE_ENV === "production" ? "/TaskPro" : "/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter
        future={{
          v7_startTransition: true, // Enable startTransition for state updates
          v7_relativeSplatPath: true, // Enable relative path handling for splats
        }}
        basename={basename}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
