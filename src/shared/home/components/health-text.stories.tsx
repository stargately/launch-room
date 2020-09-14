import React from "react";
import { themeDecorator } from "@/shared/common/storybook-utils";
import { HealthText } from "@/shared/home/components/health-text";

export const Standard: React.FC = () => (
  <HealthText loading={false} error={false} />
);

export default {
  title: "Components/HealthText",
  decorators: [themeDecorator()],
  component: HealthText,
};
