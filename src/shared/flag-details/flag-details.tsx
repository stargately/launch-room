import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Switch from "antd/lib/switch";
import Form from "antd/lib/form";
import Button from "antd/lib/button";
import Row from "antd/lib/row";
import notification from "antd/lib/notification";
import Typography from "antd/lib/typography";
import Col from "antd/lib/col";
import Tabs from "antd/lib/tabs";
import Space from "antd/lib/space";
import Popconfirm from "antd/lib/popconfirm";
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
import operators from "@/shared/flag-details/data/operators";
import { RootState } from "@/client/javascripts/main";
import { ClauseInput } from "../../../__generated__/globalTypes";

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
  isFetching?: boolean;
  isPosting?: boolean;
};

export function FlagDetails({
  flagDetails,
  flagKey,
  upsertFlag,
  workspaceId,
  isFetching,
  isPosting,
}: Props): JSX.Element {
  const [form] = Form.useForm();
  const environment = useSelector(
    (state: RootState) => state.base.currentEnvironment?._id
  );

  const rules = useMemo(
    () =>
      flagDetails?.rules?.map((rule: { clauses: ClauseInput[] }) => ({
        ...rule,
        clauses: rule.clauses.map((clause) => {
          const operator = operators.find(
            ({ value, negate }) =>
              value === clause.op && negate === clause.negate
          )?.id;

          return { ...clause, op: operator };
        }),
      })),
    [flagDetails]
  );

  const _onFinish = async (formData: Record<string, unknown>) => {
    const values = deepOmit(formData, "__typename");
    const { fallthrough, on, offVariation } = values;
    const newRules = values.rules.map((value: { clauses: ClauseInput[] }) => ({
      ...value,
      clauses: value.clauses.map((clause) => {
        let operator;
        if (clause.op) {
          operator = operators.find(({ id }) => id === clause.op);
        } else {
          operator = {
            value: "segmentMatch",
            negate: clause.attribute !== "segmentMatch",
          };
        }

        return { ...clause, op: operator?.value, negate: operator?.negate };
      }),
    }));

    await upsertFlag({
      environment,
      workspaceId,
      key: flagKey,
      on,
      fallthrough,
      offVariation,
      rules: newRules,
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
      <Tabs>
        <Tabs.TabPane tab="Targeting" key="1">
          <Form
            form={form}
            initialValues={flagDetails ? { ...flagDetails, rules } : {}}
            layout="vertical"
            onFinish={_onFinish}
          >
            <Button loading={isPosting} type="primary" htmlType="submit">
              Save Changes
            </Button>

            <CommonMargin />
            <Row gutter={8} align="middle">
              <Col flex="none">Is flag on? :</Col>
              <Col flex="auto">
                <Form.Item noStyle name="on" valuePropName="checked">
                  <Switch loading={isFetching} />
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
                <Rules
                  form={form}
                  variance={getFieldValue("variations")}
                  loading={isFetching}
                />
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
                  loading={isFetching}
                />
              )}
            </Form.Item>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Setting" key="2">
          <Typography.Title level={5} type="secondary">
            {flagDetails?.archived
              ? t("flag_detail.restore_flag_label")
              : t("flag_detail.archive_flag_label")}
          </Typography.Title>
          <Space direction="vertical">
            <Typography.Text>
              {flagDetails?.archived
                ? t("flag_detail.restore_flag_description")
                : t("flag_detail.archive_flag_description")}
            </Typography.Text>
            <Popconfirm
              title={
                flagDetails?.archived
                  ? t("flag_detail.restore_flag_title")
                  : t("flag_detail.archive_flag_title")
              }
              onConfirm={async () => {
                try {
                  await upsertFlag({
                    environment,
                    workspaceId,
                    key: flagKey,
                    archived: !flagDetails?.archived,
                  });
                  notification.success({
                    message: flagDetails?.archived
                      ? t("feature_flags.success_restore_flag_message")
                      : t("feature_flags.success_archive_flag_message"),
                  });
                } catch (e) {
                  notification.error({ message: e.message });
                }
              }}
            >
              <Button>{flagDetails?.archived ? "RESTORE" : "ARCHIVE"}</Button>
            </Popconfirm>
          </Space>
        </Tabs.TabPane>
      </Tabs>
    </ContentPadding>
  );
}
