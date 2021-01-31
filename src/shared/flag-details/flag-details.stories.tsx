import React from "react";
import { themeDecorator } from "@/shared/common/storybook-utils";
import { FlagDetails } from "@/shared/flag-details/flag-details";

export const Standard: React.FC = () => (
  <FlagDetails
    flagDetails={{
      on: true,
      rules: [
        {
          id: "b47993ca-fb08-4eac-bc19-839fce50b1ac",
          clauses: [
            {
              attribute: "email",
              op: "endsWith",
              values: ["@daommo.com"],
              negate: false,
            },
          ],
          variation: 0,
          trackEvents: false,
        },
        {
          id: "65947501-e647-44fc-b4e2-f4e025c07157",
          clauses: [
            {
              attribute: "email",
              op: "startsWith",
              values: [
                "puncsky",
                "mengqiang.q",
                "erickim987",
                "ericjin987",
                "therealchuhan",
                "shiruisheng88@gmail.com",
              ],
              negate: false,
            },
          ],
          variation: 0,
          trackEvents: false,
        },
      ],
      variations: [true, false],
      fallthrough: { variation: 1 },
      offVariation: 0,
    }}
    flagKey="key"
    upsertFlag={async (variables) => console.log(variables)}
    workspaceId="workspaceId"
  />
);

export default {
  title: "pages/flag-details/flag-details",
  decorators: [themeDecorator()],
  component: FlagDetails,
};
