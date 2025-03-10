import { gql } from "@apollo/client";
import { BUSINESS_FRAGMENT } from "./businesses.fragments";

// Business Mutations
export const CREATE_BUSINESS = gql`
  mutation CreateBusiness($input: CreateBusinessInput!) {
    createBusiness(input: $input) {
      id
      name
    }
  }
`;

export const UPDATE_BUSINESS = gql`
  mutation UpdateBusiness(
    $provider_id: Int!
    $updateBusinessInput: UpdateBusinessInput!
  ) {
    updateExistingBusiness(
      provider_id: $provider_id
      updateBusinessInput: $updateBusinessInput
    ) {
      ...BusinessFragment
    }
  }
  ${BUSINESS_FRAGMENT}
`;

export const DELETE_BUSINESS = gql`
  mutation DeleteBusiness($provider_id: Int!) {
    deleteBusinessById(provider_id: $provider_id)
  }
`;

export default CREATE_BUSINESS;
