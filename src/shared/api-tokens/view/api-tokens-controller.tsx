import React, { useEffect } from "react";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import notification from "antd/lib/notification";
import Form from "antd/lib/form";
import { useUpsertApiTokens } from "@/shared/api-tokens/view/hooks/use-upsert-api-tokens";
import { useApiTokens } from "@/shared/api-tokens/view/hooks/use-api-tokens";
import { t } from "onefx/lib/iso-i18n";

export const ApiTokensController = () => {
  const { data, refetch } = useApiTokens();
  const { mutate } = useUpsertApiTokens();

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(data?.apiTokens);
  }, [data?.apiTokens]);

  const onFinish = async (values: Record<string, unknown>) => {
    await mutate({ variables: values });
    await refetch();
    notification.success({ message: t("notification.update") });
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item hidden={true} name="_id">
        <Input />
      </Form.Item>

      <Form.Item
        label={t("api_tokens.launch_room_token")}
        name="launchRoomToken"
      >
        <Input />
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) =>
          prevValues.launchRoomToken !== curValues.launchRoomToken
        }
      >
        {({ getFieldValue }) => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={!getFieldValue("launchRoomToken")}
          >
            {t("api_tokens.button_submit")}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
