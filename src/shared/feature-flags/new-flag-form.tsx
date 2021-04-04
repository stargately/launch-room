import React, { useContext } from "react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import Checkbox from "antd/lib/checkbox";
import Button from "antd/lib/button";
import notification from "antd/lib/notification";
import JsonEditor from "@/shared/common/json-editor";
import { CommonMargin } from "@/shared/common/common-margin";
import { styled } from "onefx/lib/styletron-react";
import { t } from "onefx/lib/iso-i18n";
import { margin } from "polished";
import { RefetchContext, WorkspaceIdContext } from "./context";
import { VarIcon } from "../common/icons/var-icon";
import { UpsertFlagVariables } from "../flag-details/data/__generated__/UpsertFlag";

const KeyHelp = (
  <>
    <div>
      Use this key in your code. Keys must only contain letters, numbers, ., _
      or -.
    </div>
    <div>You cannot use new as a key.</div>
  </>
);

const VariationFlag = styled("span", ({ $theme }) => ({
  ...margin(0, $theme.sizing[4], $theme.sizing[4], 0),
}));

export type Props = {
  upsertFlag: (variables: UpsertFlagVariables) => Promise<void>;
  loading?: boolean;
  closeModal: () => void;
};

const usingMobileKey = "usingMobileKey";
const usingEnvironmentId = "usingEnvironmentId";

export const NewFlagForm: React.FC<Props> = ({
  upsertFlag,
  closeModal,
  loading,
}) => {
  const workspaceId = useContext(WorkspaceIdContext);
  const refetch = useContext(RefetchContext);

  const [form] = Form.useForm();

  const renderVariationField = (type: string, i: number) => {
    switch (type) {
      case "Boolean":
        return (
          <Form.Item name={["variationsBoolean", i]} initialValue={i !== 0}>
            <Input disabled />
          </Form.Item>
        );

      case "Json":
        return (
          <Form.Item
            name={["variationsJson", i]}
            validateFirst
            rules={[
              { required: true, message: t("feature_flags.rule_required") },
              () => ({
                async validator(_: any, value: string) {
                  try {
                    const item = JSON.parse(value);

                    if (typeof item === "object" && item !== null) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t("feature_flags.rule_valid_json"))
                    );
                  } catch (e) {
                    return Promise.reject(
                      new Error(t("feature_flags.rule_valid_json"))
                    );
                  }
                },
              }),
            ]}
          >
            <JsonEditor />
          </Form.Item>
        );

      default:
        return <Input disabled />;
    }
  };

  const _onFinish = async (values: Record<string, unknown>) => {
    try {
      await upsertFlag({
        name: values.name as string,
        description: values.name as string,
        workspaceId,
        key: values.key as string,
        on: true,
        variationsBoolean: values.variationsBoolean as boolean[],
        variationsJson: values.variationsJson as string[],
        fallthrough: values.fallthrough as { variation: number },
      });
      form.resetFields();
      closeModal();
      refetch();
      notification.success({
        message: "You have added a new flag ⛳️",
      });
    } catch (e) {
      notification.error({
        message: `Failed to create a flag: ${e}`,
      });
    }
  };

  return (
    <div>
      <h3>Create a feature flag</h3>
      <div>
        A feature flag lets you control who can see a particular feature in your
        app.
      </div>
      <Form form={form} onFinish={_onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="Eg. New gallery" />
        </Form.Item>

        <CommonMargin />

        <Form.Item
          name="key"
          label="Key"
          help={KeyHelp}
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="new-gallery" />
        </Form.Item>

        <CommonMargin />

        <Form.Item name="description" label="Description">
          <Input placeholder="Describe what this feature flag controls" />
        </Form.Item>

        <CommonMargin />

        <h4>Client-side SDK availability</h4>
        <p>Control which client-side SDKs can use this flag.</p>

        <Form.Item name="clientSideAvailability">
          <Checkbox.Group style={{ width: "100%" }}>
            <Row>
              <Col span={12}>
                <Checkbox value={usingMobileKey}>
                  SDKs using Mobile key
                </Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value={usingEnvironmentId}>
                  SDKs using Client-side ID
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <CommonMargin />

        <Form.Item
          name="variationType"
          label="Flag variations"
          initialValue="Boolean"
          help="This controls the evaluation return type of your flag in your code."
        >
          <Select>
            <Select.Option value="Boolean">Boolean</Select.Option>
            <Select.Option value="Json">JSON</Select.Option>
          </Select>
        </Form.Item>

        <CommonMargin />

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, curValues) =>
            prevValues.variationType !== curValues.variationType
          }
        >
          {({ getFieldValue }) =>
            ["Variation 1", "Variation 2"].map((variation, i) => (
              <>
                <Row align="middle">
                  <VarIcon value={i === 0} /> {variation}
                </Row>
                <CommonMargin />
                {renderVariationField(getFieldValue("variationType"), i)}
              </>
            ))
          }
        </Form.Item>

        <CommonMargin />

        <h4>Default variations</h4>

        <Row align="middle">
          <VariationFlag>ON</VariationFlag>
          <Form.Item
            style={{ width: "20%" }}
            name={["fallthrough", "variation"]}
            initialValue={0}
          >
            <Select>
              <Select.Option value={0}>True</Select.Option>
              <Select.Option value={1}>False</Select.Option>
            </Select>
          </Form.Item>
        </Row>

        <Row align="middle">
          <VariationFlag>OFF</VariationFlag>
          <Form.Item
            style={{ width: "20%" }}
            name="offVariation"
            initialValue={false}
          >
            <Select>
              {/*
              // @ts-ignore */}
              <Select.Option value={true}>True</Select.Option>
              {/*
              // @ts-ignore */}
              <Select.Option value={false}>False</Select.Option>
            </Select>
          </Form.Item>
        </Row>

        <CommonMargin />

        <Form.Item>
          <Button loading={loading} htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
