import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { themeDecorator } from "@/shared/common/storybook-utils";
import { FlagDetailsController } from "@/shared/flag-details/flag-details-controller";
import { NewFlagForm } from "@/shared/feature-flags/new-flag-form";

export default {
  title: "pages/feature-flags/new-flag-form",
  component: FlagDetailsController,
  decorators: [themeDecorator()],
} as Meta;

const Template: Story = (args) => <NewFlagForm {...args} />;

export const Default = Template.bind({});

Default.storyName = "NewFlagForm";

Default.args = {};
