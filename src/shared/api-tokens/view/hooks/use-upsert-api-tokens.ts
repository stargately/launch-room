import { useMutation } from "@apollo/client";
import { upsertApiTokens } from "@/shared/api-tokens/view/data/mutations";
import { UpsertApiTokens } from "../data/__generated__/UpsertApiTokens";

export const useUpsertApiTokens = () => {
  const [mutate, { data, loading }] = useMutation<UpsertApiTokens>(
    upsertApiTokens
  );
  return {
    mutate,
    data,
    loading,
  };
};
