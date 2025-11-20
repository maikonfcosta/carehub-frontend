import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Appointment_Key {
  id: UUIDString;
  __typename?: 'Appointment_Key';
}

export interface CreateNewPatientData {
  patient_insert: Patient_Key;
}

export interface CreateNewPatientVariables {
  firstName: string;
  lastName: string;
  contactNumber: string;
  dateOfBirth: DateString;
  email?: string | null;
}

export interface Doctor_Key {
  id: UUIDString;
  __typename?: 'Doctor_Key';
}

export interface GetDoctorByIdData {
  doctor?: {
    id: UUIDString;
    firstName: string;
    lastName: string;
    specialization: string;
    contactNumber: string;
    email?: string | null;
    clinicAddress?: string | null;
  } & Doctor_Key;
}

export interface GetDoctorByIdVariables {
  id: UUIDString;
}

export interface ListUpcomingAppointmentsForPatientData {
  appointments: ({
    id: UUIDString;
    doctor: {
      firstName: string;
      lastName: string;
      specialization: string;
    };
      appointmentDateTime: TimestampString;
      reason: string;
      status?: string | null;
      notes?: string | null;
  } & Appointment_Key)[];
}

export interface ListUpcomingAppointmentsForPatientVariables {
  patientId: UUIDString;
}

export interface Patient_Key {
  id: UUIDString;
  __typename?: 'Patient_Key';
}

export interface UpdateAppointmentStatusData {
  appointment_update?: Appointment_Key | null;
}

export interface UpdateAppointmentStatusVariables {
  id: UUIDString;
  status: string;
}

interface CreateNewPatientRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewPatientVariables): MutationRef<CreateNewPatientData, CreateNewPatientVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewPatientVariables): MutationRef<CreateNewPatientData, CreateNewPatientVariables>;
  operationName: string;
}
export const createNewPatientRef: CreateNewPatientRef;

export function createNewPatient(vars: CreateNewPatientVariables): MutationPromise<CreateNewPatientData, CreateNewPatientVariables>;
export function createNewPatient(dc: DataConnect, vars: CreateNewPatientVariables): MutationPromise<CreateNewPatientData, CreateNewPatientVariables>;

interface GetDoctorByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDoctorByIdVariables): QueryRef<GetDoctorByIdData, GetDoctorByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetDoctorByIdVariables): QueryRef<GetDoctorByIdData, GetDoctorByIdVariables>;
  operationName: string;
}
export const getDoctorByIdRef: GetDoctorByIdRef;

export function getDoctorById(vars: GetDoctorByIdVariables): QueryPromise<GetDoctorByIdData, GetDoctorByIdVariables>;
export function getDoctorById(dc: DataConnect, vars: GetDoctorByIdVariables): QueryPromise<GetDoctorByIdData, GetDoctorByIdVariables>;

interface UpdateAppointmentStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAppointmentStatusVariables): MutationRef<UpdateAppointmentStatusData, UpdateAppointmentStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAppointmentStatusVariables): MutationRef<UpdateAppointmentStatusData, UpdateAppointmentStatusVariables>;
  operationName: string;
}
export const updateAppointmentStatusRef: UpdateAppointmentStatusRef;

export function updateAppointmentStatus(vars: UpdateAppointmentStatusVariables): MutationPromise<UpdateAppointmentStatusData, UpdateAppointmentStatusVariables>;
export function updateAppointmentStatus(dc: DataConnect, vars: UpdateAppointmentStatusVariables): MutationPromise<UpdateAppointmentStatusData, UpdateAppointmentStatusVariables>;

interface ListUpcomingAppointmentsForPatientRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUpcomingAppointmentsForPatientVariables): QueryRef<ListUpcomingAppointmentsForPatientData, ListUpcomingAppointmentsForPatientVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListUpcomingAppointmentsForPatientVariables): QueryRef<ListUpcomingAppointmentsForPatientData, ListUpcomingAppointmentsForPatientVariables>;
  operationName: string;
}
export const listUpcomingAppointmentsForPatientRef: ListUpcomingAppointmentsForPatientRef;

export function listUpcomingAppointmentsForPatient(vars: ListUpcomingAppointmentsForPatientVariables): QueryPromise<ListUpcomingAppointmentsForPatientData, ListUpcomingAppointmentsForPatientVariables>;
export function listUpcomingAppointmentsForPatient(dc: DataConnect, vars: ListUpcomingAppointmentsForPatientVariables): QueryPromise<ListUpcomingAppointmentsForPatientData, ListUpcomingAppointmentsForPatientVariables>;

