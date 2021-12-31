import React from "react";
import Tabs from "antd/lib/tabs";
import { useHistory, useRouteMatch } from "react-router";
import { FlagsStatusTableController } from "@/shared/feature-flags/flags-status-table-controller";
import { ProjectsSettingsController } from "@/shared/settings/projects-settings-controller";
import { ContentPadding } from "@/shared/common/styles/style-padding";
import { t } from "onefx/lib/iso-i18n";

const { TabPane } = Tabs;

export const FlagsTabs: React.FC = () => {
  const match = useRouteMatch<{ tab: string }>("/default/:tab");
  const history = useHistory();
  const onChange = (activeKey: string) => {
    history.push(`/default/${activeKey}`);
  };
  return (
    <ContentPadding>
      <Tabs defaultActiveKey={match?.params.tab || "flags"} onChange={onChange}>
        <TabPane tab={t("feature_flags.tab_flag_title")} key="flags">
          <FlagsStatusTableController />
        </TabPane>
        <TabPane tab={t("feature_flags.tab_api_title")} key="settings">
          <ProjectsSettingsController />
        </TabPane>
      </Tabs>
    </ContentPadding>
  );
};
