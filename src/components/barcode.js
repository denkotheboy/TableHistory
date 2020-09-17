import React, { Component } from "react";

export default class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barcode: ""
    };
  }

  onChange = (event) => {
    this.setState({ barcode: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Barcode"
            aria-label="Barcode"
            aria-describedby="basic-addon1"
            onChange={this.onChange}
          />
        </form>
      </>
    );
  }
}
