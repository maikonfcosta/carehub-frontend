# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetDoctorById*](#getdoctorbyid)
  - [*ListUpcomingAppointmentsForPatient*](#listupcomingappointmentsforpatient)
- [**Mutations**](#mutations)
  - [*CreateNewPatient*](#createnewpatient)
  - [*UpdateAppointmentStatus*](#updateappointmentstatus)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetDoctorById
You can execute the `GetDoctorById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getDoctorById(vars: GetDoctorByIdVariables): QueryPromise<GetDoctorByIdData, GetDoctorByIdVariables>;

interface GetDoctorByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDoctorByIdVariables): QueryRef<GetDoctorByIdData, GetDoctorByIdVariables>;
}
export const getDoctorByIdRef: GetDoctorByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDoctorById(dc: DataConnect, vars: GetDoctorByIdVariables): QueryPromise<GetDoctorByIdData, GetDoctorByIdVariables>;

interface GetDoctorByIdRef {
  ...
  (dc: DataConnect, vars: GetDoctorByIdVariables): QueryRef<GetDoctorByIdData, GetDoctorByIdVariables>;
}
export const getDoctorByIdRef: GetDoctorByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDoctorByIdRef:
```typescript
const name = getDoctorByIdRef.operationName;
console.log(name);
```

### Variables
The `GetDoctorById` query requires an argument of type `GetDoctorByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetDoctorByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetDoctorById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDoctorByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetDoctorById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDoctorById, GetDoctorByIdVariables } from '@dataconnect/generated';

// The `GetDoctorById` query requires an argument of type `GetDoctorByIdVariables`:
const getDoctorByIdVars: GetDoctorByIdVariables = {
  id: ..., 
};

// Call the `getDoctorById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDoctorById(getDoctorByIdVars);
// Variables can be defined inline as well.
const { data } = await getDoctorById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDoctorById(dataConnect, getDoctorByIdVars);

console.log(data.doctor);

// Or, you can use the `Promise` API.
getDoctorById(getDoctorByIdVars).then((response) => {
  const data = response.data;
  console.log(data.doctor);
});
```

### Using `GetDoctorById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDoctorByIdRef, GetDoctorByIdVariables } from '@dataconnect/generated';

// The `GetDoctorById` query requires an argument of type `GetDoctorByIdVariables`:
const getDoctorByIdVars: GetDoctorByIdVariables = {
  id: ..., 
};

// Call the `getDoctorByIdRef()` function to get a reference to the query.
const ref = getDoctorByIdRef(getDoctorByIdVars);
// Variables can be defined inline as well.
const ref = getDoctorByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDoctorByIdRef(dataConnect, getDoctorByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.doctor);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.doctor);
});
```

## ListUpcomingAppointmentsForPatient
You can execute the `ListUpcomingAppointmentsForPatient` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUpcomingAppointmentsForPatient(vars: ListUpcomingAppointmentsForPatientVariables): QueryPromise<ListUpcomingAppointmentsForPatientData, ListUpcomingAppointmentsForPatientVariables>;

interface ListUpcomingAppointmentsForPatientRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUpcomingAppointmentsForPatientVariables): QueryRef<ListUpcomingAppointmentsForPatientData, ListUpcomingAppointmentsForPatientVariables>;
}
export const listUpcomingAppointmentsForPatientRef: ListUpcomingAppointmentsForPatientRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUpcomingAppointmentsForPatient(dc: DataConnect, vars: ListUpcomingAppointmentsForPatientVariables): QueryPromise<ListUpcomingAppointmentsForPatientData, ListUpcomingAppointmentsForPatientVariables>;

interface ListUpcomingAppointmentsForPatientRef {
  ...
  (dc: DataConnect, vars: ListUpcomingAppointmentsForPatientVariables): QueryRef<ListUpcomingAppointmentsForPatientData, ListUpcomingAppointmentsForPatientVariables>;
}
export const listUpcomingAppointmentsForPatientRef: ListUpcomingAppointmentsForPatientRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUpcomingAppointmentsForPatientRef:
```typescript
const name = listUpcomingAppointmentsForPatientRef.operationName;
console.log(name);
```

### Variables
The `ListUpcomingAppointmentsForPatient` query requires an argument of type `ListUpcomingAppointmentsForPatientVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListUpcomingAppointmentsForPatientVariables {
  patientId: UUIDString;
}
```
### Return Type
Recall that executing the `ListUpcomingAppointmentsForPatient` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUpcomingAppointmentsForPatientData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListUpcomingAppointmentsForPatient`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUpcomingAppointmentsForPatient, ListUpcomingAppointmentsForPatientVariables } from '@dataconnect/generated';

// The `ListUpcomingAppointmentsForPatient` query requires an argument of type `ListUpcomingAppointmentsForPatientVariables`:
const listUpcomingAppointmentsForPatientVars: ListUpcomingAppointmentsForPatientVariables = {
  patientId: ..., 
};

// Call the `listUpcomingAppointmentsForPatient()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUpcomingAppointmentsForPatient(listUpcomingAppointmentsForPatientVars);
// Variables can be defined inline as well.
const { data } = await listUpcomingAppointmentsForPatient({ patientId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUpcomingAppointmentsForPatient(dataConnect, listUpcomingAppointmentsForPatientVars);

console.log(data.appointments);

// Or, you can use the `Promise` API.
listUpcomingAppointmentsForPatient(listUpcomingAppointmentsForPatientVars).then((response) => {
  const data = response.data;
  console.log(data.appointments);
});
```

### Using `ListUpcomingAppointmentsForPatient`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUpcomingAppointmentsForPatientRef, ListUpcomingAppointmentsForPatientVariables } from '@dataconnect/generated';

// The `ListUpcomingAppointmentsForPatient` query requires an argument of type `ListUpcomingAppointmentsForPatientVariables`:
const listUpcomingAppointmentsForPatientVars: ListUpcomingAppointmentsForPatientVariables = {
  patientId: ..., 
};

// Call the `listUpcomingAppointmentsForPatientRef()` function to get a reference to the query.
const ref = listUpcomingAppointmentsForPatientRef(listUpcomingAppointmentsForPatientVars);
// Variables can be defined inline as well.
const ref = listUpcomingAppointmentsForPatientRef({ patientId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUpcomingAppointmentsForPatientRef(dataConnect, listUpcomingAppointmentsForPatientVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.appointments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.appointments);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateNewPatient
You can execute the `CreateNewPatient` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNewPatient(vars: CreateNewPatientVariables): MutationPromise<CreateNewPatientData, CreateNewPatientVariables>;

interface CreateNewPatientRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewPatientVariables): MutationRef<CreateNewPatientData, CreateNewPatientVariables>;
}
export const createNewPatientRef: CreateNewPatientRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNewPatient(dc: DataConnect, vars: CreateNewPatientVariables): MutationPromise<CreateNewPatientData, CreateNewPatientVariables>;

interface CreateNewPatientRef {
  ...
  (dc: DataConnect, vars: CreateNewPatientVariables): MutationRef<CreateNewPatientData, CreateNewPatientVariables>;
}
export const createNewPatientRef: CreateNewPatientRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNewPatientRef:
```typescript
const name = createNewPatientRef.operationName;
console.log(name);
```

### Variables
The `CreateNewPatient` mutation requires an argument of type `CreateNewPatientVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNewPatientVariables {
  firstName: string;
  lastName: string;
  contactNumber: string;
  dateOfBirth: DateString;
  email?: string | null;
}
```
### Return Type
Recall that executing the `CreateNewPatient` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNewPatientData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNewPatientData {
  patient_insert: Patient_Key;
}
```
### Using `CreateNewPatient`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNewPatient, CreateNewPatientVariables } from '@dataconnect/generated';

// The `CreateNewPatient` mutation requires an argument of type `CreateNewPatientVariables`:
const createNewPatientVars: CreateNewPatientVariables = {
  firstName: ..., 
  lastName: ..., 
  contactNumber: ..., 
  dateOfBirth: ..., 
  email: ..., // optional
};

// Call the `createNewPatient()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNewPatient(createNewPatientVars);
// Variables can be defined inline as well.
const { data } = await createNewPatient({ firstName: ..., lastName: ..., contactNumber: ..., dateOfBirth: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNewPatient(dataConnect, createNewPatientVars);

console.log(data.patient_insert);

// Or, you can use the `Promise` API.
createNewPatient(createNewPatientVars).then((response) => {
  const data = response.data;
  console.log(data.patient_insert);
});
```

### Using `CreateNewPatient`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNewPatientRef, CreateNewPatientVariables } from '@dataconnect/generated';

// The `CreateNewPatient` mutation requires an argument of type `CreateNewPatientVariables`:
const createNewPatientVars: CreateNewPatientVariables = {
  firstName: ..., 
  lastName: ..., 
  contactNumber: ..., 
  dateOfBirth: ..., 
  email: ..., // optional
};

// Call the `createNewPatientRef()` function to get a reference to the mutation.
const ref = createNewPatientRef(createNewPatientVars);
// Variables can be defined inline as well.
const ref = createNewPatientRef({ firstName: ..., lastName: ..., contactNumber: ..., dateOfBirth: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNewPatientRef(dataConnect, createNewPatientVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.patient_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.patient_insert);
});
```

## UpdateAppointmentStatus
You can execute the `UpdateAppointmentStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateAppointmentStatus(vars: UpdateAppointmentStatusVariables): MutationPromise<UpdateAppointmentStatusData, UpdateAppointmentStatusVariables>;

interface UpdateAppointmentStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAppointmentStatusVariables): MutationRef<UpdateAppointmentStatusData, UpdateAppointmentStatusVariables>;
}
export const updateAppointmentStatusRef: UpdateAppointmentStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAppointmentStatus(dc: DataConnect, vars: UpdateAppointmentStatusVariables): MutationPromise<UpdateAppointmentStatusData, UpdateAppointmentStatusVariables>;

interface UpdateAppointmentStatusRef {
  ...
  (dc: DataConnect, vars: UpdateAppointmentStatusVariables): MutationRef<UpdateAppointmentStatusData, UpdateAppointmentStatusVariables>;
}
export const updateAppointmentStatusRef: UpdateAppointmentStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAppointmentStatusRef:
```typescript
const name = updateAppointmentStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateAppointmentStatus` mutation requires an argument of type `UpdateAppointmentStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateAppointmentStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateAppointmentStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAppointmentStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAppointmentStatusData {
  appointment_update?: Appointment_Key | null;
}
```
### Using `UpdateAppointmentStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAppointmentStatus, UpdateAppointmentStatusVariables } from '@dataconnect/generated';

// The `UpdateAppointmentStatus` mutation requires an argument of type `UpdateAppointmentStatusVariables`:
const updateAppointmentStatusVars: UpdateAppointmentStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateAppointmentStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAppointmentStatus(updateAppointmentStatusVars);
// Variables can be defined inline as well.
const { data } = await updateAppointmentStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAppointmentStatus(dataConnect, updateAppointmentStatusVars);

console.log(data.appointment_update);

// Or, you can use the `Promise` API.
updateAppointmentStatus(updateAppointmentStatusVars).then((response) => {
  const data = response.data;
  console.log(data.appointment_update);
});
```

### Using `UpdateAppointmentStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAppointmentStatusRef, UpdateAppointmentStatusVariables } from '@dataconnect/generated';

// The `UpdateAppointmentStatus` mutation requires an argument of type `UpdateAppointmentStatusVariables`:
const updateAppointmentStatusVars: UpdateAppointmentStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateAppointmentStatusRef()` function to get a reference to the mutation.
const ref = updateAppointmentStatusRef(updateAppointmentStatusVars);
// Variables can be defined inline as well.
const ref = updateAppointmentStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAppointmentStatusRef(dataConnect, updateAppointmentStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appointment_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appointment_update);
});
```

