import React, { Component } from "react";
import { FaStar } from "react-icons/fa";
export default class RatingStar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: null,
      onHover: null,
    };
  }

  setRating = (ratingValue) => {
    if (ratingValue !== this.state.rating) {
      this.setState({ rating: ratingValue }, () => {
        this.props.changeRating(this.state.rating);
      });
    }
  };
  render() {
    console.log("star render");
    const {
      total,
      starRatedColor,
      starEmptyColor,
      starDimension,
      starSpacing,
    } = this.props;
    const { rating, onHover } = this.state;
    return (
      <div>
        {[...Array(total)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label>
              <FaStar
                size={starDimension}
                color={
                  ratingValue <= (onHover || rating)
                    ? starRatedColor
                    : starEmptyColor
                }
                onMouseEnter={() => this.setState({ onHover: ratingValue })}
                onMouseLeave={() => this.setState({ onHover: null })}
              />
              <input
                name="rating"
                type="radio"
                style={{ display: "none" }}
                onClick={() => this.setRating(ratingValue)}
                value={ratingValue}
              />
            </label>
          );
        })}
      </div>
    );
  }
}
