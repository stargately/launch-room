import { gql } from "@apollo/client/core";

export const flagDetails = gql`
  query FlagDetails($workspaceId: ID!, $key: ID!) {
    flagDetails(workspaceId: $workspaceId, key: $key) {
      on
      rules {
        id
        clauses {
          attribute
          op
          values
          negate
        }
        variation
        trackEvents
      }
      variations
      fallthrough {
        variation
      }
      offVariation
      archived
    }
  }
`;
