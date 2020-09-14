import { gql } from "@apollo/client/core";

export const upsertApiTokens = gql`
  mutation UpsertApiTokens(
    $_id: String!
    $sendgridApiKey: String
    $carrierToken: String
  ) {
    upsertApiTokens(
      _id: $_id
      sendgridApiKey: $sendgridApiKey
      carrierToken: $carrierToken
    ) {
      _id
    }
  }
`;
