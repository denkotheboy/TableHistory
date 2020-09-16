import React, { Component } from "react";
import { connect } from "react-redux";
import { animateScroll as scroll } from "react-scroll";

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      to: 1,
      from: 0,
      style: null
    };
    this.perPage = 20;
    this.page = 1;
    this.needToUpdate = true;
    this.numberOfPages = 1;
    this.scrollRef = React.createRef();
  }

  getTheNumberOfPages = () => {
    this.numberOfPages = Math.ceil(
      Object.keys(this.props.data[this.props.tab]).length / this.perPage
    );
  };

  nextPage = () => {
    this.getTheNumberOfPages();
    if (this.page < this.numberOfPages) {
      this.page = this.page + 1;
      this.needToUpdate = true;
      console.log("Page: " + this.page);
    }
    this.expectNewToAndFrom();
  };

  previousPage = () => {
    this.getTheNumberOfPages();
    if (this.page > 1) {
      this.page = this.page - 1;
      this.needToUpdate = true;
      console.log("Page: " + this.page);
      this.expectNewToAndFrom();
    }
  };

  goToPage = (number) => {
    this.getTheNumberOfPages();
    if (number >= 0 && number <= this.numberOfPages) {
      this.page = number;
      this.needToUpdate = true;
      console.log("Page: " + number);
      this.expectNewToAndFrom();
    }
  };

  expectNewToAndFrom = () => {
    this.setState({
      to: this.page * this.perPage,
      from: this.page * this.perPage - this.perPage
    });
  };

  sortColumnsById = (tab) => {
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

  creatingAndDrawingNumbering = () => {
    this.getTheNumberOfPages();
    let content = [];
    let skip = 10;
    for (let i = 1; i <= this.numberOfPages; i++) {
      content.push(
        <li
          className={this.page === i ? "page-item active" : "page-item"}
          key={i}
        >
          <span onClick={() => this.goToPage(i)} className="page-link ">
            {i}
          </span>
        </li>
      );
    }
    return content;
  };

  componentDidMount() {
    scroll.scrollMore(this.props.store[this.props.tab].scrollPosition, {
      duration: 0,
      smooth: "linear",
      containerId: "scroll-container"
    });
    this.page = this.props.store[this.props.tab].page;
    this.expectNewToAndFrom();
    if (this.props.data[this.props.tab].length > 0) {
      this.setState({
        style: {
          height:
            window.innerHeight -
            this.scrollRef.current.getBoundingClientRect().y
        }
      });
    }
  }

  shouldComponentUpdate() {
    if (this.needToUpdate) {
      this.expectNewToAndFrom();
      this.needToUpdate = false;
    }
    return true;
  }

  componentWillUnmount() {
    try {
      this.props.addTab(
        this.props.tab,
        this.scrollRef.current.scrollTop,
        this.page
      );
    } catch (e) {}
  }

  render() {
    if (this.props.data[this.props.tab].length > 0) {
      return (
        <>
          <div
            id="scroll-container"
            ref={this.scrollRef}
            className="col pl-0 table-container"
            style={this.state.style}
          >
            <table className="table ml-2">
              <thead className="thead-dark header" ref={this.ref}>
                <tr className="header">
                  {this.sortColumnsById(
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
            <nav aria-label="Page navigation example">
              <ul className="pagination pagination-sm justify-content-center">
                <li
                  className={
                    this.page === 1 ? "page-item disabled" : "page-item"
                  }
                >
                  <span className="page-link" onClick={() => this.goToPage(1)}>
                    Первая
                  </span>
                </li>
                <li
                  className={
                    this.page === 1 ? "page-item disabled" : "page-item"
                  }
                >
                  <span className="page-link" onClick={this.previousPage}>
                    Предыдущая
                  </span>
                </li>
                {this.creatingAndDrawingNumbering()}
                <li
                  className={
                    this.page === this.numberOfPages
                      ? "page-item disabled"
                      : "page-item"
                  }
                >
                  <span className="page-link" onClick={this.nextPage}>
                    Следующая
                  </span>
                </li>
                <li
                  className={
                    this.page === this.numberOfPages
                      ? "page-item disabled"
                      : "page-item"
                  }
                >
                  <span
                    className="page-link"
                    onClick={() => this.goToPage(this.numberOfPages)}
                  >
                    Последняя
                  </span>
                </li>
              </ul>
            </nav>
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
        scrollPosition: scrollPosition,
        page: page
      });
    }
  })
)(Table);
