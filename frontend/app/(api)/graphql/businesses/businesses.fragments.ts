import { gql } from "@apollo/client";

// Business Fragment
export const BUSINESS_FRAGMENT = gql`
  fragment Business on Business {
    id
    name
  }
`;

export default BUSINESS_FRAGMENT;
