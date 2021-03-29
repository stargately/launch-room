import { useQuery } from "@apollo/client";
import { FlagsStatus } from "@/shared/feature-flags/data/__generated__/FlagsStatus";
import { flagsStatus } from "@/shared/feature-flags/data/queries";

export const useFlagsStatus = ({
  workspaceId,
  skip,
  limit,
  archived,
}: {
  workspaceId: string;
  skip: number;
  limit: number;
  archived: boolean;
}) => {
  const { data, loading, refetch } = useQuery<FlagsStatus>(flagsStatus, {
    ssr: false,
    variables: {
      workspaceId,
      skip,
      limit,
      archived,
    },
  });
  return {
    flagsStatus: data?.flagsStatus,
    loading,
    refetch,
  };
};
