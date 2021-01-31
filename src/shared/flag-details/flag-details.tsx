import React from "react";
import { ContentPadding } from "@/shared/common/styles/style-padding";
import Switch from "antd/lib/switch";
import { Rules } from "@/shared/flag-details/rules";
import Form from "antd/lib/form";
import notification from "antd/lib/notification";
import Button from "antd/lib/button";
import { Link } from "onefx/lib/react-router-dom";
import { styled } from "onefx/lib/styletron-react";
import { padding } from "polished";
import Row from "antd/lib/row";
// eslint-disable-next-line camelcase
import { FlagDetails_flagDetails } from "@/shared/flag-details/data/__generated__/FlagDetails";
import { UpsertFlagVariables } from "@/shared/flag-details/data/__generated__/UpsertFlag";
import { VarianceSelect } from "@/shared/flag-details/variance-select";
import { RuleInput } from "../../../__generated__/globalTypes";
import { CommonMargin } from "../common/common-margin";

const StyledRow = styled(Row, ({ $theme }) => ({
  ...padding($theme.sizing[2], 0),
}));

const StyledSpan = styled("span", ({ $theme }) => ({
  ...padding(0, $theme.sizing[1]),
}));

type Props = {
  flagKey: string;
  // eslint-disable-next-line camelcase
  flagDetails: FlagDetails_flagDetails | null | undefined;
  upsertFlag: (variables: UpsertFlagVariables) => Promise<void>;
  workspaceId: string;
};

export function FlagDetails({
  flagDetails,
  flagKey,
  upsertFlag,
  workspaceId,
}: Props): JSX.Element {
  return (
    <ContentPadding>
      <CommonMargin />
      <StyledRow>
        <Link to="../">Feature flags</Link>
        <StyledSpan>/</StyledSpan>
        {flagKey}
      </StyledRow>
      <h1>{flagKey}</h1>

      <Form
        onFinish={async (values) => {
          console.log(values);
          const rules = [] as RuleInput[];
          const valKeys = Object.keys(values);
          for (const k of valKeys) {
            if (k.startsWith("rules")) {
              const [, i, attr, i2, attr2] = k.split(".");
              const idx = parseInt(i, 10);
              // @ts-ignore
              rules[idx] = rules[idx] || {};
              if (attr === "clauses") {
                rules[idx].clauses = rules[idx].clauses || [];
                // @ts-ignore
                rules[idx].clauses[i2] = rules[idx].clauses[i2] || {};
                // @ts-ignore
                rules[idx].clauses[i2][attr2] = values[k];
              } else {
                // @ts-ignore
                rules[idx][attr] = values[k];
              }
            }
          }

          await upsertFlag({
            workspaceId,
            key: flagKey,
            on: values.on,
            rules,
            fallthrough: {
              variation: values["fallthrough.variation"],
            },
            offVariation: values.offVariation,
          });

          notification.success({ message: "Updated!" });
        }}
      >
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
        <Form.Item
          name="on"
          label="Is flag on?"
          valuePropName="checked"
          initialValue={flagDetails?.on}
        >
          <Switch />
        </Form.Item>
        <CommonMargin />
        <Rules
          rules={flagDetails?.rules || []}
          variance={flagDetails?.variations || []}
          fallthroughVariance={flagDetails?.fallthrough.variation}
        />
        If targeting is off, serve{" "}
        <VarianceSelect
          itemProps={{
            name: "offVariation",
            initialValue: flagDetails?.offVariation,
          }}
          variance={flagDetails?.variations}
          disabled={false}
        />
      </Form>
    </ContentPadding>
  );
}
