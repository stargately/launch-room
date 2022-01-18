import React, { useState, useEffect } from "react";
import { styled } from "onefx/lib/styletron-react";
import { InternalNamePath } from "antd/lib/form/interface";
import Form, { FormInstance, FormItemProps } from "antd/lib/form";
import Select from "antd/lib/select";
import InputNumber from "antd/lib/input-number";
import Space from "antd/lib/space";
import Row from "antd/lib/row";
import Tag from "antd/lib/tag";
import Col from "antd/lib/col";
import { colors, VarIcon } from "@/shared/common/icons/var-icon";

export const VarianceSelect: React.FC<{
  itemProps: FormItemProps;
  form?: FormInstance;
  rolloutName?: InternalNamePath;
  variance?: boolean[];
  parentName?: string;
  loading?: boolean;
  isShowRollout?: boolean;
}> = ({
  form,
  itemProps,
  rolloutName,
  variance = [],
  parentName,
  loading,
  isShowRollout = false,
}) => {
  const [diffVariance, setDiffVariance] = useState({
    total: 0,
    currentVariances: [] as number[],
  });

  useEffect(() => {
    if (form) {
      const currentVariances: number[] = variance?.map((_, k) =>
        form.getFieldValue(
          parentName
            ? [parentName, ...(rolloutName as InternalNamePath), k]
            : [...(rolloutName as InternalNamePath), k]
        )
      );
      setDiffVariance({
        total: currentVariances.reduce(
          (a, b) => Number(a || 0) + Number(b || 0),
          0
        ),
        currentVariances,
      });
    }
  }, [variance]);

  if (isShowRollout) {
    return (
      <Form.Item shouldUpdate noStyle>
        {({ getFieldValue }) => {
          const currentSelectedVariance = getFieldValue(
            parentName
              ? [parentName, ...(itemProps.name as InternalNamePath)]
              : (itemProps.name as InternalNamePath)
          );

          return (
            <Space direction="vertical" style={{ width: "100%" }}>
              <Form.Item {...itemProps}>
                <Select
                  placeholder="Please select"
                  loading={loading}
                  style={{ minWidth: "175px" }}
                >
                  {variance.map((v, i) => {
                    return (
                      <Select.Option key={JSON.stringify(v)} value={i}>
                        {JSON.stringify(v)}
                      </Select.Option>
                    );
                  })}
                  {/*
              // @ts-ignore */}
                  <Select.Option>a percentage rollout</Select.Option>
                </Select>
              </Form.Item>
              {currentSelectedVariance === null && (
                <>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <StyledContainer>
                      {diffVariance.total !== 0 &&
                        diffVariance.currentVariances.map((v, i) => (
                          <div
                            key={i}
                            style={{
                              height: "10px",
                              backgroundColor: colors[i % 12],
                              width: `${(v / diffVariance.total) * 100}%`,
                            }}
                          />
                        ))}
                    </StyledContainer>
                    {variance.map((v, i) => {
                      return (
                        <Row align="top" key={i}>
                          <Col>
                            <Form.Item
                              rules={[
                                () => ({
                                  validator() {
                                    const currentVariances: number[] = variance.map(
                                      (_, k) =>
                                        getFieldValue(
                                          parentName
                                            ? [
                                                parentName,
                                                ...(rolloutName as InternalNamePath),
                                                k,
                                              ]
                                            : [
                                                ...(rolloutName as InternalNamePath),
                                                k,
                                              ]
                                        )
                                    );
                                    const totalVariance = currentVariances.reduce(
                                      (a, b) => Number(a || 0) + Number(b || 0)
                                    );
                                    if (totalVariance === 100) {
                                      setDiffVariance({
                                        total: totalVariance,
                                        currentVariances,
                                      });
                                      return Promise.resolve();
                                    }
                                    setDiffVariance({
                                      total: totalVariance,
                                      currentVariances,
                                    });
                                    return Promise.reject(new Error(" "));
                                  },
                                }),
                              ]}
                              name={[...(rolloutName as InternalNamePath), i]}
                            >
                              <InputNumber max={100} precision={0} />
                            </Form.Item>
                          </Col>
                          <Col style={{ marginTop: "8px" }}>
                            <VarIcon index={i} />
                          </Col>
                          <Col style={{ marginTop: "6px" }}>
                            {JSON.stringify(v)}
                          </Col>
                        </Row>
                      );
                    })}
                    {diffVariance.total !== 100 && (
                      <Space>
                        <Tag color="error">{100 - diffVariance.total}%</Tag>
                        need to be assigned to a variation
                      </Space>
                    )}
                  </Space>
                </>
              )}
            </Space>
          );
        }}
      </Form.Item>
    );
  }

  return (
    <Form.Item {...itemProps}>
      <Select
        placeholder="Please select"
        loading={loading}
        style={{ minWidth: "175px" }}
      >
        {variance.map((v, i) => {
          return (
            <Select.Option key={JSON.stringify(v)} value={i}>
              {JSON.stringify(v)}
            </Select.Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};

const StyledContainer = styled("div", {
  width: "100%",
  height: "10px",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f8f8f8",
});
