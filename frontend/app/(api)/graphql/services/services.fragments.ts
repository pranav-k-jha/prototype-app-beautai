import { gql } from '@apollo/client';

export const SERVICES_FRAGMENT = gql`
  fragment ServicesFragment on Services {
    service_id
    service_name
    service_category
    service_description
    duration
    price
    created_at
    updated_at
  }
`;


