import React, { Component } from "react";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header";
import Main from "./components/main";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <Header />
            <Main />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
