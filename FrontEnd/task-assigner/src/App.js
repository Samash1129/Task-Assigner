import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from './Login';
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import './index.css';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Login />} />

        <Route path="/dashboard/getUsers" element={<Dashboard />} />
        <Route path="/dashboard/register" element={<Dashboard />} />
        <Route path="/dashboard/tasks/addTask" element={<Dashboard />} />
        <Route path="/dashboard/tasks" element={<Dashboard />} />
        <Route path="/dashboard/tasks/getAssignedTasks" element={<Dashboard />} />

        <Route path="/dashboard/tasks/getMyTasks" element={<Dashboard />} />

        <Route path="/dashboard/accountSettings" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App;