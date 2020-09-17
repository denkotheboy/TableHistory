import React, { Component } from "react";

export default class Count extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <span>Count: </span>
        <span>0</span>
      </>
    );
  }
}
