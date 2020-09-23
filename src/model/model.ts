import { MyServer } from "@/server/start-server";
import { FlagsModel } from "@/model/flags-model";

export function setModel(server: MyServer): void {
  server.model = server.model || {};
  server.model.flagsModel = new FlagsModel();
}
