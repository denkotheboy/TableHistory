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
      this.loadHistory(this.barcode);
      this.loadHistoryInterval = setInterval(() => {
        this.loadHistory(this.barcode);
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
    fetch("./packershistory/api/v1/info")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ count: result.count });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  loadHistory(barcode) {
    fetch("./packershistory/api/v1/history?invoice_code="+barcode)
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
  componentDidMount() {
    this.store = store.subscribe(this.storeChange);
    this.loadCount();
    this.loadCountInterval = setInterval(() => {
      this.loadCount();
    }, 60000);
  }

  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            <div className="container-fluid">
              <header>
                <div className="row mt-2 justify-content-between">
                  <div className="col-lg-4 col-sm-5 col-xl-2">
                    <Barcode />
                  </div>
                  <div className="col-2">
                    {this.state.count !== 0 ? (
                      <Count count={this.state.count} />
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-7 col-sm-8">
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
