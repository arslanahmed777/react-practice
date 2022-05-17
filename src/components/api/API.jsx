import React, { Component } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

export default class API extends Component {
  componentDidMount() {}
  getZip = () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      responseType: "blob",
    };

    axios.get("http://localhost:5000/zip", options).then((res) => {
      console.log(res);
      var blob = new Blob([res.data], { type: "application/zip" });
      saveAs(blob, "sd");
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.getZip} className="btn btn-success">
          Get zip download
        </button>
      </div>
    );
  }
}
