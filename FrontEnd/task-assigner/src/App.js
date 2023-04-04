import React, { Component } from "react";
import Login from './Login';
import NavBar from "./NavBar";
import Menu from "./Menu";
import './index.css';

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Login />
        <Menu />
      </>
    )
  }
}

export default App;