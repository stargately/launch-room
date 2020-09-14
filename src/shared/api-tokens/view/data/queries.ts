import { gql } from "@apollo/client/core";

export const apiTokens = gql`
  query ApiTokens {
    apiTokens {
      _id
      sendgridApiKey
      carrierToken
      logoUrl
    }
  }
`;
