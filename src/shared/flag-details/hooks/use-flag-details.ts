import { useQuery } from "@apollo/client";
import { FlagDetails } from "@/shared/flag-details/data/__generated__/FlagDetails";
import { flagDetails } from "@/shared/flag-details/data/queries";

export const useFlagDetails = ({
  workspaceId,
  key,
}: {
  workspaceId: string;
  key: string;
}) => {
  const { data, loading } = useQuery<FlagDetails>(flagDetails, {
    ssr: false,
    variables: {
      workspaceId,
      key,
    },
  });
  return {
    flagDetails: data?.flagDetails,
    loading,
  };
};
