import { useQuery } from "@apollo/client";
import { apiTokens } from "@/shared/api-tokens/view/data/queries";
import { ApiTokens } from "../data/__generated__/ApiTokens";

export const useApiTokens = () => {
  const { data, loading } = useQuery<ApiTokens>(apiTokens, {
    ssr: false,
  });
  return {
    data,
    loading,
  };
};
