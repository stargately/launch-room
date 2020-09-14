/* eslint-disable camelcase */
import React from "react";
import { useFlagsStatus } from "@/shared/feature-flags/hooks/use-flags-status";
import { useSelector } from "react-redux";
import { FlagsStatusTable } from "./flags-status-table";

export const FlagsStatusTableController: React.FC = () => {
  const workspaceId = useSelector(
    (state: { base: { workspaceId: string } }) => state.base.workspaceId
  );
  const { flagsStatus } = useFlagsStatus({
    workspaceId,
    skip: 0,
    limit: 10000,
  });
  return <FlagsStatusTable data={flagsStatus?.flags || []} />;
};
