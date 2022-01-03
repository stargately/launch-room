import { useMutation } from "@apollo/client";
import {
  UpsertEnvironment,
  UpsertEnvironmentVariables,
} from "@/shared/settings/data/__generated__/upsertEnvironment";
import { upsertEnvironment } from "@/shared/settings/data/mutations";

export const useUpsertEnvironment = () => {
  const [mutate, { data, loading }] = useMutation<UpsertEnvironment>(
    upsertEnvironment
  );
  return {
    upsertEnvironment: async (variables: UpsertEnvironmentVariables) => {
      await mutate({ variables });
    },
    data,
    loading,
  };
};
