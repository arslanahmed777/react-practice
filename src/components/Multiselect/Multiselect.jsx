import React, { Component } from "react";
import "./styles.css";

export class Multiselect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      dropDownValue: [],
      selectAll: false,
    };
    this.checkBox = this.checkBox.bind(this);
  }
  componentWillMount() {
    this.setState({
      dropDownValue: this.props.options,
    });
  }
  componentDidUpdate(pP, pS, sS) {
    console.log("upate occur");
    console.log(pS.checked);
    if (pS.checked == this.state.checked) {
      console.log("matched");
    }
  }
  removeChip(value) {
    this.checkBox(value, false);
  }
  checkBox(value, condition) {
    let checkedValue = this.state.checked;
    if (condition) {
      checkedValue.push(value);
    } else {
      let index = checkedValue.indexOf(value);
      checkedValue.splice(index, 1);
      this.setState({
        selectAll: false,
      });
    }
    this.setState(
      {
        checked: checkedValue,
      },
      () => {
        this.props.onSelectOptions(this.state.checked);
      }
    );
  }
  searchFun(e) {
    console.log("sdg");
    if (e.target.value.length !== 0) {
      let enteredValue = e.target.value.toLowerCase();
      let presentValue = this.props.options.filter(function (data) {
        return data.name.indexOf(enteredValue) > -1;
      });
      this.setState({ dropDownValue: presentValue });
    } else {
      this.setState({ dropDownValue: this.props.options });
    }
  }
  returnChip() {
    const chip = this.state.checked
      ? this.state.checked.map((data, index) => (
          <div className="chip-body" key={index}>
            <p className="chip-text">{data}</p>
            <button
              className="chip-close"
              onClick={(e) => this.removeChip(data)}
            >
              &times;
            </button>
          </div>
        ))
      : [];
    return chip;
  }
  returnList() {
    const list = this.state.dropDownValue
      ? this.state.dropDownValue.map((data, index) => (
          <label className="multi_container" key={index}>
            {data.name}
            <input
              type="checkbox"
              value={data.value}
              onChange={(e) => this.checkBox(e.target.value, e.target.checked)}
              checked={this.state.checked.includes(data.value) ? true : false}
            />
            <span className="checkmark"></span>
          </label>
        ))
      : null;
    return list;
  }

  handleAllCheck = (e) => {
    const ischecked = e.target.checked;
    if (ischecked) {
      const dropval = this.state.dropDownValue.map((v) => v.value);
      console.log(dropval);
      this.setState({
        checked: [...dropval],
        selectAll: true,
      });
    } else {
      this.setState(
        {
          checked: [],
          selectAll: false,
        },
        () => {
          this.props.onSelectOptions(this.state.checked);
        }
      );
    }
  };
  returnSingleChip = () => {
    const checkedval = this.state.checked;
    let singleChip = null;
    if (checkedval.length > 0) {
      singleChip = (
        <div className="chip-body">
          <p className="chip-text">All Selected</p>
        </div>
      );
    }

    return singleChip;
  };
  render() {
    return (
      <div className="multiSelect">
        <div className="chip">
          {this.state.selectAll ? this.returnSingleChip() : this.returnChip()}
        </div>
        <input
          type="text"
          name="Search"
          autoComplete="off"
          placeholder="Search Data"
          className="input-box"
          onChange={(e) => this.searchFun(e)}
        />
        <div className="search-result">
          <div className="list-result">
            <label className="multi_container">
              select all
              <input type="checkbox" onChange={(e) => this.handleAllCheck(e)} />
              <span className="checkmark"></span>
            </label>
            {this.returnList()}
          </div>
        </div>
      </div>
    );
  }
}

export default Multiselect;
