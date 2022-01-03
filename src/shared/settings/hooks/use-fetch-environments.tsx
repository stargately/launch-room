import { useQuery } from "@apollo/client";
import { fetchEnvironments } from "@/shared/settings/data/queries";
import {
  FetchEnvironments,
  FetchEnvironmentsVariables,
} from "@/shared/settings/data/__generated__/FetchEnvironments";

export const useFetchEnvironments = (variables: FetchEnvironmentsVariables) => {
  const { data, loading, refetch } = useQuery<FetchEnvironments>(
    fetchEnvironments,
    {
      variables,
    }
  );
  return {
    data: data?.fetchEnvironments,
    loading,
    refetch,
  };
};
