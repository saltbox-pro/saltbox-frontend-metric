<div align = right>

&ensp;[<kbd> <br> EN <br> </kbd>](./README.md)&ensp;
&ensp;[<kbd> <br> RU <br> </kbd>](./README_RU.md)&ensp;

</div>

---

# Salt.Box Frontend Metric

## Table of Contents

- **[About](#about)**
- **[Settings menu](#settings-menu)**
- **[Conditional loading](#conditional-loading)**
- **[Development](#development)**
- **[Build and deployment](#build-and-deployment)**


## About

**Salt.Box Frontend Metric** is a thin Single-SPA microfrontend that adds monitoring links to the Salt.Box web UI. It renders no UI of its own, the module's root component always returns `null`. Its only job is to contribute entries to the global settings menu that link out to Grafana.

The module is registered under the name `saltbox-frontend-metric` and mounted at the `/metric` path.

## Settings menu

The module registers a `Monitoring` menu group, with two items, each localized in English and Russian:

- **Dashboard**, key `dashboard`, linking to the Grafana dashboard at `/grafana/d/salt_box`
- **Logs**, key `logs`, linking to the Grafana Loki Explore app at `/grafana/a/grafana-lokiexplore-app`

Both items use plain same-origin `href` links rather than client-side routing, since they open Grafana directly instead of any view rendered by this module.

## Conditional loading

root-config mounts this module only when the `metric` service is reported in `/api/discovery/config` by the Gateway. That service is registered there by the Metric backend, so the Monitoring menu only appears when the Metric addon is actually enabled.

## Development

```bash
yarn install
yarn start
```

Serves at port `4206` via webpack-dev-server.

To develop against a local checkout of the shared `@saltbox/saltbox-frontend-common` package instead of the published one, set `COMMON_REPO_PATH` in a local `.env` file to its path. This aliases the package for the dev build only.

## Build and deployment

`yarn build` produces content-hashed assets plus a stable `index.js` entry shim that re-exports the hashed bundle, so the entry point root-config imports never changes between releases.

The build is served by nginx: hashed assets get long-lived immutable caching, while `index.js` and `index.html` are served with `no-cache`.

In `saltbox-metric-compose` the module is packaged as the `saltbox-metric-frontend` service, its image tag controlled by `METRIC_FRONTEND_IMAGE_TAG`, and proxied through the `10-metrics.conf` nginx include in `saltbox-compose`.
