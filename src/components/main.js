import React, { Component } from "react";
import Tabs from "./tabs";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: null
    };
  }

  componentDidMount() {
    if (!this.state.isLoaded) {
      fetch("https://run.mocky.io/v3/9be86d12-964c-4dec-8e05-cdc1b9fd332b")
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              data: result.data
            });
            //this.sort(result.data);
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
    }
  }

  render() {
    if (this.state.data !== null) {
      return (
        <>
          <main>
            <Tabs data={this.state.data} />
          </main>
        </>
      );
    } else {
      return <>loading...</>;
    }
  }
}
