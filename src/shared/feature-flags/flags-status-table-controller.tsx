/* eslint-disable camelcase */
import React from "react";
import { useFlagsStatus } from "@/shared/feature-flags/hooks/use-flags-status";
import { useSelector } from "react-redux";
import { useUpsertFlag } from "@/shared/flag-details/hooks/use-upsert-flag";
import { FlagsStatusTable } from "./flags-status-table";
import { WorkspaceIdContext, RefetchContext } from "./context";

export const FlagsStatusTableController: React.FC = () => {
  const workspaceId = useSelector(
    (state: { base: { workspaceId: string } }) => state.base.workspaceId
  );
  const { flagsStatus, refetch, loading } = useFlagsStatus({
    workspaceId,
    skip: 0,
    limit: 10000,
    archived: false,
  });
  const { upsertFlag } = useUpsertFlag();

  return (
    <WorkspaceIdContext.Provider value={workspaceId}>
      <RefetchContext.Provider value={refetch}>
        <FlagsStatusTable
          data={flagsStatus?.flags || []}
          archived={flagsStatus?.archived || false}
          loading={loading}
          upsertFlag={upsertFlag}
        />
      </RefetchContext.Provider>
    </WorkspaceIdContext.Provider>
  );
};
