import { LDUser } from "launchdarkly-js-client-sdk";
import { Logger } from "onefx/lib/integrated-gateways/logger";

type UserKind = { kind: string; creationDate: number; user: LDUser };
type FlagVal = {
  version: number;
  flagVersion: number;
  value: any;
  variation: number;
  trackEvents: boolean;
};

export function createCreateBulk({ logger }: { logger: Logger }) {
  return function createBulk(reqBody: Array<UserKind | FlagVal> | any): void {
    logger.info("createBulk", { meta: reqBody });
  };
}
