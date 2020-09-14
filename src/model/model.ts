import { MyServer } from "@/server/start-server";
import { FlagModel } from "@/model/flag-model";
import { SegmentModel } from "@/model/segment-model";
import { WorkspaceModel } from "@/model/workspace-model";
import { UserWorkspaceModel } from "@/model/user-workspace-model";
import { ApiTokensModel } from "@/shared/api-tokens/api-tokens-model";

export type Model = {
  flagModel: typeof FlagModel;
  segmentModel: typeof SegmentModel;
  workspaceModel: typeof WorkspaceModel;
  userWorkspace: typeof UserWorkspaceModel;
  apiTokens: typeof ApiTokensModel;
};

export function setModel(server: MyServer): void {
  server.model = server.model || {};
  server.model.flagModel = FlagModel;
  server.model.segmentModel = SegmentModel;
  server.model.workspaceModel = WorkspaceModel;
  server.model.userWorkspace = UserWorkspaceModel;
  server.model.apiTokens = ApiTokensModel;
}
