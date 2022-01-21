import React from "react";
import { useSelector } from "react-redux";
import Row from "antd/lib/row";
import { EnvironmentModal } from "@/shared/settings/environment-modal";
import { useUpsertEnvironment } from "@/shared/settings/hooks/use-upsert-environment";
import { useFetchEnvironments } from "@/shared/settings/hooks/use-fetch-environments";
import { useFetchApiTokens } from "@/shared/api-tokens/view/hooks/use-api-tokens";
import { useUpsertApiTokens } from "@/shared/api-tokens/view/hooks/use-upsert-api-tokens";

type Props = {
  environment: {
    _id: string;
    name: string;
    project: string;
    apiToken: string;
    deletedAt: any | null;
  };
  project: string;
};

export const EnvironmentDetails: React.FC<Props> = ({
  environment,
  project,
}) => {
  const workspaceId = useSelector(
    (state: { base: { workspaceId: string } }) => state.base.workspaceId
  );

  const { upsertEnvironment } = useUpsertEnvironment();
  const { upsertApiTokens } = useUpsertApiTokens();

  const { refetch: refetchEnvironments } = useFetchEnvironments({
    workspace: workspaceId,
  });

  const { data: apiToken, refetch: refetchApiTokens } = useFetchApiTokens({
    _id: environment.apiToken,
  });

  const onUpsertEnvironmentClick = async (values: any) => {
    await upsertEnvironment({ ...values, project });
    if (values._id && apiToken?._id) {
      await upsertApiTokens({
        _id: apiToken._id,
        launchRoomToken: values.launchRoomToken,
      });
      await refetchApiTokens();
    }
    await refetchEnvironments();
  };

  return (
    <Row key={environment._id} justify="space-between" align="middle">
      <div>{environment.name}</div>
      <div>{apiToken?.launchRoomToken}</div>
      <EnvironmentModal
        launchRoomToken={apiToken?.launchRoomToken}
        environment={environment}
        action={onUpsertEnvironmentClick}
      />
    </Row>
  );
};
