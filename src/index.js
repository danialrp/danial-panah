import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// build/index.html is prerendered for crawlers (scripts/prerender.js). Browsers get a
// clean client render on top of it: hydrating that markup broke layouts (react-reveal
// inline styles and fetched data don't match on the first pass), so render() replaces
// it with the same content instead of trying to reuse the DOM.
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
