import React from "react";
import Switch from "antd/lib/switch";
import Form from "antd/lib/form";
import Button from "antd/lib/button";
import Row from "antd/lib/row";
import notification from "antd/lib/notification";
import Col from "antd/lib/col";
import { t } from "onefx/lib/iso-i18n";
import { Link } from "onefx/lib/react-router-dom";
import { styled } from "onefx/lib/styletron-react";
import { padding } from "polished";
// eslint-disable-next-line camelcase
import { FlagDetails_flagDetails } from "@/shared/flag-details/data/__generated__/FlagDetails";
import { UpsertFlagVariables } from "@/shared/flag-details/data/__generated__/UpsertFlag";
import { VarianceSelect } from "@/shared/flag-details/variance-select";
import { ContentPadding } from "@/shared/common/styles/style-padding";
import { CommonMargin } from "@/shared/common/common-margin";
import { Rules } from "@/shared/flag-details/rules";
import deepOmit from "@/shared/utils/deep-omit";
import { RuleInput } from "../../../__generated__/globalTypes";

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
  const [form] = Form.useForm();

  const _onFinish = async (formData: Record<string, unknown>) => {
    const values = deepOmit(formData, "__typename");

    await upsertFlag({
      workspaceId,
      key: flagKey,
      on: values.on as boolean,
      rules: values.rules as RuleInput[],
      fallthrough: values.fallthrough as { variation: number },
      offVariation: values.offVariation as number,
    });

    notification.success({ message: t("notification.update") });
  };

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
        form={form}
        initialValues={flagDetails || {}}
        layout="vertical"
        onFinish={_onFinish}
      >
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>

        <CommonMargin />
        <Row gutter={8} align="middle">
          <Col flex="none">Is flag on? :</Col>
          <Col flex="auto">
            <Form.Item noStyle name="on" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        <CommonMargin />
        <Form.Item
          label="Target users who match these rules"
          shouldUpdate={(prevValues, curValues) =>
            prevValues.variations !== curValues.variations ||
            prevValues.fallthrough !== curValues.fallthrough
          }
        >
          {({ getFieldValue }) => (
            <Rules variance={getFieldValue("variations")} />
          )}
        </Form.Item>
        <Form.Item
          shouldUpdate={(prevValues, curValues) =>
            prevValues.variations !== curValues.variations
          }
        >
          {({ getFieldValue }) => (
            <VarianceSelect
              itemProps={{
                name: "offVariation",
                label: "If targeting is off, serve",
              }}
              variance={getFieldValue("variations")}
              disabled={false}
            />
          )}
        </Form.Item>
      </Form>
    </ContentPadding>
  );
}
