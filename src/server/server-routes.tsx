import { noopReducer } from "onefx/lib/iso-react-render/root/root-reducer";
import { Context } from "onefx/lib/types";
import * as React from "react";
import { AppContainer } from "@/shared/app-container";
import { apolloSSR } from "@/shared/common/apollo-ssr";
import { setEmailPasswordIdentityProviderRoutes } from "@/shared/onefx-auth-provider/email-password-identity-provider/email-password-identity-provider-handler";
import { setApiGateway } from "@/api-gateway/api-gateway";
import { setSdkApiRoutes } from "@/server/sdk-api/sdk-api-routes";
import { MyServer } from "./start-server";

export function setServerRoutes(server: MyServer): void {
  // Health checks
  server.get("health", "/health", (ctx: Context) => {
    ctx.body = "OK";
  });

  setApiGateway(server);
  setEmailPasswordIdentityProviderRoutes(server);
  setSdkApiRoutes(server);

  server.get(
    "SPA",
    new RegExp(
      `^(?!\\/?${server.config.server.routePrefix}/api-gateway\\/).+$`
    ),
    server.auth.authRequired,
    async (ctx: Context) => {
      ctx.setState("base.nonce", ctx.state.nonce);
      ctx.setState("base.userId", ctx.state.userId);
      ctx.setState("base.authToken", server.auth.tokenFromCtx(ctx));
      const userWorkspace = await server.model.userWorkspace.findOne({
        user: ctx.state.userId,
      });
      ctx.setState("base.workspaceId", userWorkspace?.workspace);

      ctx.body = await apolloSSR(ctx, {
        VDom: <AppContainer />,
        reducer: noopReducer,
        clientScript: "/main.js",
      });
    }
  );
}
