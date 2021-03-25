import React from "react";
import { useParams } from "react-router";
import { useFlagDetails } from "@/shared/flag-details/hooks/use-flag-details";
import { useUpsertFlag } from "@/shared/flag-details/hooks/use-upsert-flag";
import { useSelector } from "react-redux";
import { FlagDetails } from "@/shared/flag-details/flag-details";

export const FlagDetailsController: React.FC = () => {
  const workspaceId = useSelector(
    (state: { base: { workspaceId: string } }) => state.base.workspaceId
  );
  const { flagKey } = useParams<{ flagKey: string }>();
  const { flagDetails, loading: isFetching } = useFlagDetails({
    key: flagKey,
    workspaceId,
  });
  const { upsertFlag, loading: isPosting } = useUpsertFlag();
  return (
    <FlagDetails
      flagDetails={flagDetails}
      flagKey={flagKey}
      upsertFlag={upsertFlag}
      workspaceId={workspaceId}
      isFetching={isFetching}
      isPosting={isPosting}
    />
  );
};
