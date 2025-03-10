import { gql } from "@apollo/client";
import { SERVICE_FRAGMENT } from "./services.fragments";

// Service Queries
export const FIND_ALL_SERVICES = gql`
  query FindAllServices {
    services {
      id
      name
    }
  }
`;

export const FIND_SERVICE_BY_ID = gql`
  query FindServiceById($service_id: Int!) {
    findServiceById(service_id: $service_id) {
      ...ServiceFragment
    }
  }
  ${SERVICE_FRAGMENT}
`;

export default FIND_ALL_SERVICES;
