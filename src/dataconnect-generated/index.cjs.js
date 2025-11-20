const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'carehub-frontend',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createNewPatientRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewPatient', inputVars);
}
createNewPatientRef.operationName = 'CreateNewPatient';
exports.createNewPatientRef = createNewPatientRef;

exports.createNewPatient = function createNewPatient(dcOrVars, vars) {
  return executeMutation(createNewPatientRef(dcOrVars, vars));
};

const getDoctorByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDoctorById', inputVars);
}
getDoctorByIdRef.operationName = 'GetDoctorById';
exports.getDoctorByIdRef = getDoctorByIdRef;

exports.getDoctorById = function getDoctorById(dcOrVars, vars) {
  return executeQuery(getDoctorByIdRef(dcOrVars, vars));
};

const updateAppointmentStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAppointmentStatus', inputVars);
}
updateAppointmentStatusRef.operationName = 'UpdateAppointmentStatus';
exports.updateAppointmentStatusRef = updateAppointmentStatusRef;

exports.updateAppointmentStatus = function updateAppointmentStatus(dcOrVars, vars) {
  return executeMutation(updateAppointmentStatusRef(dcOrVars, vars));
};

const listUpcomingAppointmentsForPatientRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUpcomingAppointmentsForPatient', inputVars);
}
listUpcomingAppointmentsForPatientRef.operationName = 'ListUpcomingAppointmentsForPatient';
exports.listUpcomingAppointmentsForPatientRef = listUpcomingAppointmentsForPatientRef;

exports.listUpcomingAppointmentsForPatient = function listUpcomingAppointmentsForPatient(dcOrVars, vars) {
  return executeQuery(listUpcomingAppointmentsForPatientRef(dcOrVars, vars));
};
