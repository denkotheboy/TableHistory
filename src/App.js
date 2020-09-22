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

const initialState = { activeTab: null, barcode: null, search: {} };
const store = createStore(reduser, initialState);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoading: false,
      activeTab: null,
      count: 0,
      search: {}
    };
    this.barcode = null;
    this.data = null;

    this.loadHistoryInterval = null;
    this.loadCountInterval = null;

    this.store = store.subscribe(this.storeChange);
  }

  initialStore = () => {
    if (!this.state.isLoading && this.data !== null) {
      for (let item of Object.keys(this.data)) {
        store.dispatch({
          type: "addTab",
          tab: item,
          scrollPosition: 0,
          page: 1
        });
      }
    }
  };

  storeChange = () => {
    if (this.barcode === null || this.barcode !== store.getState().barcode) {
      this.barcode = store.getState().barcode;
      this.loadHistory();
      this.loadHistoryInterval = setInterval(() => {
        this.loadHistory();
      }, 15000);
      this.loadCount();
      this.loadCountInterval = setInterval(() => {
        this.loadCount();
      }, 15000);
    }
    this.setState({
      activeTab: store.getState().activeTab
    });
    if (store.getState().search !== {}) {
      this.setState({
        search: {
          select: store.getState().search.select,
          input: store.getState().search.input
        }
      });
    }
  };

  loadCount() {
    fetch("https://run.mocky.io/v3/dbc19a1a-179c-45ad-9015-c7f11ceb0f5d")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ count: result.count });
        },
        (error) => {
          this.countIsLoaded = true;
          console.log(error);
        }
      );
  }

  loadHistory() {
    fetch("https://run.mocky.io/v3/449bce4b-eb34-4d89-bfd6-9dd0a1e60459")
      .then((res) => res.json())
      .then(
        (result) => {
          this.data = result.data;

          this.initialStore();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  componentWillUnmount() {
    clearInterval(this.loadCountInterval);
    clearInterval(this.loadHistoryInterval);
  }

  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            <div className="container-fluid">
              <header>
                <div className="row mt-2 justify-content-between">
                  <div className="col-2">
                    <Barcode />
                  </div>
                  <div className="col-2">
                    {this.data !== null ? (
                      <Count count={this.state.count} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    {this.data !== null ? (
                      <Search
                        data={this.data}
                        activeTab={this.state.activeTab}
                      />
                    ) : null}
                  </div>
                </div>
              </header>
              <main>
                {this.data !== null ? (
                  <Tabs data={this.data} search={this.state.search} />
                ) : null}
              </main>
            </div>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}
