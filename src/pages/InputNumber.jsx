import React, { Component } from "react";

export default class InputNumber extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputval: "",
    };
  }
  handlerefillChanges = (e) => {
    const { modal } = this.state;
    const re = /^[0-9\b]+$/;
    const name = e.target.name;
    if (e.target.value === "" || re.test(e.target.value)) {
      modal[name] = e.target.value;
      this.setState({ modal: modal });
    }
  };
  handleChange = (e) => {
    console.log("change run", e);
    // const ss = String.fromCharCode(e);
    this.setState({
      inputval: e.target.value,
    });
  };
  handleNumericCheck = (e) => {
    if (e.charCode >= 48 && e.charCode <= 57) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  };
  validate = (e) => {
    // const re = /^[0-9\b]+$/;
    console.log("ketpress run", e);

    if (this.handleNumericCheck(e)) {
      console.log("true");
      this.handleChange(e.charCode);
    } else {
      console.log("false");
    }
  };

  render() {
    return (
      <>
        <input
          type="text"
          value={this.state.inputval}
          onChange={(e) => this.handleChange(e)}
          onKeyPress={(e) => this.handleNumericCheck(e)}
        />
      </>
    );
  }
}
