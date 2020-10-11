import { latestAll } from "@/server/sdk-api/services/__test__/sdk-latest-all";
import { FlagModel } from "@/model/flag-model";

export function createGetLatestAll({
  model: { flagModel },
}: {
  model: { flagModel: typeof FlagModel };
}) {
  return function getLatestAll(sdkKey: string) {
    const namespace = sdkKey; // get workspace by sdkKey
    flagModel.find({ namespace });
    return latestAll;
  };
}
