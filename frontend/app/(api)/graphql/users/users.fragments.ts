import { gql } from "@apollo/client";

// User Fragment
export const USER_FRAGMENT = gql`
  fragment User on User {
    id
    username
  }
`;

export default USER_FRAGMENT;
