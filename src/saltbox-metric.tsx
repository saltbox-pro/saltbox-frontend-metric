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

/**
 * Same contract as gateway/core: settingsConfig is added to menuStore by root-config
 * when this module is loaded (service "metric" in discovery). Uses href for links
 * to Grafana (same-origin); path is used for in-app routes in other modules.
 */
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
      {
        key: "test",
        label: { en: "Test", ru: "Тест" },
        icon: "history",
        href: "https://hobbygames.ru/warhammer",
      },
    ],
  },
  init: () => {
    // Optional init, same as gateway/core; no-op for metric.
  },
};
