import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from './Login';
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import './index.css';
// import AddTask from "./AddTask";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/dashboard/getUsers" element={<Dashboard />} />
        <Route path="/dashboard/register" element={<Dashboard />} />
        <Route path="/dashboard/addTask" element={<Dashboard />} />
        <Route path="/dashboard/accountSettings" element={<Dashboard />} />

        <Route exact path="/" element={<Login />} />
      </Routes>
      {/* <AddTask /> */}
    </>
  )
}

export default App;