import React, { Component } from "react";

export default class Count extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <span><h3>Count: {this.props.count}</h3></span>
      </>
    );
  }
}
