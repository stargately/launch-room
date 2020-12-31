import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { themeDecorator } from "@/shared/common/storybook-utils";
import { FlagDetailsController } from "@/shared/flag-details/flag-details-controller";
import { FlagsStatusTableController } from "@/shared/feature-flags/flags-status-table-controller";
import { flagsStatus } from "@/shared/feature-flags/data/queries";

const mocks = [
  {
    request: {
      query: flagsStatus,
      variables: {
        limit: 10000,
        skip: 0,
        workspaceId: "5fca07e0e66beb3159d792f2",
      },
    },
    result: () => {
      return {
        data: {
          flagsStatus: {
            skip: 0,
            limit: 10000,
            total: 2,
            flags: [
              {
                key: "alpha-launch-users",
                offVariation: 1,
                fallthrough: { variation: 1, __typename: "Fallthrough" },
                rules: [
                  { variation: 0, __typename: "Rule" },
                  { variation: 0, __typename: "Rule" },
                ],
                variations: [true, false],
                on: true,
                __typename: "FlagDetails",
              },
            ],
            __typename: "FlagsStatus",
          },
        },
      };
    },
  },
];

export default {
  title: "pages/feature-flags/flags-status-table-controller",
  component: FlagDetailsController,
  decorators: [
    themeDecorator({
      base: { userId: "", workspaceId: "5fca07e0e66beb3159d792f2" },
      mocks,
    }),
  ],
} as Meta;

const Template: Story = (args) => <FlagsStatusTableController {...args} />;

export const Default = Template.bind({});

Default.storyName = "FlagsStatusTableController";

Default.args = {};
