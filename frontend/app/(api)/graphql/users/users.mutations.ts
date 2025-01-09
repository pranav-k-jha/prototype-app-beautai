import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "./users.fragments";

// User Mutations
export const SIGNUP_USER = gql`
  mutation SignupUser($signupUserInput: SignupUserInput!) {
    access_token
    refresh_token
    user {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const LOGIN_USER = gql`
  mutation Login($emailOrUsername: String!, $password: String!) {
    login(
      loginUserInput: { emailOrUsername: $emailOrUsername, password: $password }
    ) {
      access_token
      refresh_token
      user {
        user_id
        username
        email
        name
      }
    }
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($identifier: String!, $newPassword: String!) {
    resetPassword(identifier: $identifier, newPassword: $newPassword)
  }
`;
