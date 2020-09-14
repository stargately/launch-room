import { useMutation } from "@apollo/client";
import {
  UpsertFlag,
  UpsertFlagVariables,
} from "@/shared/flag-details/data/__generated__/UpsertFlag";
import { upsertFlag } from "@/shared/flag-details/data/mutations";
import { getOperationName } from "@apollo/client/utilities";
import { flagDetails } from "@/shared/flag-details/data/queries";

export const useUpsertFlag = () => {
  const [mutate, { data, loading }] = useMutation<UpsertFlag>(upsertFlag, {
    refetchQueries: [
      // @ts-ignore
      getOperationName(flagDetails),
    ],
  });
  return {
    upsertFlag: async (variables: UpsertFlagVariables) => {
      await mutate({ variables });
    },
    data,
    loading,
  };
};
