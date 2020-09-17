import React, { Component } from "react";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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

  renderSelect = (activeTab) => {
    let content = [];
    if (activeTab) {
      if (Object.keys(this.props.data[this.props.activeTab]).length !== 0) {
        for (let item of this.sortColumnsById(
          Object.keys(this.props.data[this.props.activeTab][0])
        )) {
          content.push(<option key={item}>{item}</option>);
        }
      } else {
        return <option>-</option>;
      }
    }
    return content;
  };

  render() {
    return (
      <>
        <form onSubmit={this.onSubmit} className="form-inline mt-2">
          <select className="form-control form-control-sm">
            {this.renderSelect(this.props.activeTab)}
          </select>
          <input
            type="text"
            className="form-control form-control-sm ml-2"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon1"
            onChange={this.onChange}
          />
          <button type="submit" className="btn-sm btn-outline-dark ml-2">
            Search
          </button>
        </form>
      </>
    );
  }
}
