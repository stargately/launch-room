import { gql } from "@apollo/client/core";

export const flagsStatus = gql`
  query FlagsStatus($workspaceId: ID!, $skip: Int!, $limit: Int!) {
    flagsStatus(workspaceId: $workspaceId, skip: $skip, limit: $limit) {
      skip
      limit
      total
      flags {
        key
        offVariation
        fallthrough {
          variation
        }
        rules {
          variation
        }
        variations
        on
      }
    }
  }
`;
