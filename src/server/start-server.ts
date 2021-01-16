import config from "config";
import { Config, Server } from "onefx/lib/server";
import { Model, setModel } from "@/model";
import { OnefxAuth, authConfig } from "onefx-auth";
import { updateSeedDate } from "@/model/update-seed-data";
import { Gateways, setGateways } from "./gateway/gateway";
import { setMiddleware } from "./middleware";
import { setServerRoutes } from "./server-routes";

export type MyServer = Server & {
  auth: OnefxAuth;
  gateways: Gateways;
  config: Config & {
    gateways: {
      mongoose: {
        uri: string;
      };
      sendgrid: {
        sendgridApiKey: string;
        listName: string;
        senderId: string;
        unsubscribeUrl?: string;
        unsubscribeGroup?: number;
      };
    };
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolvers: any;
  model: Model;
};

const loadSeedData = config.get("loadSeedData") === "true";

export async function startServer(): Promise<Server> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const server: MyServer = new Server((config as any) as Config) as MyServer;
  server.app.proxy = Boolean(config.get("server.proxy"));
  setGateways(server);
  server.auth = new OnefxAuth(server.gateways.mongoose, {
    ...authConfig,
    loginUrl: "/launch-room/login/",
  });

  setMiddleware(server);
  if (loadSeedData) {
    await server.gateways.mongoose.connection.dropDatabase();
  }
  setModel(server);
  setServerRoutes(server);
  if (loadSeedData) {
    await updateSeedDate(server.auth, server.model);
  }

  const port = Number(process.env.PORT || config.get("server.port"));
  server.listen(port);
  return server;
}
