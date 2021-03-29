import { gql } from "@apollo/client/core";

export const upsertFlag = gql`
  mutation UpsertFlag(
    $workspaceId: ID!
    $key: ID!
    $name: String
    $description: String
    $rules: [RuleInput!]
    $on: Boolean
    $variationsBoolean: [Boolean!]
    $variationsJson: [String!]
    $fallthrough: FallthroughInput
    $offVariation: Int
    $archived: Boolean
  ) {
    upsertFlag(
      workspaceId: $workspaceId
      key: $key
      rules: $rules
      on: $on
      name: $name
      description: $description
      variationsBoolean: $variationsBoolean
      variationsJson: $variationsJson
      fallthrough: $fallthrough
      offVariation: $offVariation
      archived: $archived
    )
  }
`;
