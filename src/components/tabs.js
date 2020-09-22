import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
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

  nextPage = (tab) => {
    this.getTheNumberOfPages(tab);
    if (this.state.page < this.numberOfPages) {
      this.setState({
        page: this.state.page + 1
      });
      this.needToUpdate = true;
      console.log("Page: " + this.state.page);
    }
  };

  previousPage = (tab) => {
    this.getTheNumberOfPages(tab);
    if (this.state.page > 0) {
      this.setState({
        page: this.state.page - 1
      });
      this.needToUpdate = true;
      console.log("Page: " + this.state.page);
    }
  };

  goToPage = (number, tab) => {
    this.getTheNumberOfPages(tab);
    if (number >= 0 && number <= this.numberOfPages) {
      this.needToUpdate = true;
      this.setState({
        page: number
      });
      console.log("Page: " + number);
    }
  };

  drawingNumbering = (tab) => {
    this.getTheNumberOfPages(tab);
    let content = [];
    //let skip = 10;
    for (let i = 1; i <= this.numberOfPages; i++) {
      content.push(
        <li
          className={this.state.page === i ? "page-item active" : "page-item"}
          key={i}
        >
          <span onClick={() => this.goToPage(i, tab)} className="page-link ">
            {i}
          </span>
        </li>
      );
    }
    return content;
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
                      <nav
                        aria-label="Page navigation"
                        id="page-switching-menu"
                        className="mt-1"
                      >
                        <ul className="pagination pagination-sm justify-content-center">
                          <li
                            className={
                              this.state.page === 1
                                ? "page-item disabled"
                                : "page-item"
                            }
                          >
                            <span
                              className="page-link"
                              onClick={() => this.goToPage(1, tab)}
                            >
                              Первая
                            </span>
                          </li>
                          <li
                            className={
                              this.state.page === 1
                                ? "page-item disabled"
                                : "page-item"
                            }
                          >
                            <span
                              className="page-link"
                              onClick={() => this.previousPage(tab)}
                            >
                              Предыдущая
                            </span>
                          </li>
                          {this.drawingNumbering(tab)}
                          <li
                            className={
                              this.state.page === this.numberOfPages
                                ? "page-item disabled"
                                : "page-item"
                            }
                          >
                            <span
                              className="page-link"
                              onClick={() => this.nextPage(tab)}
                            >
                              Следующая
                            </span>
                          </li>
                          <li
                            className={
                              this.state.page === this.numberOfPages
                                ? "page-item disabled"
                                : "page-item"
                            }
                          >
                            <span
                              className="page-link"
                              onClick={() =>
                                this.goToPage(this.numberOfPages, tab)
                              }
                            >
                              Последняя ({this.numberOfPages})
                            </span>
                          </li>
                        </ul>
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
