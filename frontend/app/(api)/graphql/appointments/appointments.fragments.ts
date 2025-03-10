import { gql } from "@apollo/client";

// Appointments Fragment
export const APPOINTMENTS_FRAGMENT = gql`
  fragment Appointments on Appointment {
    id
    title
    date
  }
`;

export default APPOINTMENTS_FRAGMENT;
