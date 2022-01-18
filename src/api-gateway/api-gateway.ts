import { ApolloServer } from "apollo-server-koa";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { Model } from "@/model/model";
import { Gateways } from "@/server/gateway/gateway";
import { OnefxAuth } from "onefx-auth";
import { NewsletterResolver } from "@/shared/newsletter/newsletter-resolver";
import { FlagResolver } from "@/api-gateway/resolvers/flag-resolver";
import { MyServer } from "@/server/start-server";
import { customAuthChecker } from "@/api-gateway/auth-checker";
import { ApiTokensResolver } from "@/shared/api-tokens/api-tokens-resolver";
import { MetaResolver } from "./resolvers/meta-resolver";

export interface IContext {
  userId: string;
  session: any;
  model: Model;
  gateways: Gateways;
  auth: OnefxAuth;
  reqHeaders: Record<string, string>;
}

export async function setApiGateway(server: MyServer): Promise<void> {
  const resolvers = [
    MetaResolver,
    NewsletterResolver,
    FlagResolver,
    ApiTokensResolver,
  ];
  server.resolvers = resolvers;

  const sdlPath = path.resolve(__dirname, "api-gateway.graphql");
  const schema = await buildSchema({
    resolvers,
    authChecker: customAuthChecker,
    emitSchemaFile: {
      path: sdlPath,
    },
    validate: false,
  });

  const apollo = new ApolloServer({
    schema,
    introspection: true,
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
    context: async ({ ctx }): Promise<IContext> => {
      const token = server.auth.tokenFromCtx(ctx);
      const userId = await server.auth.jwt.verify(token);

      return {
        userId,
        session: ctx.session,
        model: server.model,
        gateways: server.gateways,
        auth: server.auth,
        reqHeaders: ctx.headers,
      };
    },
  });
  const gPath = `${server.config.server.routePrefix || ""}/api-gateway/`;
  apollo.applyMiddleware({ app: server.app, path: gPath });
}
