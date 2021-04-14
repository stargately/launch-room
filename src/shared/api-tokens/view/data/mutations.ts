import { gql } from "@apollo/client/core";

export const upsertApiTokens = gql`
  mutation UpsertApiTokens($_id: String!, $launchRoomToken: String!) {
    upsertApiTokens(_id: $_id, launchRoomToken: $launchRoomToken) {
      _id
    }
  }
`;
