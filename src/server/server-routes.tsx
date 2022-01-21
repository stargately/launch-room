import { noopReducer } from "onefx/lib/iso-react-render/root/root-reducer";
import { Context } from "onefx/lib/types";
import * as React from "react";
import { AppContainer } from "@/shared/app-container";
import { apolloSSR } from "@/shared/common/apollo-ssr";
import { setEmailPasswordIdentityProviderRoutes } from "@/shared/onefx-auth-provider/email-password-identity-provider/email-password-identity-provider-handler";
import { setApiGateway } from "@/api-gateway/api-gateway";
import { setSdkApiRoutes } from "@/server/sdk-api/sdk-api-routes";
import { Environment as EnvironmentDoc } from "@/model/environment-model";
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

      const projects = await server.model.projectModel.find({
        workspace: userWorkspace?.workspace,
        deletedAt: null,
      });

      if (projects.length === 0) {
        const project = await server.model.projectModel.create({
          name: "default",
          workspace: userWorkspace?.workspace,
        });
        const apiToken = await server.model.apiTokens.create({
          workspace: userWorkspace?.workspace,
        });
        const environment = await server.model.environmentModel.create({
          name: "prod",
          project: project._id,
          apiToken,
        });

        ctx.setState("base.currentEnvironment", environment);
      } else {
        const urlProjectName = ctx.request.url.split("/")[2];
        const urlEnvironmentName = ctx.request.url.split("/")[3];

        const environments = await Promise.all(
          projects.map(
            async (project): Promise<EnvironmentDoc[]> =>
              server.model.environmentModel.find({
                project: project._id,
                deletedAt: null,
              })
          )
        );
        let urlEnvironment;
        if (urlProjectName && urlEnvironmentName) {
          const urlProject = projects?.find(
            (item) => item.name === urlProjectName
          );
          urlEnvironment = environments
            ?.flat()
            .find(
              (item) =>
                item.name === urlEnvironmentName &&
                item.project?.toString() === urlProject?._id.toString()
            );
        }
        if (urlEnvironment) {
          ctx.setState("base.currentEnvironment", urlEnvironment);
        } else {
          ctx.setState("base.currentEnvironment", environments?.flat()[0]);
        }
      }

      ctx.body = await apolloSSR(ctx, {
        VDom: <AppContainer />,
        reducer: noopReducer,
        clientScript: "/main.js",
      });
    }
  );
}
