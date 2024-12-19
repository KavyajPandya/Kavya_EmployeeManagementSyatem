import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

async function fetchEmployeeById(id) {
    const response = await fetch('http://localhost:3006/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query getEmployeeById($id: Int!) {
          getEmployeeById(id: $id) {
            id
            firstName
            lastName
            age
            doj
            title
            department
            employeeType
            currentStatus
          }
        }`,
        variables: { id }
      })
    });
    const json = await response.json();
    return json.data.getEmployeeById;
}
  
async function editEmployee(id, employee) {
  const response = await fetch('http://localhost:3006/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `mutation editEmployee($id: Int!, $employee: UpdateEmployee!) {
        editEmployee(id: $id, employee: $employee) {
          id
          firstName
          lastName
          age
          doj
          title
          department
          employeeType
          currentStatus
        }
      }`,
      variables: { id, employee }
    })
  });
  const json = await response.json();
  return json.data.editEmployee;
}
export default function EmployeeUpdate(props) {

    const [loading, setLoading] = useState(true);
    const [employee, setEmployee] = useState({});

    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id, typeof(id))

    useEffect(() => {
        async function fetchData() {
          const fetchedEmployee = await fetchEmployeeById(parseInt(id));
          console.log(fetchedEmployee)
          if (fetchedEmployee) {
            setEmployee(fetchedEmployee);
            setLoading(false);
          } else {
            navigate("/NotFound");
            console.log("id not found")
          }
        }
        fetchData();
    }, [id, navigate]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await editEmployee(parseInt(id), {
            title: employee.title,
            department: employee.department,
            currentStatus: employee.currentStatus
        });
        navigate("/employees");
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    return loading ? (
        <div>Loading...</div>
    ) : (
        <form id="employeeedit">
            <label htmlFor="firstName">First Name:</label>
            <input 
                type="text"
                id="firstName"
                name="firstName"
                required
                readOnly
                value={employee.firstName}
                onChange={onChange}
            />

            <label htmlFor="lastName">Last Name:</label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                required
                readOnly
                value={employee.lastName}
                onChange={onChange}
            />

            <label htmlFor="age">Age:</label>
            <input
                id="age"
                name="age"
                required
                readOnly
                fallback={employee.age}
                value={employee.age}
                onChange={onChange}
            />

            <label htmlFor="doj">Date of Joining:</label>
            <input 
                id="doj"
                name="doj"
                readOnly
                fallback={employee.doj}
                value={employee.doj}
                onChange={onChange}
            />

            <label htmlFor="title">Title:</label>
            <select id="title" name="title" value={employee.title} onChange={onChange}>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
                <option value="VP">VP</option>
            </select>        

            <label htmlFor="department">Department:</label>
            <select id="department" name="department" value={employee.department} onChange={onChange}>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
            </select>                    

            <label htmlFor="employeeType">Employee Type:</label>
            <input
                type="text"
                id="employeeType"
                name="employeeType"
                required
                readOnly
                value={employee.employeeType}
                onChange={onChange}
            />        

            <label htmlFor="currentStatus">Current Status:</label>
            <select id="currentStatus" name="currentStatus" value={employee.currentStatus} onChange={onChange}>
              <option value="0">0</option>
              <option value="1">1</option>
            </select>     

            <button type="button" onClick={handleSubmit}>Edit</button>
            <button type="button" onClick={() => { navigate("/employees");}}>Back</button>
        </form>
    );

}