import React from "react";
import ReactDOM from "react-dom";
import { renderApp } from '../src/components/app';

const reactRoot = window.document.getElementById("root");
renderApp().then(appComponent => {
  ReactDOM.render(appComponent, reactRoot);
});