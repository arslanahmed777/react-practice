import React from "react";
import { Line } from "react-chartjs-2";

class WeightGraphs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weightType: "British",
        };
    }
    setWeightType = (e, str) => {
        this.setState({
            weightType: str,
        });
    };

    render() {
        // Setup of data format for graphs
        const axisData = [],
            weightKg = [],
            weightIbs = [];

        this.props.graphData.map((info) => {
            axisData.push(info.dos ? info.dos : 0);
            weightKg.push(info.weight_Kg ? info.weight_Kg : 0);
            weightIbs.push(info.weight_lbs ? info.weight_lbs : 0);
        });
        const { weightType, tempType } = this.state;
        const dataSetforWeight =
            weightType === "Metric"
                ? {
                    label: "Weight in Kg",
                    data: weightKg,
                    fill: true,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 0.2)",
                }
                : {
                    label: "Weight in Ibs",
                    data: weightIbs,
                    fill: true,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 0.2)",
                };
        // Weight graph
        const dataWeight = {
            labels: axisData,
            datasets: [dataSetforWeight],
        };

        const optionsWeight = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        };
        return (
            <div className="marginbottom10 width100 float-left">
                <div className="encountersubheading headingcolums">
                    <div className="float-left">Weight Graph</div>
                    <div className="float-right" id={this.props.patientId}>
                        <label
                            className="fancy-radio custom-color-green"
                            onClick={(e) => this.setWeightType(e, "Metric")}
                        >
                            <input
                                id={this.props.patientId + "Metric"}
                                name="weighttype"
                                value="Metric"
                                type="radio"
                                // onChange={(e) => this.setWeightType(e)}
                                checked={weightType === "Metric" ? true : false}
                            />
                            <span>
                                <i />
                                Metric
                            </span>
                        </label>
                        <label
                            className="fancy-radio custom-color-green"
                            onClick={(e) => this.setWeightType(e, "British")}
                        >
                            <input
                                id={this.props.patientId + "British"}
                                name="weighttype"
                                value="British"
                                type="radio"
                                // onChange={(e) => this.setWeightType(e)}
                                checked={weightType === "British" ? true : false}
                            />
                            <span>
                                <i />
                                British
                            </span>
                        </label>
                    </div>
                </div>
                <div className="table-responsive ">
                    <Line data={dataWeight} options={optionsWeight} />
                </div>
            </div>
        );
    }
}

export default WeightGraphs;
