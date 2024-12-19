import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav
      style={{
        height: "9%",
        width:"100%",
        backgroundColor: "rgb(1, 92, 166)",
        padding: "1%", 
        textAlign: "center"
      }}
    >
      <NavLink style={{textDecoration:"none",color:"white" }} to="/"><h1>Employee Management System</h1></NavLink>
    </nav>
  );
}
