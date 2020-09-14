import { gql } from "@apollo/client/core";

export const subscribeToNewsletter = gql`
  mutation SubscribeToNewsletter(
    $email: String!
    $firstName: String
    $lastName: String
  ) {
    subscribeToNewsletter(
      email: $email
      firstName: $firstName
      lastName: $lastName
    ) {
      ok
    }
  }
`;
