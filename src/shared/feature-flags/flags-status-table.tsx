/* eslint-disable camelcase */
import React from "react";
import Table from "antd/lib/table/Table";
import { FlagsStatus_flagsStatus_flags } from "@/shared/feature-flags/data/__generated__/FlagsStatus";
import { ColumnsType } from "antd/lib/table";
import { ContentPadding } from "@/shared/common/styles/style-padding";
import { Link } from "onefx/lib/react-router-dom";
import { CommonMargin } from "@/shared/common/common-margin";
import { NewFlagController } from "./new-flag-controller";

type Props = {
  data: FlagsStatus_flagsStatus_flags[];
};

const columns: ColumnsType<FlagsStatus_flagsStatus_flags> = [
  {
    key: "key",
    title: "Name",
    dataIndex: "key",
    render(key, _record, _index) {
      return <Link to={`/default/features/${key}`}>{key}</Link>;
    },
  },
  {
    key: "variance",
    title: "Serving variations",
    dataIndex: "variations",
    render(variations, record, _index) {
      let val;
      if (!record.on) {
        val = variations[record.offVariation];
      } else {
        const set = new Set();
        for (const r of record.rules || []) {
          set.add(variations[r.variation]);
        }
        set.add(variations[record.fallthrough.variation]);
        val = [...set];
      }
      return <pre>{String(val)}</pre>;
    },
  },
  // {
  //   key: "on",
  //   title: "Flag Switch",
  //   dataIndex: "on",
  //   render(value, _record, _index) {
  //     return <Switch defaultChecked={value} onChange={() => null} />;
  //   },
  // },
];

export const FlagsStatusTable: React.FC<Props> = ({ data }) => {
  return (
    <ContentPadding>
      <CommonMargin />
      <h1>Feature Flags</h1>
      <NewFlagController />
      <div>
        Use this page to see all feature flags in this project. Select a flag to
        manage the environment-specific targeting and rollout rules.
      </div>
      <Table<FlagsStatus_flagsStatus_flags>
        columns={columns}
        dataSource={data}
      />
    </ContentPadding>
  );
};
