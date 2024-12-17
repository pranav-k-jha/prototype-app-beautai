import { useQuery, gql } from '@apollo/client';
import { SERVICES_FRAGMENT } from '@/app/(api)/graphql/services/services.fragments';

export const GET_SERVICE_BY_ID = gql`
  query GetServiceById($service_id: Int!) {
    services(service_id: $service_id) {
      ...ServicesFragment
    }
  }
  ${SERVICES_FRAGMENT}
`;









