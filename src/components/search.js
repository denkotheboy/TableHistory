import React, { Component } from "react";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <form onSubmit={this.onSubmit} className="form-inline mt-2">
          <select className="form-control form-control-sm">
            <option>Small select</option>
            {/* {Object.keys(this.props.data).map((item, index) => 
              <option>Small select</option>
            )} */}
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
