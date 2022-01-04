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
    $variationsString: [String!]
    $variationsNumber: [Int!]
    $fallthrough: FallthroughInput
    $offVariation: Int
    $environment: ID!
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
      variationsString: $variationsString
      variationsNumber: $variationsNumber
      fallthrough: $fallthrough
      offVariation: $offVariation
      environment: $environment
      archived: $archived
    )
  }
`;
