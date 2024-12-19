import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../componentCss/EmployeeDetail.css'

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

export default function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const fetchedEmployee = await fetchEmployeeById(parseInt(id));
      if (fetchedEmployee) {
        setEmployee(fetchedEmployee);
        setLoading(false);
      } else {
        navigate("/NotFound");
      }
    }
    fetchData();
  }, [id, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='emp-detail'>
      <h2>Employee Details</h2>
      <p><strong>ID:</strong> {employee.id}</p>
      <p><strong>First Name:</strong> {employee.firstName}</p>
      <p><strong>Last Name:</strong> {employee.lastName}</p>
      <p><strong>Age:</strong> {employee.age}</p>
      <p><strong>Date of Joining:</strong> {employee.doj}</p>
      <p><strong>Title:</strong> {employee.title}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <p><strong>Employee Type:</strong> {employee.employeeType}</p>
      <p><strong>Current Status:</strong> {employee.currentStatus}</p>
      <button onClick={() => navigate("/employees")}>Back to Employee List</button>
    </div>
  );
}
