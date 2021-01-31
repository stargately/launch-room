import { gql } from "@apollo/client/core";

export const upsertFlag = gql`
  mutation UpsertFlag(
    $workspaceId: ID!
    $key: ID!
    $name: String
    $description: String
    $rules: [RuleInput!]
    $on: Boolean
    $variations: [Boolean!]
    $fallthrough: FallthroughInput
    $offVariation: Int
  ) {
    upsertFlag(
      workspaceId: $workspaceId
      key: $key
      rules: $rules
      on: $on
      name: $name
      description: $description
      variations: $variations
      fallthrough: $fallthrough
      offVariation: $offVariation
    )
  }
`;
