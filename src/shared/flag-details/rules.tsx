/* eslint-disable camelcase */
import * as React from "react";
import { FlagDetails_flagDetails_rules } from "@/shared/flag-details/data/__generated__/FlagDetails";
import Card from "antd/lib/card";
import Row from "antd/lib/grid/row";
import Col from "antd/lib/grid/col";
import { Select } from "antd";
import Form from "antd/lib/form";
import Input from "antd/lib/input";

export type RulesProps = {
  rules: FlagDetails_flagDetails_rules[];
  variance: boolean[];
};

const getDefaultRules = (): FlagDetails_flagDetails_rules[] => [
  {
    id: null,
    clauses: [
      {
        attribute: "email",
        op: "endsWith",
        values: [],
        negate: false,
      },
    ],
    variation: 0,
    trackEvents: false,
  },
  {
    id: null,
    clauses: [
      {
        attribute: "email",
        op: "startsWith",
        values: [],
        negate: false,
      },
    ],
    variation: 0,
    trackEvents: false,
  },
];

export function Rules({ rules, variance }: RulesProps): JSX.Element {
  const conertedRules = rules && rules.length ? rules : getDefaultRules();
  return (
    <Row gutter={[12, 12]}>
      <Col>Target users who match these rules</Col>
      {conertedRules.map((r, i) => (
        <Col key={i} span={24}>
          <Rule rule={r} variance={variance} index={i} />
        </Col>
      ))}
    </Row>
  );
}

type RuleProps = {
  rule: FlagDetails_flagDetails_rules;
  variance: boolean[];
  index: number;
};

const Rule: React.FC<RuleProps> = ({ rule, variance, index }) => {
  const clause = rule.clauses[0];
  return (
    <Card>
      <Form.Item name={`rules.${index}.id`} initialValue={rule.id} hidden>
        <Input />
      </Form.Item>

      <Row gutter={4}>
        <Col span={1}>IF</Col>

        <Col span={3}>
          <Form.Item
            name={`rules.${index}.clauses.0.attribute`}
            initialValue={clause.attribute}
          >
            <Select disabled style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col span={3}>
          <Form.Item
            name={`rules.${index}.clauses.0.op`}
            initialValue={clause.op}
          >
            <Select disabled style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col span={17}>
          <Form.Item
            name={`rules.${index}.clauses.0.values`}
            initialValue={clause.values}
          >
            <Select
              style={{ width: "100%" }}
              mode="tags"
              allowClear
              placeholder="Please select"
            />
          </Form.Item>

          {/* TODO(tian): what is this for? */}
          <Form.Item
            name={`rules.${index}.clauses.0.negate`}
            initialValue={clause.negate}
            hidden
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={4}>
        <Col span={2}>SERVE</Col>
        <Col span={4}>
          <Form.Item
            name={`rules.${index}.variation`}
            initialValue={rule.variation}
          >
            <Select disabled placeholder="Please select">
              {variance.map((v, i) => {
                return (
                  <Select.Option key={i} value={i}>
                    {String(v)}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        {/* TODO(tian): what is this for? */}
        <Form.Item
          name={`rules.${index}.trackEvents`}
          initialValue={rule.trackEvents}
          hidden
        >
          <Input />
        </Form.Item>
      </Row>
    </Card>
  );
};
