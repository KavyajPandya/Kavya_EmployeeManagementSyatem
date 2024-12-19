import React from 'react';
import { useState, useEffect } from 'react'
import EmployeeSearch from './EmployeeSearch';
import '../componentCss/EmployeeDirectory.css'
import EmployeeTable from './EmployeeTable';
import EmployeeCreate from './EmployeeCreate';
import { openDialog, closeDialog, Dialog } from "./Dialog";
import { useSearchParams } from "react-router-dom";

async function fetchEmployees(employeeType) {
  employeeType = employeeType || null
  const getEmployeedata = await fetch('http://localhost:3006/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query {
                getEmployee(employeeType:${employeeType}){id,firstName, lastName, age, doj,title, department, employeeType, currentStatus}
              }` 
    }),
  })
  const json = await getEmployeedata.json()
  return json.data.getEmployee
}

async function postEmployee(employee) {  
  console.log("before adding data")
  const postEmployeeData = await fetch('http://localhost:3006/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `mutation addEmployee($input:InputEmployee!) {
            addEmployee(employee: $input) {id,firstName, lastName, age, doj,title, department, employeeType, currentStatus}
         }`,
      variables: { input: employee }
    })    
  })
  console.log("after adding data")

  const json = await postEmployeeData.json()
  console.log("json: " , {json})
  return json.data.addEmployee
}  
async function deleteOneEmployee(id) {
  const deleteEmployeeData = await fetch('http://localhost:3006/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `mutation deleteEmployee($id: Int!) {
        deleteEmployee(id: $id) {
          id
          firstName
        }
      }`,
      variables: { id }
    })
  });
  const json = await deleteEmployeeData.json();
  return json.data.deleteEmployee;
}

export default function EmployeeDirectory() {    

  const [employees, setEmployees]=useState([ ]);
  const [searchParams, _] = useSearchParams();
  const employeeType = searchParams.get("EmployeeType");

  const addNewEmployee = async (employee) => {  
    employee = await postEmployee(employee)
    console.log("Adding employee to mongodb", employee)
    setEmployees([...employees, employee])
    console.log("employee table updated", employee)
    closeDialog("employee_create");
  }
  const deleteEmployee = async (id) => {
    await deleteOneEmployee(id);
    setEmployees(employees.filter(employee => employee.id !== id));
  }; 

  useEffect( () => {
    const fetchAndUpdate = async () => {
      const data = await fetchEmployees(employeeType)
      console.log("Fetching employee", data)
      setEmployees(data)
      console.log("Table Updated: New Employee added", data)
    }  
    fetchAndUpdate()
  }, [employeeType])

  return (
    <div className='EmployeeDirectory'>  
      <EmployeeSearch></EmployeeSearch>
      <EmployeeTable employees={employees} deleteEmployee={deleteEmployee} />
      <Dialog id="employee_create">
        <EmployeeCreate addNewEmployee={addNewEmployee} />
      </Dialog>
      <button onClick={() => { openDialog("employee_create");}}>Add Employee</button>
    </div>
  );
}