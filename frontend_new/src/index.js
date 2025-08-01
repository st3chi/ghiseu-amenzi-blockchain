import React from "react";

//Utils
import { createRoot } from "react-dom/client";

//Component
import App from "./App";

//Service Worker
import * as serviceWorker from "./serviceWorker";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
