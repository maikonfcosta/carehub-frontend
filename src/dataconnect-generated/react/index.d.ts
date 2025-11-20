import { CreateNewPatientData, CreateNewPatientVariables, GetDoctorByIdData, GetDoctorByIdVariables, UpdateAppointmentStatusData, UpdateAppointmentStatusVariables, ListUpcomingAppointmentsForPatientData, ListUpcomingAppointmentsForPatientVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateNewPatient(options?: useDataConnectMutationOptions<CreateNewPatientData, FirebaseError, CreateNewPatientVariables>): UseDataConnectMutationResult<CreateNewPatientData, CreateNewPatientVariables>;
export function useCreateNewPatient(dc: DataConnect, options?: useDataConnectMutationOptions<CreateNewPatientData, FirebaseError, CreateNewPatientVariables>): UseDataConnectMutationResult<CreateNewPatientData, CreateNewPatientVariables>;

export function useGetDoctorById(vars: GetDoctorByIdVariables, options?: useDataConnectQueryOptions<GetDoctorByIdData>): UseDataConnectQueryResult<GetDoctorByIdData, GetDoctorByIdVariables>;
export function useGetDoctorById(dc: DataConnect, vars: GetDoctorByIdVariables, options?: useDataConnectQueryOptions<GetDoctorByIdData>): UseDataConnectQueryResult<GetDoctorByIdData, GetDoctorByIdVariables>;

export function useUpdateAppointmentStatus(options?: useDataConnectMutationOptions<UpdateAppointmentStatusData, FirebaseError, UpdateAppointmentStatusVariables>): UseDataConnectMutationResult<UpdateAppointmentStatusData, UpdateAppointmentStatusVariables>;
export function useUpdateAppointmentStatus(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAppointmentStatusData, FirebaseError, UpdateAppointmentStatusVariables>): UseDataConnectMutationResult<UpdateAppointmentStatusData, UpdateAppointmentStatusVariables>;

export function useListUpcomingAppointmentsForPatient(vars: ListUpcomingAppointmentsForPatientVariables, options?: useDataConnectQueryOptions<ListUpcomingAppointmentsForPatientData>): UseDataConnectQueryResult<ListUpcomingAppointmentsForPatientData, ListUpcomingAppointmentsForPatientVariables>;
export function useListUpcomingAppointmentsForPatient(dc: DataConnect, vars: ListUpcomingAppointmentsForPatientVariables, options?: useDataConnectQueryOptions<ListUpcomingAppointmentsForPatientData>): UseDataConnectQueryResult<ListUpcomingAppointmentsForPatientData, ListUpcomingAppointmentsForPatientVariables>;
