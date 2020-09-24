import React, { Component } from "react";
import { connect } from "react-redux";
import { animateScroll as scroll } from "react-scroll";

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: null
    };
    this.to = 1;
    this.form = 0;
    this.scrollRef = React.createRef();
    this.listOfFoundEntries = [];
  }

  expectNewToAndFrom = () => {
    this.to = this.props.page * this.props.perPage;
    this.from = this.props.page * this.props.perPage - this.props.perPage;
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

  componentDidMount() {
    this.props.changeActiveTab(this.props.tab);
    scroll.scrollMore(this.props.store[this.props.tab].scrollPosition, {
      duration: 0,
      smooth: "linear",
      containerId: "scroll-container"
    });
    if (this.props.data[this.props.tab].length > 0) {
      this.setState({
        style: {
          height:
            window.innerHeight - this.scrollRef.current.getBoundingClientRect().y - 4 - document.getElementById("page-switching-menu").clientHeight
        }
      });
    }
  }

  componentWillUnmount() {
    try {
      this.props.addTab(
        this.props.tab,
        this.scrollRef.current.scrollTop,
        this.props.page
      );
    } catch (e) {}
  }

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

  drawingColumns = () => {
    let content = [];
    this.sortColumnsById(
      Object.keys(this.props.data[this.props.tab][0])
    ).forEach((field, index) => {
      content.push(
        <th key={index} scope="col" className="header">
          {field}
        </th>
      );
    });
    return content;
  };

  drawingFields = () => {
    let content = [];
    this.search();
    Object.keys(this.props.data[this.props.tab]).forEach((line, id) => {
      if (this.listOfFoundEntries.length === 0) {
        if (id < this.to && id >= this.from) {
          content.push(
            <tr key={id}>
              {this.sortFieldById(this.props.data[this.props.tab][line]).map(
                (value, index) => (
                  <td key={index}>{value}</td>
                )
              )}
            </tr>
          );
        } else {
          content.push(null);
        }
      } else {
        this.listOfFoundEntries.forEach((item) => {
          if (Number(id) === Number(item)) {
            content.push(
              <tr key={id}>
                {this.sortFieldById(this.props.data[this.props.tab][line]).map(
                  (value, index) => (
                    <td key={index}>{value}</td>
                  )
                )}
              </tr>
            );
          } else {
            content.push(null);
          }
        });
      }
    });

    return content;
  };

  render() {
    this.expectNewToAndFrom();
    if (this.props.data[this.props.tab].length > 0) {
      return (
        <>
          <div
            id="scroll-container"
            ref={this.scrollRef}
            className="col pl-0 table-container"
            style={this.state.style}
          >
            <table className="table ml-2 table-bordered">
              <thead className="thead-dark header" ref={this.ref}>
                <tr className="header">{this.drawingColumns()}</tr>
              </thead>
              <tbody>{this.drawingFields()}</tbody>
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
        scrollPosition: scrollPosition,
        page: page
      });
    },
    changeActiveTab: (activeTab) => {
      dispatch({
        type: "changeActiveTab",
        activeTab: activeTab
      });
    }
  })
)(Table);
