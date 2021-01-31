import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { themeDecorator } from "@/shared/common/storybook-utils";
import { NewFlagForm } from "@/shared/feature-flags/new-flag-form";

export default {
  title: "pages/feature-flags/new-flag-form",
  component: NewFlagForm,
  decorators: [themeDecorator()],
} as Meta;

const Template: Story = (args) => (
  <NewFlagForm
    {...args}
    upsertFlag={() =>
      new Promise(() => {
        return 0;
      })
    }
    closeModal={() => {
      return 0;
    }}
  />
);

export const Default = Template.bind({});

Default.storyName = "NewFlagForm";

Default.args = {};
