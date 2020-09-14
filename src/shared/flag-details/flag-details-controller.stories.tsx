import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { themeDecorator } from "@/shared/common/storybook-utils";
import { FlagDetailsController } from "@/shared/flag-details/flag-details-controller";
import { flagDetails } from "@/shared/flag-details/data/queries";

const mocks = [
  {
    request: {
      query: flagDetails,
      variables: {
        key: undefined,
        workspaceId: "5fca07e0e66beb3159d792f2",
      },
    },
    result: () => {
      return {
        data: {
          flagDetails: {
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
                    __typename: "Clause",
                  },
                ],
                variation: 0,
                __typename: "Rule",
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
                    __typename: "Clause",
                  },
                ],
                variation: 0,
                __typename: "Rule",
              },
            ],
            variations: [true, false],
            fallthrough: { variation: 1, __typename: "Fallthrough" },
            __typename: "FlagDetails",
          },
        },
      };
    },
  },
];

export default {
  title: "pages/flag-details/flag-details-controller",
  component: FlagDetailsController,
  decorators: [
    themeDecorator({
      base: { userId: "", workspaceId: "5fca07e0e66beb3159d792f2" },
      mocks,
    }),
  ],
} as Meta;

const Template: Story = (args) => <FlagDetailsController {...args} />;

export const Default = Template.bind({});

Default.storyName = "FlagDetailsController";

Default.args = {};
