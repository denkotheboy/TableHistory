import React, { Component } from "react";
import { connect } from "react-redux";

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      to: 1,
      from: 0,
      page: 1,
      numberOfPages: 1
    };
    this.perPage = 20;
    this.scrollRef = React.createRef();
  }

  getTheNumberOfPages = () => {
    this.setState({
      numberOfPages: Math.ceil(
        Object.keys(this.props.data).length / this.perPage
      )
    });
  };

  goToPage = (isNextPage) => {
    this.getTheNumberOfPages();
    if (this.state.page < this.state.numberOfPages && isNextPage) {
      this.props.addTab(
        this.props.tab,
        this.props.store[this.props.tab].scrollPosition,
        this.state.page + 1
      );
    } else if (this.state.page > this.state.numberOfPages && !isNextPage) {
      this.props.addTab(
        this.props.tab,
        this.props.store[this.props.tab].scrollPosition,
        this.state.page - 1
      );
    } else if (this.state.page === 0) {
      this.props.addTab(
        this.props.tab,
        this.props.store[this.props.tab].scrollPosition,
        this.state.numberOfPages
      );
    } else if (this.state.page === this.state.numberOfPages) {
      this.props.addTab(
        this.props.tab,
        this.props.store[this.props.tab].scrollPosition,
        1
      );
    }
    console.log("Page: " + this.state.page);
    this.expectNewToAndFrom();
  };

  expectNewToAndFrom = () => {
    this.setState({
      to: this.state.page * this.perPage,
      from: this.state.page * this.perPage - this.perPage
    });
  };

  sortTabsById = (tab) => {
    var newTabs = [];
    if (tab)
      for (var item of tab) {
        if (item === "id") {
          newTabs.unshift(item);
        } else {
          newTabs.push(item);
        }
      }
    return newTabs;
  };

  sortFieldById = (field) => {
    var newFields = [];
    Object.values(field).forEach((item, index) => {
      if (index === Object.keys(field).indexOf("id")) {
        newFields.unshift(item);
      } else {
        newFields.push(item);
      }
    });
    return newFields;
  };

  handleScroll = (e) => {
    this.props.addTab(this.props.tab, e.target.scrollTop, this.state.page);
  };

  componentDidMount() {
    //this.props.addTab(this.props.tab, 0);

    this.expectNewToAndFrom();
    try {
      this.scrollRef.current.scrollTop = this.props.store[
        this.props.tab
      ].scrollPosition;
    } catch (error) {}
  }

  render() {
    if (this.props.data[this.props.tab].length > 0) {
      return (
        <>
          <div
            ref={this.scrollRef}
            className="col pl-0 table-container"
            onScroll={this.handleScroll}
          >
            <table className="table">
              <thead className="thead-dark header" ref={this.ref}>
                <tr className="header">
                  {this.sortTabsById(
                    Object.keys(this.props.data[this.props.tab][0])
                  ).map((field, index) => (
                    <th key={index} scope="col" className="header">
                      {field}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(this.props.data[this.props.tab]).map((line, id) =>
                  id < this.state.to && id >= this.state.from ? (
                    <tr key={id}>
                      {this.sortFieldById(
                        this.props.data[this.props.tab][line]
                      ).map((value, index) => (
                        <td key={index}>{value}</td>
                      ))}
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
        </>
      );
    } else {
      return <div className="col">Table is empty</div>;
    }
  }
}

export default connect(
  (state) => ({
    store: state
  }),
  (dispatch) => ({
    addTab: (tab, scrollPosition, page) => {
      dispatch({
        type: "addTab",
        tab: tab,
        scrollPosition: scrollPosition
      });
    }
  })
)(Table);
