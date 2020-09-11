import React, { Component } from "react";

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollPosition: 0
    };
    this.scrollRef = React.createRef();
  }

  sortTabsById = (tab) => {
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

  handleScroll = (e) => {
    this.setState({
      scrollPosition: e.target.scrollTop
    });
  };

  componentDidMount() {
    try {
      this.scrollRef.current.scrollTop = this.state.scrollPosition;
    } catch (error) {}
  }

  render() {
    if (this.props.data[this.props.tab].length > 0) {
      return (
        <>
          <div
            ref={this.scrollRef}
            className="col pl-0 table-container"
            onScroll={this.handleScroll}
          >
            <table className="table">
              <thead className="thead-dark" ref={this.ref}>
                <tr>
                  {this.sortTabsById(
                    Object.keys(this.props.data[this.props.tab][0])
                  ).map((field, index) => (
                    <th key={index} scope="col">
                      {field}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(this.props.data[this.props.tab]).map(
                  (line, id) => (
                    <tr key={id}>
                      {this.sortFieldById(
                        this.props.data[this.props.tab][line]
                      ).map((value, index) => (
                        <td key={index}>{value}</td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </>
      );
    } else {
      return <div className="col">Table is empty</div>;
    }
  }
}
