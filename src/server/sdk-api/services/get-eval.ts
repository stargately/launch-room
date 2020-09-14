import { LDUser } from "launchdarkly-js-client-sdk";

export function createGetEval() {
  return function getEval(user: LDUser) {
    let announcementsValue = false;
    if (
      ["puncsky@gmail.com", "email@example.com"].indexOf(user?.email || "") !==
      -1
    ) {
      announcementsValue = true;
    }

    return {
      announcements: {
        version: 5586,
        flagVersion: 1,
        value: announcementsValue,
        variation: 1,
        trackEvents: false,
      },
    };
  };
}
