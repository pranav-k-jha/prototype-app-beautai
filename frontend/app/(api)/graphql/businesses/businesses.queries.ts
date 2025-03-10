import { gql } from "@apollo/client";
import { BUSINESS_FRAGMENT } from "./businesses.fragments";

// Business Queries
export const GET_ALL_BUSINESSES = gql`
  query GetAllBusinesses {
    businesses {
      id
      name
    }
  }
`;

export const GET_BUSINESS_BY_ID = gql`
  query GetBusinessById($provider_id: Int!) {
    getBusinessById(provider_id: $provider_id) {
      ...BusinessFragment
    }
  }
  ${BUSINESS_FRAGMENT}
`;

export default GET_ALL_BUSINESSES;
