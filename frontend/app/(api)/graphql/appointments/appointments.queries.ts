import { gql } from "@apollo/client";
import { APPOINTMENTS_FRAGMENT } from "./appointments.fragments";

// Appointments Queries
export const GET_ALL_APPOINTMENTS = gql`
  query GetAllAppointments {
    appointments {
      id
      title
    }
  }
`;

export const GET_APPOINTMENT_BY_ID = gql`
  query GetAppointmentById($appointment_id: Int!) {
    getAppointmentById(appointment_id: $appointment_id) {
      ...AppointmentsFragment
    }
  }
  ${APPOINTMENTS_FRAGMENT}
`;

export default GET_ALL_APPOINTMENTS;
