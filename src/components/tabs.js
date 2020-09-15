import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./table";

export default class Tabs extends Component {
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
            {Object.keys(this.props.data).map((tab) => {
              if (
                this.state.activeTab === tab ||
                window.location.pathname === "/" + tab
              ) {
                return <Table key={tab} data={this.props.data} tab={tab} />;
              } else {
                return null;
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
