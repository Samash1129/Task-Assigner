import React, { Component } from "react";
import Login from './Login';
import './index.css';
import NavBar from "./NavBar";

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Login />
      </>
    )
  }
}

export default App;
