import React, { Component } from "react";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import Barcode from "./components/barcode";
import Tabs from "./components/tabs";
import Count from "./components/count";
import Search from "./components/search";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reduser from "./redusers";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      data: null,
      activeTab: null
    };

    this.store = null;
  }

  initialStore = () => {
    let addTabs = { activeTab: this.state.activeTab };
    for (let item of Object.keys(this.state.data)) {
      addTabs[item] = { tab: item, scrollPosition: 0, page: 1 };
    }
    this.store = createStore(reduser, addTabs);
    this.subscibeStore = this.store.subscribe(this.changeActiveTab);
  };

  changeActiveTab = () => {
    console.log(this.store.getState().activeTab);
    this.setState({
      activeTab: this.store.getState().activeTab
    });
  };

  componentDidMount() {
    if (!this.state.isLoaded) {
      fetch("https://run.mocky.io/v3/9be86d12-964c-4dec-8e05-cdc1b9fd332b")
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              data: result.data
            });
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
                <header>
                  <div className="row mt-2 justify-content-between">
                    <div className="col-2">
                      <Barcode />
                    </div>
                    <div className="col-2">
                      <Count />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <Search
                        data={this.state.data}
                        activeTab={this.state.activeTab}
                      />
                    </div>
                  </div>
                </header>
                <main>
                  <Tabs data={this.state.data} />
                </main>
              </div>
            </div>
          </Provider>
        </BrowserRouter>
      );
    } else {
      return (
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col">loading...</div>
          </div>
        </div>
      );
    }
  }
}
