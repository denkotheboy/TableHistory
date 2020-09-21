import React, { Component } from "react";
import { connect } from "react-redux";

class Barcode extends Component {
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
    this.props.sendBarcode(this.state.barcode);
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
export default connect(
  (state) => ({
    store: state
  }),
  (dispatch) => ({
    sendBarcode: (barcode) => {
      dispatch({
        type: "barcode",
        barcode: barcode
      });
    }
  })
)(Barcode);
