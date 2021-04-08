import { gql } from "@apollo/client/core";

export const flagsStatus = gql`
  query FlagsStatus(
    $workspaceId: ID!
    $skip: Int!
    $limit: Int!
    $archived: Boolean!
  ) {
    flagsStatus(
      workspaceId: $workspaceId
      skip: $skip
      limit: $limit
      archived: $archived
    ) {
      skip
      limit
      total
      archived
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
