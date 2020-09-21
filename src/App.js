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
      isLoaded: false,
      data: null,
      activeTab: null,
      search: {}
    };
    this.isLoading = false;
    this.barcode = null;

    this.store = store.subscribe(this.storeChange);
  }

  initialStore = () => {
    if (!this.isLoading && this.state.data !== null) {
      for (let item of Object.keys(this.state.data)) {
        store.dispatch({
          type: "addTab",
          tab: item,
          scrollPosition: 0,
          page: 1
        });
      }
      this.isLoading = true;
    }
  };

  storeChange = () => {
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
    if (this.barcode === null || this.barcode !== store.getState().barcode) {
      this.barcode = store.getState().barcode;

      this.loadHistory();
    }
  };

  loadHistory() {
    if (!this.state.isLoaded) {
      fetch("https://run.mocky.io/v3/449bce4b-eb34-4d89-bfd6-9dd0a1e60459")
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

  componentDidMount() {}

  render() {
    this.initialStore();
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
                    <Count />
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    <Search
                      data={this.state.data}
                      activeTab={this.state.activeTab}
                    />
                  </div>
                </div>
              </header>
              <main>
                <Tabs data={this.state.data} search={this.state.search} />
              </main>
            </div>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}
