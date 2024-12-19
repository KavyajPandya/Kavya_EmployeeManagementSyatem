import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../componentCss/EmployeeSearch.css'

export default function EmployeeSearch() {
  const navigate = useNavigate()
  
  return (
    <div className='EmployeeSearch'>
      <select name="EmployeeType" onChange={(e) => {
        navigate(`/employees?EmployeeType=${e.target.value}`)
      }}>
        <option value="FullTime">FullTime</option>
        <option value="PartTime">PartTime</option>
        <option value="Contract">Contract</option>
        <option value="Seasonal">Seasonal</option>
      </select>
      <Link className='reset' to="/employees">Reset Filter</Link>
    </div >
  );
}
