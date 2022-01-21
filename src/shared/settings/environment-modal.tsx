import React, { useState } from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal/Modal";
import Form from "antd/lib/form";
import Input from "antd/lib/input/Input";
import notification from "antd/lib/notification";
import Popconfirm from "antd/lib/popconfirm";
import Space from "antd/lib/space";
import { styled } from "onefx/lib/styletron-react";
import { margin } from "polished";
import { UpsertEnvironmentVariables } from "@/shared/settings/data/__generated__/UpsertEnvironment";
import { t } from "onefx/lib/iso-i18n";

type Props = {
  environment?: UpsertEnvironmentVariables;
  action: (variables: UpsertEnvironmentVariables) => Promise<void>;
  loading?: boolean;
  launchRoomToken?: string | null;
};

const StyledAddFlag = styled("div", ({ $theme }) => ({
  ...margin($theme.sizing[2], 0),
}));

export const EnvironmentModal: React.FC<Props> = ({
  environment,
  launchRoomToken,
  action,
  loading,
}) => {
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();

  const close = () => {
    form.resetFields();
    setVisible(false);
  };

  const open = () => setVisible(true);

  return (
    <StyledAddFlag>
      <Button onClick={open} type={!environment ? "primary" : "default"}>
        {!environment ? "Create Environment" : "Edit Environment"}
      </Button>
      <Modal
        title={!environment ? "Create a environment" : "Edit"}
        visible={visible}
        footer={null}
        onCancel={close}
      >
        <Form
          form={form}
          initialValues={{ ...environment, launchRoomToken }}
          layout="vertical"
          onFinish={async (values) => {
            await action(values);
            close();
            notification.info({
              message: !environment
                ? "Create the environment!"
                : "Updated the environment!",
              placement: "topLeft",
            });
          }}
        >
          <Form.Item name="_id" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {environment && (
            <Form.Item
              name="launchRoomToken"
              label={t("api_tokens.launch_room_token")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item shouldUpdate>
            {({ getFieldValue }) => {
              return (
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!getFieldValue("name")}
                    loading={loading}
                  >
                    Save environment
                  </Button>
                  {!!environment && (
                    <Popconfirm
                      title="Are you sure to delete this environment?"
                      onConfirm={async () => {
                        await action({
                          ...environment,
                          deletedAt: new Date(),
                        });
                        close();
                        notification.info({
                          message: "Delete the environment!",
                          placement: "topLeft",
                        });
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button>Delete Environment</Button>
                    </Popconfirm>
                  )}
                </Space>
              );
            }}
          </Form.Item>
        </Form>
      </Modal>
    </StyledAddFlag>
  );
};
