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
