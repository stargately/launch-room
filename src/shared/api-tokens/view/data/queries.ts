import { gql } from "@apollo/client/core";

export const fetchApiTokens = gql`
  query FetchApiTokens($_id: ID!) {
    fetchApiTokens(_id: $_id) {
      _id
      launchRoomToken
    }
  }
`;
