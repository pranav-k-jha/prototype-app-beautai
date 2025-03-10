import { gql } from "@apollo/client";

// Service Fragment
export const SERVICE_FRAGMENT = gql`
  fragment Service on Service {
    id
    name
  }
`;

export default SERVICE_FRAGMENT;
