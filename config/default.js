const { config } = require("dotenv");
const { getEnvVar } = require("onefx/lib/env-var");

config();

const routePrefix = "/launch-room";

module.exports = {
  project: "web-onefx-boilerplate",
  server: {
    routePrefix,
    port: process.env.PORT || 4105,
    proxy: false,
    staticDir: "./dist",
    delayInitMiddleware: false,
    cookie: {
      secrets: ["insecure plain text", "insecure secret here"],
    },
    noSecurityHeadersRoutes: {
      [`${routePrefix}/diagnostic`]: true,
      [`${routePrefix}/api-gateway/`]: true,
      [`${routePrefix}/api/`]: true,
      [`${routePrefix}/events/`]: true,
      [`${routePrefix}/sdk/`]: true,
    },
    noCsrfRoutes: {
      [`${routePrefix}/diagnostic`]: true,
      [`${routePrefix}/api-gateway/`]: true,
      [`${routePrefix}/api/`]: true,
      [`${routePrefix}/events/`]: true,
      [`${routePrefix}/bulk`]: true,
      [`${routePrefix}/sdk/`]: true,
    },
  },
  ssm: {
    enabled: false,
  },
  gateways: {
    logger: {
      enabled: true,
      level: "debug",
    },
    mongoose: {
      uri: getEnvVar("MONGODB_URI", ""),
    },
  },
  analytics: {
    googleTid: "TODO: replace with your googleTid",
  },
  csp: {
    "default-src": ["none"],
    "manifest-src": ["self"],
    "style-src": ["self", "unsafe-inline", "https://fonts.googleapis.com/css"],
    "frame-src": [],
    "connect-src": [
      "self",
      "https://www.google-analytics.com/",
      ...(process.env.API_GATEWAY_URL ? [process.env.API_GATEWAY_URL] : []),
    ],
    "child-src": ["self"],
    "font-src": ["self", "data:", "https://fonts.gstatic.com/"],
    "img-src": ["*", "data:"],
    "media-src": ["self"],
    "object-src": ["self"],
    "script-src": ["self", "https://www.google-analytics.com/"],
  },
  loadSeedData: getEnvVar("LOAD_SEED_DATA", "true"),
};
