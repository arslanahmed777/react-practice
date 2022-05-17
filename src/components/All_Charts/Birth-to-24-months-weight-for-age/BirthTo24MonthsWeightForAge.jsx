import React, { Component } from 'react'
import { Line } from "react-chartjs-2";
import Birth_to_24_months_weight_for_age_dataset from "./Birth-to-24-months-weight-for-age-dataset"

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
        { x: "2", y: "4.99" },
        { x: "6", y: "8.54" },
        { x: "8", y: "8.14" },
        { x: "10", y: "9.78" },
        { x: "12", y: "11.11" },
        { x: "14", y: "11.65" },
        { x: "16", y: "11.88" },
    ],
};
class BirthTo24MonthsWeightForAge extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {
                datasets: Birth_to_24_months_weight_for_age_dataset,
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
        console.log("i am rendering");
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



export default React.memo(BirthTo24MonthsWeightForAge,)