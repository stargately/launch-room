import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { themeDecorator } from "@/shared/common/storybook-utils";
import { Rules, RulesProps } from "@/shared/flag-details/rules";
import Form from "antd/lib/form";

export default {
  title: "pages/flag-details/rules",
  component: Rules,
  decorators: [themeDecorator()],
} as Meta;

const Template: Story<RulesProps> = (args) => (
  <Form>
    <Rules {...args} />
  </Form>
);

export const Default = Template.bind({});

Default.storyName = "Rules";

Default.args = {
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
      trackEvents: true,
      variation: 0,
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
      trackEvents: true,
      variation: 0,
    },
  ],
  variance: [true, false],
};
