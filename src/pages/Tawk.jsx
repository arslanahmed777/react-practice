import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./tawk.styles.css";
import chat from "../assets/svgs/chat.svg";
import cross from "../assets/svgs/cross.svg";
export class FF extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  render() {
    const { open } = this.state;
    return (
      <>
        <div className="twk">
          <div
            className="message-container"
            style={
              open
                ? { maxHeight: "400px", display: "block" }
                : { maxHeight: "0px", display: "none" }
            }
          >
            <div>
              <div className="header">
                <h1>We are not Here, drop us an email</h1>
              </div>
              <div className="tawk_body">
                <form>
                  <input
                    className="tawk_field"
                    type="email"
                    placeholder="Email"
                  />
                  <textarea
                    className="tawk_field"
                    placeholder="Message"
                  ></textarea>
                  <button className="tawk_submit_btn" type="submit">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div
            className="tawk_btn"
            onClick={() => {
              this.setState({ open: !open });
            }}
          >
            <img src={!open ? chat : cross} />
          </div>
        </div>
      </>
    );
  }
}
export default class Tawk extends Component {
  render() {
    return ReactDOM.createPortal(<FF />, document.getElementById("tawkto"));
  }
}
