import React, { Component } from "react";
import RatingStar from "../components/RatingComponent/RatingStar";
export default class Rating extends Component {
  selectedRating = (rating) => {
    console.log(rating);
  };
  render() {
    return (
      <div>
        <RatingStar
          total={5}
          changeRating={this.selectedRating}
          starRatedColor={"#ffc107"}
          starEmptyColor={"#e4e5e9"}
          starDimension={40}
          starSpacing={20}
        />
      </div>
    );
  }
}
