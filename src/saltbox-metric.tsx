import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";

import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Root,
  domElementGetter: () => document.getElementById("app-container"),
});

export const saltboxModule = {
  singleSpaLifecycle: lifecycles,
  name: "saltbox-frontend-metric",
  path: "/metric",
  settingsConfig: {
    priority: 25,
    key: "monitoring",
    label: "Monitoring",
    children: [
      {
        key: "dashboard",
        label: { en: "Dashboard", ru: "Дашборд" },
        icon: "dashboard",
        href: "/grafana",
      },
      {
        key: "logs",
        label: { en: "Logs", ru: "Логи" },
        icon: "history",
        href: "/grafana/a/grafana-lokiexplore-app",
      },
    ],
  },
};
