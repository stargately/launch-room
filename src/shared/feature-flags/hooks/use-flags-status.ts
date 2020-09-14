import { useQuery } from "@apollo/client";
import { FlagsStatus } from "@/shared/feature-flags/data/__generated__/FlagsStatus";
import { flagsStatus } from "@/shared/feature-flags/data/queries";

export const useFlagsStatus = ({
  workspaceId,
  skip,
  limit,
}: {
  workspaceId: string;
  skip: number;
  limit: number;
}) => {
  const { data, loading } = useQuery<FlagsStatus>(flagsStatus, {
    ssr: false,
    variables: {
      workspaceId,
      skip,
      limit,
    },
  });
  return {
    flagsStatus: data?.flagsStatus,
    loading,
  };
};
