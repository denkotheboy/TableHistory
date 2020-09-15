import React, { Component } from "react";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header";
import Main from "./components/main";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reduser from "./redusers";

const initialState = {};
const store = createStore(reduser, initialState);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            <div className="container">
              <Header />
              <Main />
            </div>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}
