import { ApolloServer } from "apollo-server-koa";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { Model } from "@/model/model";
import { Gateways } from "@/server/gateway/gateway";
import { OnefxAuth } from "onefx-auth";
import { NewsletterResolver } from "@/shared/newsletter/newsletter-resolver";
import { MetaResolver } from "./resolvers/meta-resolver";
import { MyServer } from "../server/start-server";

export interface IContext {
  userId: string;
  session: any;
  model: Model;
  gateways: Gateways;
  auth: OnefxAuth;
  reqHeaders: Record<string, string>;
}

export async function setApiGateway(server: MyServer): Promise<void> {
  const resolvers = [MetaResolver, NewsletterResolver];
  server.resolvers = resolvers;

  const sdlPath = path.resolve(__dirname, "api-gateway.graphql");
  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: {
      path: sdlPath,
      commentDescriptions: true,
    },
    validate: false,
  });

  const apollo = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
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
