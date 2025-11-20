import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'carehub-frontend',
  location: 'us-east4'
};

export const createNewPatientRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewPatient', inputVars);
}
createNewPatientRef.operationName = 'CreateNewPatient';

export function createNewPatient(dcOrVars, vars) {
  return executeMutation(createNewPatientRef(dcOrVars, vars));
}

export const getDoctorByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDoctorById', inputVars);
}
getDoctorByIdRef.operationName = 'GetDoctorById';

export function getDoctorById(dcOrVars, vars) {
  return executeQuery(getDoctorByIdRef(dcOrVars, vars));
}

export const updateAppointmentStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAppointmentStatus', inputVars);
}
updateAppointmentStatusRef.operationName = 'UpdateAppointmentStatus';

export function updateAppointmentStatus(dcOrVars, vars) {
  return executeMutation(updateAppointmentStatusRef(dcOrVars, vars));
}

export const listUpcomingAppointmentsForPatientRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUpcomingAppointmentsForPatient', inputVars);
}
listUpcomingAppointmentsForPatientRef.operationName = 'ListUpcomingAppointmentsForPatient';

export function listUpcomingAppointmentsForPatient(dcOrVars, vars) {
  return executeQuery(listUpcomingAppointmentsForPatientRef(dcOrVars, vars));
}

