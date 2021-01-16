import React from "react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import Checkbox from "antd/lib/checkbox";
import { Button, notification } from "antd";
import { CommonMargin } from "@/shared/common/common-margin";
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

export type Props = {
  action: (variables: UpsertFlagVariables) => Promise<void>;
  closeModal: () => void;
};

const usingMobileKey = "usingMobileKey";
const usingEnvironmentId = "usingEnvironmentId";

export const NewFlagForm: React.FC<Props> = ({ action, closeModal }) => {
  const workspaceId = React.useContext(WorkspaceIdContext);
  const refetch = React.useContext(RefetchContext);
  const [form] = Form.useForm();

  const onFinish = async (values: Record<string, unknown>) => {
    const variations = Object.keys(values)
      .map((key) => /variations\[(.+?)\]/.exec(key))
      .filter((key) => !!key)
      .map((result) => ({
        // @ts-ignore
        key: result[0],
        // @ts-ignore
        value: Number.parseInt(result[1], 10),
      }))
      .sort((a, b) => a.value - b.value)
      .map((item) => values[item.key]) as any[];

    try {
      await action({
        name: values.name as string,
        description: values.name as string,
        workspaceId,
        key: values.key as string,
        on: true,
        variations,
      });
      form.resetFields();
      closeModal();
      refetch();
      notification.success({
        message: "created",
      });
    } catch (e) {
      notification.error({
        message: "error, please check",
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
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="Eg. New gallery" />
        </Form.Item>

        <Form.Item
          name="key"
          label="Key"
          help={KeyHelp}
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="new-gallery" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input placeholder="Describe what this feature flag controls" />
        </Form.Item>

        <h4>Client-side SDK availability</h4>
        <p>Control which client-side SDKs can use this flag.</p>

        <Form.Item name="clientSideAvailability">
          <Checkbox.Group style={{ width: "100%" }} onChange={() => null}>
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

        <Form.Item
          name="variationType"
          label="Flag variations"
          initialValue="Boolean"
          help="This controls the evaluation return type of your flag in your code."
        >
          <Select>
            <Select.Option value="Boolean">Boolean</Select.Option>
          </Select>
        </Form.Item>

        <CommonMargin />

        <Form.Item
          name="variations[0]"
          label={
            <>
              <VarIcon value={true} /> Variation 1
            </>
          }
          initialValue={true}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="variations[1]"
          label={
            <>
              <VarIcon value={false} /> Variation 2
            </>
          }
          initialValue={false}
        >
          <Input disabled />
        </Form.Item>

        <h4>Default variations</h4>

        <Input.Group compact={true}>
          <Input style={{ width: "44px" }} addonBefore="ON" disabled />
          <Form.Item
            style={{ width: "20%" }}
            name="fallthrough.variation"
            initialValue={true}
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
        </Input.Group>

        <Input.Group compact={true}>
          <Input style={{ width: "44px" }} addonBefore="OFF" disabled />
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
        </Input.Group>

        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
