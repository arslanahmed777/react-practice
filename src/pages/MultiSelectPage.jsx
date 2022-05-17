import React, { Component } from "react";
import Multiselect from "../components/Multiselect/Multiselect";
const data = [
  {
    name: "one",
    value: "one",
  },
  {
    name: "two",
    value: "two",
  },
  {
    name: "three",
    value: "three",
  },
  {
    name: "four",
    value: "four",
  },
  {
    name: "five",
    value: "five",
  },
  {
    name: "six",
    value: "six",
  },
];
export default class MultiSelectPage extends Component {
  render() {
    function result(params) {
      console.log(params);
    }
    return (
      <div>
        <Multiselect options={data} onSelectOptions={result} />
      </div>
    );
  }
}
