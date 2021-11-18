/* eslint-disable camelcase */
import React from "react";
import { Link } from "onefx/lib/react-router-dom";
import { t } from "onefx/lib/iso-i18n";
import Table from "antd/lib/table/Table";
import ConfigProvider from "antd/lib/config-provider";
import Skeleton from "antd/lib/skeleton";
import Space from "antd/lib/space";
import Typography from "antd/lib/typography";
import Row from "antd/lib/row";
import { ColumnsType } from "antd/lib/table";
import Button from "antd/lib/button";
import Menu from "antd/lib/menu";
import Dropdown from "antd/lib/dropdown";
import Popconfirm from "antd/lib/popconfirm";
import notification from "antd/lib/notification";
import MenuOutlined from "@ant-design/icons/MoreOutlined";
import DashOutlined from "@ant-design/icons/DashOutlined";
import { FlagsStatus_flagsStatus_flags } from "@/shared/feature-flags/data/__generated__/FlagsStatus";
import { UpsertFlagVariables } from "@/shared/flag-details/data/__generated__/UpsertFlag";
import {
  RefetchContext,
  WorkspaceIdContext,
} from "@/shared/feature-flags/context";
import { CommonMargin } from "@/shared/common/common-margin";
import { VarIcon } from "@/shared/common/icons/var-icon";
import { NewFlagController } from "./new-flag-controller";

type Props = {
  data: FlagsStatus_flagsStatus_flags[];
  archived: boolean;
  loading?: boolean;
  upsertFlag: (variables: UpsertFlagVariables) => Promise<void>;
};

export const FlagsStatusTable: React.FC<Props> = ({
  data,
  archived,
  loading,
  upsertFlag,
}) => {
  const refetch = React.useContext(RefetchContext);
  const workspaceId = React.useContext(WorkspaceIdContext);

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
      render(_, record) {
        return (
          <Row align="middle">
            <VarIcon index={record.offVariation} />
            <pre style={{ margin: "0" }}>
              {JSON.stringify(record.variations[record.offVariation])}
            </pre>
            <Typography.Text type="secondary"> - off variation</Typography.Text>
          </Row>
        );
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
    {
      title: function renderTitle() {
        return (
          <Dropdown
            arrow
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item onClick={() => refetch({ archived: !archived })}>
                  {archived
                    ? t("feature_flags.active_flag_view")
                    : t("feature_flags.archived_flag_view")}
                </Menu.Item>
              </Menu>
            }
          >
            <Button shape="circle" type="text" icon={<MenuOutlined />} />
          </Dropdown>
        );
      },
      key: "action",
      width: "64px",
      render: function renderAction({ key }) {
        return (
          <Dropdown
            arrow
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item>
                  <Popconfirm
                    title={
                      archived
                        ? t("feature_flags.restore_flag_title")
                        : t("feature_flags.archive_flag_title")
                    }
                    onConfirm={async () => {
                      try {
                        await upsertFlag({
                          workspaceId,
                          key,
                          archived: !archived,
                        });
                        refetch({ archived });
                        notification.success({
                          message: archived
                            ? t("feature_flags.success_restore_flag_message")
                            : t("feature_flags.success_archive_flag_message"),
                        });
                      } catch (e) {
                        notification.error({ message: e.message });
                      }
                    }}
                  >
                    {archived
                      ? t("feature_flags.restore_flag_label")
                      : t("feature_flags.archive_flag_label")}
                  </Popconfirm>
                </Menu.Item>
              </Menu>
            }
          >
            <Button shape="circle" type="text" icon={<DashOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <>
      <CommonMargin />
      <h1>
        {archived
          ? t("feature_flags.archived_flag_title")
          : t("feature_flags.flag_title")}
      </h1>
      <NewFlagController newFlagLabel="+ Flag" />
      <p>
        {archived
          ? t("feature_flags.archived_flag_description")
          : t("feature_flags.flag_description")}
      </p>
      <ConfigProvider
        renderEmpty={() => (
          <Skeleton active loading={loading}>
            <Space direction="vertical" style={{ textAlign: "left" }}>
              <Typography.Title level={5} type="secondary">
                {archived
                  ? t("feature_flags.not_found_archived_title")
                  : t("feature_flags.not_found_title")}
              </Typography.Title>
              <Typography.Text type="secondary">
                {archived ? (
                  <ul>
                    <li>
                      {t("feature_flags.not_found_archived_description_1")}
                    </li>
                    <li>
                      {t("feature_flags.not_found_archived_description_2")}
                    </li>
                    <li>
                      {t("feature_flags.not_found_archived_description_3")}
                    </li>
                  </ul>
                ) : (
                  t("feature_flags.not_found_description")
                )}
              </Typography.Text>
              {!archived && <NewFlagController newFlagLabel="CREATE FLAG" />}
            </Space>
          </Skeleton>
        )}
      >
        <Table<FlagsStatus_flagsStatus_flags>
          columns={columns}
          dataSource={data}
        />
      </ConfigProvider>
    </>
  );
};
