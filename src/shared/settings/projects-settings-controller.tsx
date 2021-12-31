import React from "react";
import { useSelector } from "react-redux";
import Card from "antd/lib/card";
import Skeleton from "antd/lib/skeleton";
import Button from "antd/lib/button";
import Space from "antd/lib/space";
import { ProjectModal } from "@/shared/settings/project-modal";
import { useUpsertProject } from "@/shared/settings/hooks/use-upsert-project";
import { useFetchProjects } from "@/shared/settings/hooks/use-fetch-projects";
import { UpsertProjectVariables } from "@/shared/settings/data/__generated__/upsertProject";

export const ProjectsSettingsController: React.FC = () => {
  const workspaceId = useSelector(
    (state: { base: { workspaceId: string } }) => state.base.workspaceId
  );

  const { upsertProject, loading } = useUpsertProject();
  const { data, refetch, loading: fetchLoading } = useFetchProjects({
    workspace: workspaceId,
  });

  const onUpsertProjectClick = async (values: UpsertProjectVariables) => {
    await upsertProject({ ...values, workspace: workspaceId });
    await refetch();
  };

  console.log(data, 111, fetchLoading, refetch);
  return (
    <div>
      <ProjectModal action={onUpsertProjectClick} loading={loading} />

      {fetchLoading ? (
        <Card style={{ width: "100%" }}>
          <Skeleton active />
        </Card>
      ) : (
        data?.map((item, i) => (
          <Card
            key={i}
            title={item.name}
            extra={
              <Space>
                <ProjectModal
                  project={item}
                  action={onUpsertProjectClick}
                  loading={loading}
                />
                <Button>Create environment</Button>
              </Space>
            }
            style={{ width: "100%", marginBottom: "16px" }}
          >
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        ))
      )}
    </div>
  );
};
