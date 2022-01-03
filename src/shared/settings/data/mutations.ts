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

export const upsertEnvironment = gql`
  mutation UpsertEnvironment(
    $_id: ID
    $name: String!
    $project: ID
    $deletedAt: DateTime
  ) {
    upsertEnvironment(
      _id: $_id
      name: $name
      project: $project
      deletedAt: $deletedAt
    ) {
      _id
    }
  }
`;
