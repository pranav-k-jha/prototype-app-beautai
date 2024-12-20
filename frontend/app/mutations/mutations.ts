import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
  mutation Signup($signupUserInput: SignupUserInput!) {
    signup(signupUserInput: $signupUserInput) {
      name
      email
    }
  }
`;
