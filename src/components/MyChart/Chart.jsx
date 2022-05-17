import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

import MyDatasets from "./MyDatasets";

const patiendata = {
  label: "patient",
  pointRadius: 3,

  pointBackgroundColor: "#4da5f7",
  pointHoverRadius: 0,
  pointHoverBorderWidth: 0,
  spanGaps: false,
  showLine: true,
  borderWidth: 1,
  fill: false,
  borderColor: "blue",
  backgroundColor: "blue",
  data: [
    { x: "0", y: "2.5" },
    { x: "1.5", y: "3.5" },
    { x: "4.5", y: "4.4" },
    { x: "7.5", y: "6.5" },
    { x: "9.5", y: "8.5" },
    { x: "10.5", y: "9.5" },
  ],
};

const options = {
  scales: {
    x: {
      beginAtZero: true,
      display: true,
      title: {
        display: true,
        text: "Age(months)",
        color: "red",
      },

      ticks: {
        callback: function (value, index, values) {
          const updatedvalue = Math.floor(value);

          return value % 3 == 0 ? value : "";
        },
      },
    },
    x1: {
      position: "top",
      title: {
        display: true,
        text: "Age(months)",
        color: "red",
      },
      ticks: {
        callback: function (value, index, values) {
          const updatedvalue = Math.floor(value);

          return value % 3 == 0 ? value : "";
        },
      },
    },
    y: {
      display: true,
      position: "left",
      title: {
        display: true,
        text: "weight(Kg)",
        color: "green",
      },
    },
    y1: {
      type: "linear",
      stepSize: 1,
      min: 0,
      max: 18,
      position: "right",
      title: {
        display: true,
        text: "weight(lbs)",
        color: "blue",
      },
      grid: {
        drawOnChartArea: false,
      },
      ticks: {
        callback: function (value, index, values) {
          // return index % 2 === 0 ? this.getLabelForValue(value) : "";
          return (value * 2.20462).toPrecision(2);
        },
      },
    },
  },
  plugins: {
    title: {
      display: true,
      text: "this is line graph",
      fontSize: 18,
    },
    legend: {
      display: true,
      reverse: true,
      position: "right",
      labels: {
        color: "rgb(255, 99, 132)",
        boxWidth: 15,
        usePointStyle: true,
        pointStyle: "circle"
      },
    },

    tooltip: {
      callbacks: {
        beforeTitle: function () {
          console.log("beforeTitle");
        },
        // label: function (tooltipItem, patiendata) {
        //   this.pointToolTip = [];
        //   // console.log(data.datasets);

        //   // this.pointToolTip.push("Age at Visit: " + 12);
        //   // this.pointToolTip.push("Weight: " + 122);
        //   // return this.pointToolTip;
        //   if (tooltipItem.datasetIndex == 9) {
        //     var focused_point_data = "asf";
        //     console.log(tooltipItem);
        //     // console.log(tooltipItem.dataset);
        //     this.pointToolTip.push("Age at Visit: " + focused_point_data);
        //     return this.pointToolTip;
        //   } else {
        //     return "af";
        //   }
        // },
      },
    },
  },
  animation: {
    onComplete: function (e) {
      this.data.datasets.forEach((element, i) => { });
    },
  },
};

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.state = {
      data: {
        datasets: MyDatasets,
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: "Age(months)",
              color: "red",
            },
            ticks: {
              callback: function (value, index, values) {
                const updatedvalue = Math.floor(value);
                return value % 3 == 0 ? value : "";
              },
            },
          },
          x1: {
            position: "top",
            title: {
              display: true,
              text: "Age(months)",
              color: "red",
            },
            ticks: {
              callback: function (value, index, values) {
                const updatedvalue = Math.floor(value);

                return value % 3 == 0 ? value : "";
              },
            },
          },
          y: {
            display: true,
            position: "left",
            title: {
              display: true,
              text: "weight(Kg)",
              color: "green",
            },
          },
          y1: {
            type: "linear",
            stepSize: 1,
            min: 0,
            max: 18,
            position: "right",
            title: {
              display: true,
              text: "weight(lbs)",
              color: "blue",
            },
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              callback: function (value, index, values) {
                // return index % 2 === 0 ? this.getLabelForValue(value) : "";
                return (value * 2.20462).toPrecision(2);
              },
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "this is line graph",
            fontSize: 18,
          },
          legend: {
            display: true,
            reverse: true,
            position: "right",
            labels: {
              color: "rgb(255, 99, 132)",
              boxWidth: 15,
              usePointStyle: true,
              pointStyle: "circle"
            },
          },
          tooltip: {
            callbacks: {
              beforeTitle: {},
              // label: function (tooltipItem, patiendata) {
              //   this.pointToolTip = [];
              //   // console.log(data.datasets);

              //   // this.pointToolTip.push("Age at Visit: " + 12);
              //   // this.pointToolTip.push("Weight: " + 122);
              //   // return this.pointToolTip;
              //   if (tooltipItem.datasetIndex == 9) {
              //     var focused_point_data = "asf";
              //     console.log(tooltipItem);
              //     // console.log(tooltipItem.dataset);
              //     this.pointToolTip.push("Age at Visit: " + focused_point_data);
              //     return this.pointToolTip;
              //   } else {
              //     return "af";
              //   }
              // },
            },
          },
        },
        animation: {
          onComplete: function (e) {
            this.data.datasets.forEach((element, i) => { });
          },
        },

      },
      name: "arslan",
      age: 12,
    };
  }
  componentDidMount() {
    this.setState((prevstate) => {
      return {
        data: {
          ...prevstate.data,
          datasets: [...prevstate.data.datasets, patiendata],
        },

      };
    }, () => {

      this.setState((prevstate) => {
        return {
          options: {
            ...prevstate.options,
            plugins: {
              ...prevstate.options.plugins,
              tooltip: {
                ...prevstate.options.plugins.tooltip,
                usePointStyle: true,
                callbacks: {
                  ...prevstate.options.plugins.tooltip.callbacks,
                  beforeTitle: () => { return null },
                  title: () => { return null },
                  beforeLabel: () => { return null },
                  label: (tooltipItem) => {
                    let pointToolTip = [];
                    if (tooltipItem.datasetIndex == 9) {
                      //var focused_point_dataa = data.datasets[9].data[tooltipItem.index].tooltip;
                      var focused_point_data = "asf";
                      console.log(tooltipItem);
                      // console.log(tooltipItem.dataset);
                      pointToolTip.push("Age at Visit: " + tooltipItem.label + " Months");
                      pointToolTip.push("Weight: " + tooltipItem.formattedValue + " kg");
                      return pointToolTip;
                    }

                  },
                  labelColor: function (context) {
                    return {
                      borderColor: 'red',
                      backgroundColor: 'green',
                      borderWidth: 5,
                      borderDash: [5, 5],
                      borderRadius: 0,
                      boxWidth: 34
                    };
                  },
                  labelTextColor: function (context) {
                    return 'white';
                  },
                  labelPointStyle: () => {
                    return {
                      pointStyle: 'triangle',
                      rotation: 0,
                      boxWidth: 34
                    };
                  },
                }
              }
            }
          }
        }
      })
    });


  }
  randomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  fetchdataobj = () => {
    const arrr = [
      {
        label: "testing1",
        data: [33, 12, 6, 9, 12, 32],
      },
      {
        label: "testing 2",
        data: [3, 2, 45, 23, 12, 44],
      },
    ];

    const newarr = arrr.map((arr) => {
      // if (arr.label == "testing1") {
      //   return { ...arr, fill: true, borderColor: this.randomColor() };
      // }
      return { ...arr, fill: true, borderColor: this.randomColor() };
    });
    return newarr;
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-10">
            <Line
              ref={this.chartRef}
              // height="100"
              // width="200"
              options={this.state.options}
              data={this.state.data}
            />
          </div>
        </div>
      </div>

    );
  }
}
