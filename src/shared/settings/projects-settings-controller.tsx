import React from "react";
import { useSelector } from "react-redux";
import Card from "antd/lib/card";
import Skeleton from "antd/lib/skeleton";
import Space from "antd/lib/space";
import { ProjectModal } from "@/shared/settings/project-modal";
import { EnvironmentModal } from "@/shared/settings/environment-modal";
import { EnvironmentDetails } from "@/shared/settings/environment-details";
import { useUpsertProject } from "@/shared/settings/hooks/use-upsert-project";
import { useFetchProjects } from "@/shared/settings/hooks/use-fetch-projects";
import { useUpsertEnvironment } from "@/shared/settings/hooks/use-upsert-environment";
import { useFetchEnvironments } from "@/shared/settings/hooks/use-fetch-environments";
import { UpsertProjectVariables } from "@/shared/settings/data/__generated__/UpsertProject";
import { UpsertEnvironmentVariables } from "@/shared/settings/data/__generated__/UpsertEnvironment";

export const ProjectsSettingsController: React.FC = () => {
  const workspaceId = useSelector(
    (state: { base: { workspaceId: string } }) => state.base.workspaceId
  );

  const { upsertProject } = useUpsertProject();
  const { upsertEnvironment } = useUpsertEnvironment();
  const { data: projects, refetch, loading: fetchLoading } = useFetchProjects({
    workspace: workspaceId,
  });
  const {
    data: environments,
    refetch: refetchEnvironments,
  } = useFetchEnvironments({
    workspace: workspaceId,
  });
  const onUpsertProjectClick = async (values: UpsertProjectVariables) => {
    await upsertProject({ ...values, workspace: workspaceId });
    await refetch();
  };
  const onUpsertEnvironmentClick = (project: string) => async (
    values: UpsertEnvironmentVariables
  ) => {
    await upsertEnvironment({ ...values, project });
    await refetchEnvironments();
  };

  return (
    <div>
      <ProjectModal action={onUpsertProjectClick} />

      {fetchLoading ? (
        <Card style={{ width: "100%" }}>
          <Skeleton active />
        </Card>
      ) : (
        projects?.map((item, i) => (
          <Card
            key={i}
            title={item.name}
            extra={
              <Space>
                <ProjectModal project={item} action={onUpsertProjectClick} />
                <EnvironmentModal action={onUpsertEnvironmentClick(item._id)} />
              </Space>
            }
            style={{ width: "100%", marginBottom: "16px" }}
          >
            {environments
              ?.filter((environment) => environment.project === item._id)
              ?.map((value) => (
                <EnvironmentDetails
                  key={value._id}
                  environment={value}
                  project={item._id}
                />
              ))}
          </Card>
        ))
      )}
    </div>
  );
};
