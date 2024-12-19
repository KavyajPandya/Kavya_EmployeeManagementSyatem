import React from 'react';
import { useState, useEffect } from 'react'
import '../componentCss/EmployeeCreate.css'

export default function EmployeeCreate(props) {    
  const handleSubmit = async (e) => {
    const form = e.target;
    const userInput = {      
        id: -1,
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        age: form.age.value,
        doj: form.dateOfJoining.value,
        title: form.title.value,
        department: form.department.value,
        employeeType: form.employeeType.value,
        currentStatus: form.currentStatus.value,
    };
    console.log("User Input ", userInput);
    e.preventDefault();
    await props.addNewEmployee(userInput);
  }  
    var todayDate = new Date(),
    today = todayDate.toISOString().substring(0,10);
    return (
        <div className='EmployeeCreate'>
            <h1>Add Employee</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" required pattern="^[A-Za-z]+$" title="First name should only contain alphabets." name="firstName" placeholder="First Name" />
                </div>
                <div className="form-item">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" required pattern="^[A-Za-z]+$" title="Last name should only contain alphabets." name="lastName" placeholder="Last Name" />
                </div>
                <div className="form-item">
                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" min="20" max="70" required name="age" placeholder="Age" />
                </div>
                <div className="form-item">
                    <label htmlFor="dateOfJoining">Date of Joining:</label>
                    <input type="date" id="dateOfJoining" required min="1974-01-01" max={today} title="Last name should only contain alphabets."name="dateOfJoining" placeholder="Date of Joining" />
                </div>
                <div className="form-item">
                    <label htmlFor="title">Title:</label>
                    <select id="title" name="title">
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="Director">Director</option>
                    <option value="VP">VP</option>
                    </select>
                </div>
                <div className="form-item">
                    <label htmlFor="department">Department:</label>
                    <select id="department" name="department">
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                    </select>
                </div>
                <div className="form-item">
                    <label htmlFor="employeeType">Employee Type:</label>
                    <select id="employeeType" name="employeeType">
                    <option value="FullTime">FullTime</option>
                    <option value="PartTime">PartTime</option>
                    <option value="Contract">Contract</option>
                    <option value="Seasonal">Seasonal</option>
                    </select>
                </div>
                <div className="form-item">
                    <input type="hidden" id="currentStatus" name="currentStatus" value="1" readOnly />
                </div>
                <div  className="add-btn" >
                <button type="submit">Add Employee</button>
                </div>
            </form>
        </div>
    );
}
