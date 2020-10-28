import { MyServer } from "@/server/start-server";
import { FlagModel } from "@/model/flag-model";
import { SegmentModel } from "@/model/segment-model";

export type Model = {
  flagModel: typeof FlagModel;
  segmentModel: typeof SegmentModel;
};

export function setModel(server: MyServer): void {
  server.model = server.model || {};
  server.model.flagModel = FlagModel;
  server.model.segmentModel = SegmentModel;
}
