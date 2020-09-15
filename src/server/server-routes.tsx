import { noopReducer } from "onefx/lib/iso-react-render/root/root-reducer";
import { Context } from "onefx/lib/types";
import * as React from "react";
import { AppContainer } from "@/shared/app-container";
import { apolloSSR } from "@/shared/common/apollo-ssr";
import { setEmailPasswordIdentityProviderRoutes } from "@/shared/onefx-auth-provider/email-password-identity-provider/email-password-identity-provider-handler";
import { setApiGateway } from "@/api-gateway/api-gateway";
import { MyServer } from "./start-server";

export function setServerRoutes(server: MyServer): void {
  // Health checks
  server.get("health", "/health", (ctx: Context) => {
    ctx.body = "OK";
  });

  setApiGateway(server);
  setEmailPasswordIdentityProviderRoutes(server);

  server.get("get-sdk-goals", "/sdk/goals/:clientId", async (ctx: Context) => {
    ctx.response.body = [];
  });

  server.all("get-diagnostic", "/diagnostic", async (ctx: Context) => {
    const requestSample = {
      kind: "diagnostic-init",
      id: {
        diagnosticId: "ea498bfc-ef7d-4192-96d0-fd734b76aabd",
        sdkKeySuffix: "ide-id",
      },
      creationDate: 1600056058649,
      sdk: { name: "node-server-sdk", version: "5.13.4" },
      configuration: {
        customBaseURI: true,
        customStreamURI: false,
        customEventsURI: true,
        eventsCapacity: 10000,
        connectTimeoutMillis: 5000,
        socketTimeoutMillis: 5000,
        eventsFlushIntervalMillis: 5000,
        pollingIntervalMillis: 30000,
        reconnectTimeMillis: 1000,
        streamingDisabled: true,
        usingRelayDaemon: false,
        offline: false,
        allAttributesPrivate: false,
        inlineUsersInEvents: false,
        userKeysCapacity: 1000,
        userKeysFlushIntervalMillis: 300000,
        usingProxy: false,
        usingProxyAuthenticator: false,
        diagnosticRecordingIntervalMillis: 900000,
        dataStoreType: "custom",
      },
      platform: {
        name: "Node",
        osArch: "x64",
        osName: "MacOS",
        osVersion: "19.5.0",
        nodeVersion: "12.16.2",
      },
    };
    console.log(requestSample);
    ctx.response.body = "{}";
  });

  server.all("get-latest-all", "/sdk/latest-all", async (ctx: Context) => {
    ctx.response.body = JSON.stringify({
      flags: {
        flagKey: {
          key: "flagKey",
          version: 5586,
          on: false,
          offVariation: 0,
          variations: [
            {
              announcements: {
                version: 5586,
                flagVersion: 1,
                value: "false",
                variation: 1,
                trackEvents: false,
              },
            },
          ],
        },
      },
      segments: {},
    });
  });

  server.get(
    "get-eval",
    "/sdk/evalx/:clientId/users/:userBase64",
    async (ctx: Context) => {
      const buff = Buffer.from(ctx.params.userBase64, "base64");
      const text = buff.toString("utf8");
      const user = JSON.parse(text);

      let announcementsValue = false;
      if (
        ["puncsky@gmail.com", "email@example.com"].indexOf(user?.email) !== -1
      ) {
        announcementsValue = true;
      }

      ctx.response.body = {
        announcements: {
          version: 5586,
          flagVersion: 1,
          value: announcementsValue,
          variation: 1,
          trackEvents: false,
        },
      };
    }
  );

  server.post(
    "check-events-bulk",
    "/events/bulk/:clientId",
    async (ctx: Context) => {
      ctx.response.status = 202;
    }
  );

  server.get("SPA", /^(?!\/?api-gateway\/).+$/, async (ctx: Context) => {
    ctx.setState("base.nonce", ctx.state.nonce);

    ctx.body = await apolloSSR(ctx, {
      VDom: <AppContainer />,
      reducer: noopReducer,
      clientScript: "/main.js",
    });
  });
}
