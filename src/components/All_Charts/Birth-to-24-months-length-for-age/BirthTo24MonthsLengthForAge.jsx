import React, { Component } from 'react'
import { Line } from "react-chartjs-2";
import Birth_to_24_months_length_for_age_dataset from "./Birth-to-24-months-length-for-age-dataset"


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
        { x: "0", y: "52" },
        { x: "2", y: "54" },
        { x: "4", y: "64" },
        { x: "6", y: "68" },
        { x: "8", y: "72" },
        { x: "10", y: "80" },
    ],
};

export default class BirthTo24MonthsLengthForAge extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {
                datasets: Birth_to_24_months_length_for_age_dataset,
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
                            text: "Length(cm)",
                            color: "green",
                        },
                    },
                    y1: {
                        // type: "linear",
                        // stepSize: 1,
                        // min: 0,
                        // max: 18,
                        position: "right",
                        title: {
                            display: true,
                            text: "Length(cm)",
                            color: "blue",
                        },
                        // grid: {
                        //     drawOnChartArea: false,
                        // },
                        // ticks: {
                        //     callback: function (value, index, values) {
                        //         // return index % 2 === 0 ? this.getLabelForValue(value) : "";
                        //         return (value * 2.20462).toPrecision(2);
                        //     },
                        // },
                    },
                },
                plugins: {
                    title: {
                        display: true,
                        text: "Length For Age",
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
                            // beforeTitle: {},
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
        }
    }


    componentDidMount() {
        this.setState((prevstate) => {
            return {
                data: {
                    ...prevstate.data,
                    datasets: [...prevstate.data.datasets, patiendata],
                },

            };
        })
    }

    render() {
        return (
            <div>
                <Line
                    options={this.state.options}
                    data={this.state.data}
                />
            </div>
        )
    }
}
