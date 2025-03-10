import { gql } from "@apollo/client";
import { SERVICE_FRAGMENT } from "./services.fragments";

// Service Mutations
export const CREATE_SERVICE = gql`
  mutation CreateService($input: CreateServiceInput!) {
    createService(input: $input) {
      id
      name
    }
  }
`;

export const UPDATE_SERVICE = gql`
  mutation UpdateService($updateServicesInput: UpdateServicesInput!) {
    updateService(updateServicesInput: $updateServicesInput) {
      ...ServiceFragment
    }
  }
  ${SERVICE_FRAGMENT}
`;

export const DELETE_SERVICE = gql`
  mutation RemoveService($service_id: Int!) {
    removeService(service_id: $service_id)
  }
`;

export default CREATE_SERVICE;
