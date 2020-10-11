import { MyServer } from "@/server/start-server";
import { FlagModel } from "@/model/flag-model";

export type Model = {
  flagModel: typeof FlagModel;
};

export function setModel(server: MyServer): void {
  server.model = server.model || {};
  server.model.flagModel = FlagModel;
}
