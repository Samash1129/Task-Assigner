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
        <Route path="/dashboard/getUsers" element={<Dashboard />} />
        <Route exact path="/" element={<Login />} />
      </Routes>
    </>
  )
}

export default App;