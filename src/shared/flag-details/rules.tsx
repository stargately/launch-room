import * as React from "react";
import Card from "antd/lib/card";
import Space from "antd/lib/space";
import Typography from "antd/lib/typography";
import Row from "antd/lib/row";
import Menu from "antd/lib/menu";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Dropdown from "antd/lib/dropdown";
import Skeleton from "antd/lib/skeleton";
import MoreOutlined from "@ant-design/icons/MoreOutlined";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import MinusOutlined from "@ant-design/icons/MinusOutlined";
import { VarianceSelect } from "@/shared/flag-details/variance-select";
import operators from "@/shared/flag-details/data/operators";
import attributes from "@/shared/flag-details/data/attributes";

export type RulesProps = {
  variance: boolean[];
  loading?: boolean;
};

export function Rules({ variance, loading }: RulesProps): JSX.Element {
  return (
    <>
      <Form.List name="rules">
        {(fields, { add, remove }) => (
          <Space direction="vertical" style={{ width: "100%" }}>
            <Skeleton active loading={loading}>
              {fields.map((field) => (
                <Rule
                  variance={variance}
                  index={field.key}
                  key={field.key}
                  remove={() => remove(field.name)}
                />
              ))}
            </Skeleton>
            <Form.Item>
              <Button
                block
                type="dashed"
                onClick={() =>
                  add({
                    variation: 0,
                    trackEvents: false,
                    clauses: [{ values: [] }],
                  })
                }
                icon={<PlusOutlined />}
              >
                Add rules
              </Button>
            </Form.Item>
          </Space>
        )}
      </Form.List>

      <Card>
        <VarianceSelect
          itemProps={{
            name: "fallthrough.variation",
            label: "Default Rule",
          }}
          variance={variance}
          disabled={false}
          loading={loading}
        />
      </Card>
    </>
  );
}

type RuleProps = {
  variance: boolean[];
  index: number;
  remove: () => void;
};

const Rule: React.FC<RuleProps> = ({ variance, index, remove }) => {
  const operatorOptions = operators.reduce((acc, { id, label }): any => {
    if (label) {
      return [...acc, { value: id, label }];
    }
    return acc;
  }, []);

  return (
    <Card>
      <Row gutter={[4, 20]}>
        <Col flex="auto">
          <Typography.Title level={5}>Rule {index + 1}</Typography.Title>
        </Col>
        <Col flex="32px">
          <Dropdown
            arrow
            placement="bottomRight"
            overlay={
              <Menu onClick={() => remove()}>
                <Menu.Item>Delete rule</Menu.Item>
              </Menu>
            }
          >
            <Button type="text" shape="circle" icon={<MoreOutlined />} />
          </Dropdown>
        </Col>
      </Row>

      <Form.Item name={["rules", index, "id"]} hidden>
        <Input />
      </Form.Item>

      <Form.List name={[index, "clauses"]}>
        {(fields, { add, remove: removeClause }) =>
          fields.map((field) => (
            <Row key={field.fieldKey} gutter={[4, 20]} align="middle">
              <Col span={1}>{field.name > 0 ? "AND" : "IF"}</Col>

              <Col span={5}>
                <Form.Item
                  noStyle
                  name={[field.name, "attribute"]}
                  fieldKey={[field.fieldKey, "attribute"]}
                >
                  <Select options={attributes} />
                </Form.Item>
              </Col>

              <Form.Item
                noStyle
                shouldUpdate={(prevValues, curValues) =>
                  prevValues.rules[index].clauses[field.name].attribute !==
                  curValues.rules[index].clauses[field.name].attribute
                }
              >
                {({ getFieldValue }) =>
                  !["segmentMatch", "not-segmentMatch"].includes(
                    getFieldValue([
                      "rules",
                      index,
                      "clauses",
                      field.name,
                      "attribute",
                    ])
                  ) && (
                    <Col span={5}>
                      <Form.Item
                        noStyle
                        name={[field.name, "op"]}
                        fieldKey={[field.fieldKey, "op"]}
                      >
                        <Select options={operatorOptions} />
                      </Form.Item>
                    </Col>
                  )
                }
              </Form.Item>

              <Col flex="auto">
                <Form.Item
                  noStyle
                  name={[field.name, "values"]}
                  fieldKey={[field.fieldKey, "values"]}
                >
                  <Select
                    style={{ width: "100%" }}
                    mode="tags"
                    allowClear
                    placeholder="Please select"
                  />
                </Form.Item>
              </Col>
              <Col span={2}>
                {(field.name !== 0 || fields.length !== 1) && (
                  <Button
                    type="text"
                    shape="circle"
                    onClick={() => removeClause(field.name)}
                    icon={<MinusOutlined />}
                  />
                )}

                {field.name + 1 === fields.length && (
                  <Button
                    type="text"
                    shape="circle"
                    onClick={() => add({ values: [] })}
                    icon={<PlusOutlined />}
                  />
                )}
              </Col>
            </Row>
          ))
        }
      </Form.List>

      <Row gutter={4} align="middle">
        <Col span={2}>SERVE</Col>
        <Col span={4}>
          <VarianceSelect
            itemProps={{
              name: [index, "variation"],
              noStyle: true,
            }}
            variance={variance}
          />
        </Col>
        {/* TODO(tian): what is this for? */}
        <Form.Item name={[index, "trackEvents"]} hidden>
          <Input />
        </Form.Item>
      </Row>
    </Card>
  );
};
