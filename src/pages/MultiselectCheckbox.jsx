import React, { Component } from "react";

export default class MultiselectCheckbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedValues: [],
    };
  }
  handleChange = (e) => {
    const isChecked = e.target.checked;
    const value = e.target.value;
    const checked_values = this.state.checkedValues;
    if (isChecked) {
      this.setState(
        {
          checkedValues: [...checked_values, value],
        },
        () => {
          this.props.onChange(this.state.checkedValues);
        }
      );
    } else {
      let index = checked_values.indexOf(value);
      checked_values.splice(index, 1);
      this.setState(
        {
          checkedValues: checked_values,
        },
        () => {
          this.props.onChange(this.state.checkedValues);
        }
      );
    }
  };
  render() {
    const { options } = this.props;
    return (
      <div>
        {options.map((option) => {
          return (
            <label>
              <input
                type="checkbox"
                name={option}
                value={option}
                onChange={(e) => this.handleChange(e)}
              />
              {option}
            </label>
          );
        })}
      </div>
    );
  }
}
