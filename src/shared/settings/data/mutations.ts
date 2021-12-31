import { gql } from "@apollo/client/core";

export const upsertProject = gql`
  mutation UpsertProject(
    $_id: ID
    $name: String!
    $workspace: ID!
    $deletedAt: DateTime
  ) {
    upsertProject(
      _id: $_id
      name: $name
      workspace: $workspace
      deletedAt: $deletedAt
    ) {
      _id
    }
  }
`;
