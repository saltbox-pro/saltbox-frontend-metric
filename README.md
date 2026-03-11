# Salt.Box Frontend Metric

Metrics/monitoring microfrontend for the Salt.Box platform. Registers settings menu items (Grafana Dashboard, Logs) when the `metric` service is present in discovery config. Uses `href` for same-origin links to Grafana.

## Development

```bash
yarn install
yarn start
```

Serves at port 4206. The module is loaded by root-config when the `metric` service is available in `/api/discovery/config`.
