import { gql } from "@apollo/client/core";

export const upsertFlag = gql`
  mutation UpsertFlag(
    $workspaceId: ID!
    $key: ID!
    $rules: [RuleInput!]
    $on: Boolean
  ) {
    upsertFlag(workspaceId: $workspaceId, key: $key, rules: $rules, on: $on)
  }
`;
