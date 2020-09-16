import React, { Component } from "react";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header";
import Tabs from "./components/tabs";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reduser from "./redusers";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      data: null
    };

    this.store = null;
  }

  initialStore = () => {
    console.log(this.state.data);
    this.store = createStore(reduser, {});
  };

  componentDidMount() {
    if (!this.state.isLoaded) {
      console.log(1);
      fetch("https://run.mocky.io/v3/9be86d12-964c-4dec-8e05-cdc1b9fd332b")
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              data: result.data
            });
            //this.sort(result.data);
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
    }
  }

  render() {
    if (this.state.data !== null) {
      this.initialStore();
      return (
        <BrowserRouter>
          <Provider store={this.store}>
            <div className="App">
              <div className="container-fluid">
                <Header />
                <Tabs data={this.state.data} />
              </div>
            </div>
          </Provider>
        </BrowserRouter>
      );
    } else {
      return <>loading...</>;
    }
  }
}
