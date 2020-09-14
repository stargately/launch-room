import Form from "antd/lib/form";
import React, { CSSProperties, useEffect } from "react";
import notification from "antd/lib/notification";
import Search from "antd/lib/input/Search";
import Button from "antd/lib/button";
import Input from "antd/lib/input/Input";
import { styled } from "onefx/lib/styletron-react";
import { media } from "@/shared/common/styles/style-media";
import { useSubscribeToNewsletter } from "./hooks/use-subscribe-to-newsletter";

type Opts = {
  size?: "small" | "large";
  buttonText: string;
  placeholder: string;
  styles: CSSProperties;
  hideInMobile: boolean;
};

export function NewsletterForm({
  size = "small",
  buttonText,
  placeholder,
  styles,
  hideInMobile,
}: Opts): JSX.Element {
  const { subscribeToNewsletter, added, loading } = useSubscribeToNewsletter();

  useEffect(() => {
    if (added) {
      notification.success({ message: "Thank you for subscribing!" });
    }
  }, [added]);

  const components = {
    FormWrapper,
    Form,
  };
  const FormComponent = components[hideInMobile ? "FormWrapper" : "Form"];

  if (size === "small") {
    return (
      <FormComponent name="email-newsletter-small" style={styles}>
        <Search
          placeholder={placeholder}
          enterButton={buttonText}
          size="large"
          loading={loading}
          onSearch={async (email: string) => {
            await subscribeToNewsletter({ variables: { email } });
          }}
        />
      </FormComponent>
    );
  }

  return (
    <FormComponent
      name="email-newsletter-large"
      onFinish={async (values: any) => {
        await subscribeToNewsletter({ variables: values });
      }}
    >
      <Form.Item name="email">
        <Input placeholder={placeholder} size="large" />
      </Form.Item>

      <Form.Item>
        <ButtonWide htmlType="submit" loading={loading} size="large">
          {buttonText}
        </ButtonWide>
      </Form.Item>
    </FormComponent>
  );
}

const ButtonWide = styled(Button, () => ({
  width: "100%",
  minWidth: "288px",
}));

const FormWrapper = styled(Form, () => ({
  [media.palm]: {
    display: "none!important",
  },
}));
