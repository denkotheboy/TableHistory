import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import 'antd/dist/antd.css';
import { Pagination } from "antd";
import Table from "./table";

class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: null,
      page: 1
    };
    this.perPage = 20;
    this.needToUpdate = true;
    this.numberOfPages = 1;
    this.listOfFoundEntries = [];
  }

  goToPage = (page) => {
    if (page >= 0 && page <= this.numberOfPages) {
      this.needToUpdate = true;
      this.setState({
        page: page
      });
      console.log("Page: " + page);
    }
  };

  getTheNumberOfPages = (tab) => {
    if (this.listOfFoundEntries.length !== 0) {
      this.numberOfPages = Math.ceil(
        this.listOfFoundEntries.length / this.perPage
      );
    } else {
      this.numberOfPages = Math.ceil(
        Object.keys(this.props.data[tab]).length / this.perPage
      );
    }
  };

  search = () => {
    this.listOfFoundEntries = [];
    if (
      Object.keys(this.props.search).length !== 0 &&
      this.props.search.input !== undefined
    ) {
      for (let [i, value] of Object.values(
        this.props.data[this.props.tab]
      ).entries()) {
        if (this.props.search.select === "id") {
          if (
            String(value[this.props.search.select]) === this.props.search.input
          ) {
            this.listOfFoundEntries.push(i);
          }
        } else {
          if (
            String(value[this.props.search.select]).search(
              this.props.search.input
            ) !== -1
          ) {
            this.listOfFoundEntries.push(i);
          }
        }
      }
    }
  };

  render() {
    if (this.props.data !== null) {
      return (
        <>
          <div className="row mt-2">
            <div className="col">
              <ul className="nav nav-tabs">
                {Object.keys(this.props.data).map((tab) => (
                  <li key={tab} className="nav-item">
                    <Link
                      onClick={() => {
                        this.setState({
                          activeTab: tab,
                          page: this.props.store[tab].page
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

          {Object.keys(this.props.data).map((tab) => {
            if (
              this.state.activeTab === tab ||
              window.location.pathname === "/" + tab
            ) {
              this.getTheNumberOfPages(tab);
              return (
                <div key={tab}>
                  <div className="row table-container">
                    <Table
                      search={this.props.search}
                      key={tab}
                      data={this.props.data}
                      tab={tab}
                      page={this.state.page}
                      perPage={this.perPage}
                    />
                  </div>
                  <div className="row justify-content-center">
                    {this.props.data[tab].length > 0 ? (
                      <nav aria-label="Page navigation" id="page-switching-menu">
                        <Pagination defaultCurrent={this.state.page} total={this.props.data[tab].length} pageSize={this.perPage} onChange={this.goToPage} showSizeChanger={false}/>
                      </nav>
                    ) : null}
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </>
      );
    } else {
      return (
        <div className="row mt-5">
          <div className="col">Данные отсутствуют.</div>
        </div>
      );
    }
  }
}

export default connect(
  (state) => ({
    store: state
  }),
  (dispatch) => ({
    changeActiveTab: (activeTab) => {
      dispatch({
        type: "changeActiveTab",
        activeTab: activeTab
      });
    }
  })
)(Tabs);
