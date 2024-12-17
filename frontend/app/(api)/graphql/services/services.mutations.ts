import { gql } from '@apollo/client';
import { SERVICES_FRAGMENT } from '@/app/(api)/graphql/services/services.fragments';

//TODO These Functions defined in the mutations/queries of the frontend and
//Rewritten into gql code are mapped and retrieved from the backend resolvers.

export const CREATE_SERVICE = gql`
  mutation CreateServices($input: CreateServiceInput!) {
    createService(input: $input) {
      ...ServicesFragment
    }
  }
  ${SERVICES_FRAGMENT}
`;
