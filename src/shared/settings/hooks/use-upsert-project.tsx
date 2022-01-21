import { useMutation } from "@apollo/client";
import {
  UpsertProject,
  UpsertProjectVariables,
} from "@/shared/settings/data/__generated__/UpsertProject";
import { upsertProject } from "@/shared/settings/data/mutations";

export const useUpsertProject = () => {
  const [mutate, { data, loading }] = useMutation<UpsertProject>(upsertProject);
  return {
    upsertProject: async (variables: UpsertProjectVariables) => {
      await mutate({ variables });
    },
    data,
    loading,
  };
};
