import React, { useMemo, useCallback, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "antd/lib/tabs";
import Space from "antd/lib/space";
import Typography from "antd/lib/typography";
import Select from "antd/lib/select";
import { t } from "onefx/lib/iso-i18n";
import { FlagsStatusTableController } from "@/shared/feature-flags/flags-status-table-controller";
import { ProjectsSettingsController } from "@/shared/settings/projects-settings-controller";
import { ContentPadding } from "@/shared/common/styles/style-padding";
import { useFetchProjects } from "@/shared/settings/hooks/use-fetch-projects";
import { useFetchEnvironments } from "@/shared/settings/hooks/use-fetch-environments";
import { RootState } from "@/client/javascripts/main";

const { TabPane } = Tabs;

export const FlagsTabs: React.FC = () => {
  const match = useRouteMatch<{ tab: string }>(
    "/:projectName/:environmentName/:tab"
  );
  const history = useHistory();

  const dispatch = useDispatch();

  const workspaceId = useSelector((state: RootState) => state.base.workspaceId);
  const currentEnvironment = useSelector(
    (state: RootState) => state.base.currentEnvironment
  );

  const { data: projects } = useFetchProjects({
    workspace: workspaceId,
  });
  const { data: environments } = useFetchEnvironments({
    workspace: workspaceId,
  });

  const currentProject = useMemo(
    () =>
      projects?.find((project) => project?._id === currentEnvironment?.project),
    [projects, currentEnvironment]
  );

  useEffect(() => {
    if (currentEnvironment && currentProject) {
      history.push(
        `/${currentProject?.name}/${currentEnvironment?.name}/${
          match?.params.tab || "flags"
        }`
      );
    }
  }, [currentProject, currentEnvironment]);

  const environmentOptions = useMemo(
    () =>
      environments?.reduce(
        (result: any, item) => ({
          ...result,
          [item.project]: [...(result[item.project] || []), item],
        }),
        []
      ),
    [environments]
  );

  const onChange = useCallback(
    (activeKey: string) => {
      history.push(
        `/${currentProject?.name}/${currentEnvironment?.name}/${activeKey}`
      );
    },
    [currentProject, currentEnvironment]
  );

  const onEnvironmentChange = (id: string) => {
    const targetEnvironment = environments?.find((value) => value._id === id);

    dispatch({ type: "SET_CURRENT_ENVIRONMENT", payload: targetEnvironment });
  };

  return (
    <ContentPadding style={{ marginTop: "16px" }}>
      <Tabs
        tabBarExtraContent={{
          left: (
            <Space style={{ marginRight: "16px" }}>
              {currentProject && currentEnvironment._id && (
                <>
                  <Typography.Text>{currentProject.name}</Typography.Text>
                  <Select
                    defaultValue={currentEnvironment._id}
                    style={{ width: 200 }}
                    onChange={onEnvironmentChange}
                  >
                    {environmentOptions &&
                      Object.keys(environmentOptions).map((key, i) => {
                        const project = projects?.find(
                          (value) => value._id === key
                        );

                        return (
                          <Select.OptGroup label={project?.name} key={i}>
                            {environmentOptions[key].map((value: any) => (
                              <Select.Option key={value._id} value={value._id}>
                                {value.name}
                              </Select.Option>
                            ))}
                          </Select.OptGroup>
                        );
                      })}
                  </Select>
                </>
              )}
            </Space>
          ),
        }}
        defaultActiveKey={match?.params.tab || "flags"}
        onChange={onChange}
      >
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
