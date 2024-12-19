import EmployeeDirectory from './components/EmployeeDirectory';
import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from './components/NotFound';
import EmployeeUpdate from './components/EmployeeUpdate';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeDetail from './components/EmployeeDetail';
import NavBar from "./components/NavBar";

function App() {
  return (    
    <>
    <NavBar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/employees" />} />
        <Route path="/employees">
          <Route index element={<EmployeeDirectory />} />
          <Route path="update/:id" element={<EmployeeUpdate />} />
          <Route path="employeedetails/:id" element={<EmployeeDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
