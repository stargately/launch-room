import { noopReducer } from "onefx/lib/iso-react-render/root/root-reducer";
import { Context } from "onefx/lib/types";
import * as React from "react";
import { AppContainer } from "@/shared/app-container";
import { apolloSSR } from "@/shared/common/apollo-ssr";
import { setEmailPasswordIdentityProviderRoutes } from "@/shared/onefx-auth-provider/email-password-identity-provider/email-password-identity-provider-handler";
import { setApiGateway } from "../api-gateway/api-gateway";
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
