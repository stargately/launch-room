import React, { useState } from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal/Modal";
import Form from "antd/lib/form";
import Input from "antd/lib/input/Input";
import notification from "antd/lib/notification";
import Popconfirm from "antd/lib/popconfirm";
import { styled } from "onefx/lib/styletron-react";
import { margin } from "polished";
import { UpsertProjectVariables } from "@/shared/settings/data/__generated__/UpsertProject";
import Space from "antd/lib/space";

type Props = {
  project?: {
    _id: string;
    name: string;
    workspace: string;
    deletedAt: Date;
  };
  action: (variables: UpsertProjectVariables) => Promise<void>;
};

const StyledAddFlag = styled("div", ({ $theme }) => ({
  ...margin($theme.sizing[2], 0),
}));

export const ProjectModal: React.FC<Props> = ({ project, action }) => {
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();

  const close = () => {
    form.resetFields();
    setVisible(false);
  };

  const open = () => setVisible(true);

  return (
    <StyledAddFlag>
      <Button onClick={open} type={!project ? "primary" : "default"}>
        {!project ? "Create Project" : "Edit"}
      </Button>
      <Modal
        title={!project ? "Create a project" : "Edit"}
        visible={visible}
        footer={null}
        onCancel={close}
      >
        <Form
          form={form}
          initialValues={project}
          layout="vertical"
          onFinish={async (values) => {
            await action(values);
            close();
            notification.info({
              message: !project
                ? "Create the project!"
                : "Updated the project!",
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
          <Form.Item shouldUpdate>
            {({ getFieldValue }) => {
              return (
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!getFieldValue("name")}
                  >
                    Save project
                  </Button>
                  {!!project && (
                    <Popconfirm
                      title="Are you sure to delete this project?"
                      onConfirm={async () => {
                        await action({ ...project, deletedAt: new Date() });
                        close();
                        notification.info({
                          message: "Delete the project!",
                          placement: "topLeft",
                        });
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button>Delete Project</Button>
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
