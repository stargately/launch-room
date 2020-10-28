import { FlagModel } from "@/model/flag-model";
import { SegmentModel } from "@/model/segment-model";

export function createGetLatestAll({
  model: { flagModel, segmentModel },
}: {
  model: { flagModel: typeof FlagModel; segmentModel: typeof SegmentModel };
}) {
  return async function getLatestAll(sdkKey: string) {
    const namespace = sdkKey; // get workspace by sdkKey

    const flags = await flagModel.find().exec();
    const segments = await segmentModel.find().exec();
    const latestAll = {
      flags,
      segments,
    };

    return latestAll;
  };
}
