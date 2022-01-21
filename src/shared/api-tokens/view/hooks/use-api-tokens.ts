import { useQuery } from "@apollo/client";
import { fetchApiTokens } from "@/shared/api-tokens/view/data/queries";
import {
  FetchApiTokens,
  FetchApiTokensVariables,
} from "../data/__generated__/FetchApiTokens";

export const useFetchApiTokens = (variables: FetchApiTokensVariables) => {
  const { data, loading, refetch } = useQuery<FetchApiTokens>(fetchApiTokens, {
    variables,
  });
  return {
    data: data?.fetchApiTokens,
    loading,
    refetch,
  };
};
