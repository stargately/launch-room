import { Logger } from "onefx/lib/integrated-gateways/logger";

export function createDiagnose({ logger }: { logger: Logger }) {
  return function diagnostic(reqBody: any): Record<string, unknown> {
    logger.info("diagnostic", { meta: reqBody });
    return {};
  };
}
