import { FlagModel } from "@/model/flag-model";
import { SegmentModel } from "@/model/segment-model";
import { WorkspaceModel } from "@/model/workspace-model";
import { ApiTokensModel } from "@/shared/api-tokens/api-tokens-model";

export function createGetLatestAll({
  model: { flagModel, apiTokens, segmentModel },
}: {
  model: {
    flagModel: typeof FlagModel;
    segmentModel: typeof SegmentModel;
    workspaceModel: typeof WorkspaceModel;
    apiTokens: typeof ApiTokensModel;
  };
}) {
  return async function getLatestAll(sdkKey: string) {
    const apiToken = await apiTokens.findOne({ launchRoomToken: sdkKey });
    if (!apiToken) {
      throw new Error("invalid sdk key");
    }

    const rawFlags = await flagModel
      .find({ workspace: apiToken.workspace })
      .lean();
    const flags = {} as Record<string, unknown>;
    for (const f of rawFlags) {
      // @ts-ignore
      flags[f.key] = f;
      // @ts-ignore
      flags[f.key].on = f.isOn;
      // @ts-ignore
      delete flags[f.key].isOn;
    }

    const segments = await segmentModel
      .find({ workspace: apiToken.workspace })
      .exec();

    return {
      flags,
      segments,
    };
  };
}
