import { MyServer } from "@/server/start-server";
import { FlagModel } from "@/model/flag-model";
import { SegmentModel } from "@/model/segment-model";
import { WorkspaceModel } from "@/model/workspace-model";
import { UserWorkspaceModel } from "@/model/user-workspace-model";
import { ProjectModel } from "@/model/project-model";
import { EnvironmentModel } from "@/model/environment-model";
import { ApiTokensModel } from "@/shared/api-tokens/api-tokens-model";

export type Model = {
  flagModel: typeof FlagModel;
  segmentModel: typeof SegmentModel;
  workspaceModel: typeof WorkspaceModel;
  userWorkspace: typeof UserWorkspaceModel;
  apiTokens: typeof ApiTokensModel;
  projectModel: typeof ProjectModel;
  environmentModel: typeof EnvironmentModel;
};

export async function setModel(server: MyServer): Promise<void> {
  server.model = server.model || {};
  server.model.flagModel = FlagModel;
  server.model.segmentModel = SegmentModel;
  server.model.workspaceModel = WorkspaceModel;
  server.model.userWorkspace = UserWorkspaceModel;
  server.model.apiTokens = ApiTokensModel;
  server.model.projectModel = ProjectModel;
  server.model.environmentModel = EnvironmentModel;
}
