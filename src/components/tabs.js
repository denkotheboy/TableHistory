import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./table";

export default class MainMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: null
    };
  }

  render() {
    if (this.props.data !== null) {
      return (
        <>
          <div className="row mt-5">
            <div className="col">
              <ul className="nav nav-tabs">
                {Object.keys(this.props.data).map((tab) => (
                  <li key={tab} className="nav-item">
                    <Link
                      onClick={() => {
                        this.setState({
                          activeTab: tab
                        });
                      }}
                      className={
                        this.state.activeTab === tab ||
                        window.location.pathname === "/" + tab
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to={tab}
                    >
                      {tab}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="row table-container">
            {Object.keys(this.props.data).map((tabs) => {
              if (
                this.state.activeTab === tabs ||
                window.location.pathname === "/" + tabs
              ) {
                return <Table key={tabs} data={this.props.data} tab={tabs} />;
              } else {
                return <div key={tabs}></div>;
              }
            })}
          </div>
        </>
      );
    } else {
      return (
        <div className="row mt-5">
          <div className="col">loading...</div>
        </div>
      );
    }
  }
}
