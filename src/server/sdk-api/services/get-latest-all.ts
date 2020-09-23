import { latestAll } from "@/server/sdk-api/services/__test__/sdk-latest-all";
import { FlagsModel } from "@/model/flags-model";

export function createGetLatestAll({
  model: { flagsModel },
}: {
  model: { flagsModel: FlagsModel };
}) {
  return function getLatestAll(sdkKey: string) {
    flagsModel.get(sdkKey);
    return latestAll;
  };
}
