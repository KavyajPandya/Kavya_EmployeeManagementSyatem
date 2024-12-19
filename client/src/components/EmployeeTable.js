import React from 'react';
import { useState, useEffect } from 'react'
import '../componentCss/EmployeeTable.css'
import { Link } from "react-router-dom";

export default function EmployeeTable({employees,deleteEmployee} ) {
return (
    <div className='EmployeeTable'>
      <h1>Employee Details</h1>
      <div className="employee-table">
        <table >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Date Of Joining</th>
                    <th>Title</th>
                    <th>Department</th>
                    <th>Employee Type</th>
                    <th>CurrentStatus</th>
                    <th colSpan="3">Actions</th>                    
                </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.id} </td>
                  <td>{employee.firstName} </td>
                  <td>{employee.lastName}</td>
                  <td>{employee.age}</td>
                  <td>{employee.doj}</td>
                  <td>{employee.title}</td>
                  <td>{employee.department}</td>
                  <td>{employee.employeeType}</td>
                  <td>{employee.currentStatus}</td>
                  <td>
                    <button><Link to={`update/${employee.id}`}>Edit</Link></button>
                  </td>
                  <td>
                    <button><Link to={`employeedetails/${employee.id}`}>View</Link></button>
                  </td>
                  <td>
                    <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}