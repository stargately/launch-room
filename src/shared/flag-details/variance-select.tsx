import * as React from "react";
import Form, { FormItemProps } from "antd/lib/form";
import Select from "antd/lib/select";

export const VarianceSelect: React.FC<{
  itemProps: FormItemProps;
  variance?: boolean[];
  disabled?: boolean;
}> = ({ itemProps, variance = [], disabled = true }) => {
  return (
    <Form.Item {...itemProps}>
      <Select disabled={disabled} placeholder="Please select">
        {variance.map((v, i) => {
          return (
            <Select.Option key={String(v)} value={i}>
              {String(v)}
            </Select.Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};
