import { gql } from "@apollo/client/core";

export const fetchProjects = gql`
  query FetchProjects($workspace: ID!) {
    fetchProjects(workspace: $workspace) {
      _id
      name
      workspace
      deletedAt
    }
  }
`;

export const fetchEnvironments = gql`
  query FetchEnvironments($workspace: ID!) {
    fetchEnvironments(workspace: $workspace) {
      _id
      name
      project
      apiToken
      deletedAt
    }
  }
`;
