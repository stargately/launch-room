import React from "react";
import { useParams } from "react-router";
import { ContentPadding } from "@/shared/common/styles/style-padding";
import { useFlagDetails } from "@/shared/flag-details/hooks/use-flag-details";
import Switch from "antd/lib/switch";
import { Rules } from "@/shared/flag-details/rules";
import Form from "antd/lib/form";
import notification from "antd/lib/notification";
import Button from "antd/lib/button";
import { useUpsertFlag } from "@/shared/flag-details/hooks/use-upsert-flag";
import { Link } from "onefx/lib/react-router-dom";
import { styled } from "onefx/lib/styletron-react";
import { padding } from "polished";
import Row from "antd/lib/row";
import { useSelector } from "react-redux";
import { RuleInput } from "../../../__generated__/globalTypes";
import { CommonMargin } from "../common/common-margin";

const StyledRow = styled(Row, ({ $theme }) => ({
  ...padding($theme.sizing[2], 0),
}));

const StyledSpan = styled("span", ({ $theme }) => ({
  ...padding(0, $theme.sizing[1]),
}));

export const FlagDetailsController: React.FC = () => {
  const workspaceId = useSelector(
    (state: { base: { workspaceId: string } }) => state.base.workspaceId
  );
  const { flagKey } = useParams<{ flagKey: string }>();
  const { flagDetails } = useFlagDetails({
    key: flagKey,
    workspaceId,
  });
  const { upsertFlag } = useUpsertFlag();
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
        />
        If targeting is off, serve{" "}
        {String(flagDetails?.variations[flagDetails?.fallthrough.variation])}
      </Form>
    </ContentPadding>
  );
};
