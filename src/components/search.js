import React, { Component } from "react";
import { connect } from "react-redux";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { select: "id", input: "" };
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.input === "") {
      this.props.search(null);
    } else {
      this.props.search({ select: this.state.select, input: this.state.input });
    }
  };

  onChangeInput = (event) => {
    this.setState({
      input: event.target.value,
      msgError: false
    });
  };

  onChangeSelect = (event) => {
    this.setState({
      select: event.target.value
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

  renderSelect = (activeTab) => {
    let content = [];
    if (activeTab) {
      if (Object.keys(this.props.data[this.props.activeTab]).length !== 0) {
        for (let item of this.sortColumnsById(
          Object.keys(this.props.data[this.props.activeTab][0])
        )) {
          content.push(
            <option value={item} key={item}>
              {item}
            </option>
          );
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
          <select
            className="form-control form-control-sm"
            onChange={this.onChangeSelect}
            value={this.state.select}
          >
            {this.renderSelect(this.props.activeTab)}
          </select>
          <input
            type="text"
            className="form-control form-control-sm ml-2"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon1"
            onChange={this.onChangeInput}
          />
          <button type="submit" className="btn-sm btn-outline-dark ml-2">
            Search
          </button>
        </form>
      </>
    );
  }
}
export default connect(
  (state) => ({
    store: state
  }),
  (dispatch) => ({
    search: (search) => {
      dispatch({
        type: "search",
        search: search
      });
    }
  })
)(Search);
