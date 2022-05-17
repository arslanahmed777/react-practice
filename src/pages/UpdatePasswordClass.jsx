import React, { Component } from "react";

export default class UpdatePasswordClass extends Component {
  constructor(props) {
    super(props);

    this.resetPassword = {
      password: "",
      conformPassword: "",
    };
    this.state = {
      resetPassword: this.resetPassword,
      validationerror: {},
    };
  }

  handlechangePassword = (e) => {
    const { name, value } = e.target;
    this.setState({
      resetPassword: {
        ...this.state.resetPassword,
        [name]: value,
      },
    });
  };

  validateMethod = () => {
    const error = {};
    const { resetPassword } = this.state;
    if (resetPassword.password === "") {
      error.password = "Password is missing";
    }

    if (resetPassword.conformPassword === "") {
      error.conformPassword = "conform Password is missing";
    }

    return Object.keys(error).length === 0 ? null : error;
  };
  resetpassword = () => {
    let error = {};
    error = this.validateMethod();
    this.setState({
      validationerror: error || {},
    });
    console.log("error", error);
    console.log("error", this.state.resetPassword);
    if (error) return;
    console.log("noerror");
  };
  render() {
    const { resetPassword, validationerror } = this.state;
    return (
      <div>
        <form>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              value={resetPassword.password}
              onChange={this.handlechangePassword}
            />
            <span className="text-danger">{validationerror.password}</span>
          </div>

          <div>
            <label htmlFor="conformPassword">Conform Password</label>
            <input
              type="password"
              name="conformPassword"
              id="conformPassword"
              className="form-control"
              value={resetPassword.conformPassword}
              onChange={this.handlechangePassword}
            />
            <span className="text-danger">
              {validationerror.conformPassword}
            </span>
          </div>
          <div>
            <button
              type="button"
              className="btn round-btn-01 btn-success"
              onClick={this.resetpassword}
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    );
  }
}
