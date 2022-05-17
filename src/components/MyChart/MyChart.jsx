import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import dataset from "./dataset";
class MyChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [
          "3rd",
          "5th",
          "10th",
          "25th",
          "50th",
          "75th",
          "85th",
          "90th",
          "95th",
          "97th",
        ],
        datasets: dataset,
      },
      options: {
        animation: true,

        maintainAspectRatio: true,
        plugins: {
          title: {
            display: this.props.displayTitle,
            text: "this is line graph",
            fontSize: 18,
          },
          legend: {
            display: true,
            labels: {
              color: "rgb(255, 99, 132)",
            },
          },
          tooltip: {
            enabled: true,
            callbacks: {
              beforeTitle: function () {
                console.log("sdf");
              },
            },
          },
        },
        layout: {
          padding: {
            left: 50,
            top: 50,
            right: 50,
            bottom: 50,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: "AGE",
              color: "red",
            },
          },
        },
      },
    };
  }
  static defaultProps = {
    displayTitle: false,
    legendPosition: "top",
  };
  render() {
    return (
      <div>
        <Line
          width="400"
          height="100"
          data={this.state.chartData}
          options={this.state.options}
        />
      </div>
    );
  }
}

export default MyChart;
