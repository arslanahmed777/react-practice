import React, { Component } from 'react'
import { callApi } from '../../../../utils/call-api'
import { connect } from 'react-redux'
import Tooltip from '../../../shared/Tooltop'
import ButtonLoader from '../../../shared/Loaders/ButtonLoader'
import tickImage from "../../../../asserts/images/svg/check-icon.svg"
class Calculator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fromDate: "",
            toDate: "",
            providerID: '',
            calculatorData: [],
            patientData: null,
            isLoading: false,
        }
    }
    async componentDidMount() {
        try {
            await this.getCalculatorData()
        } catch (error) {
            console.log(error)
        }
    }
    getCalculatorData = async () => {
        // await callApi('/MUCalculator/GetAutomateCalculator', 'get')
        //   .then((res) => {
        //     this.setState({
        //       calculatorData: res,
        //     })
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //   })
        const {
            fromDate,
            toDate,
            calculatorData,
            providerID,
        } = this.state
        const patientData1 = {
            practice_id: 1,
            param_list: [
                {
                    key: '@providerID',
                    value: providerID,
                },
                {
                    key: 'fromDate',
                    value: fromDate,
                },
                {
                    key: 'toDate',
                    value: toDate,
                },
            ],
            pageNo: 1,
            PerPage: 30,
        }

        const cdata = await callApi('/MUCalculator/GetAutomateCalculator', 'get')
        const res = await callApi('/PatientEncounter/GetCalculator', 'post', patientData1)
        let newList = []
        const newarr = res.filter((res_el) => {
            return cdata.filter((cd_el) => {
                if (res_el.measurecode === cd_el.measurecode) {
                    let list = {}
                    list.numerator = res_el.count[0].numeratorCount
                    list.denomenator = res_el.count[0].denominatorCount
                    list.objectivedescription = cd_el.objectivedescription
                    list.criteria = cd_el.criteria
                    list.description = cd_el.description
                    list.displayorder = cd_el.displayorder
                    list.id = cd_el.id
                    list.measurecode = cd_el.measurecode
                    list.measuretype = cd_el.measuretype
                    list.percentagerequired = cd_el.percentagerequired
                    list.percentage = res_el.count[0].percentage
                    newList = newList.concat(list)
                    return cd_el
                }
            })
        })

        this.setState({
            calculatorData: newList
        })


    }

    calculate = () => {
        const {
            fromDate,
            toDate,
            calculatorData,
            isLoading,
            providerID,
        } = this.state

        const patientData = {
            practice_id: 1,
            param_list: [
                {
                    key: '@providerID',
                    value: providerID,
                },
                {
                    key: 'fromDate',
                    value: fromDate,
                },
                {
                    key: 'toDate',
                    value: toDate,
                },
            ],
            pageNo: 1,
            PerPage: 30,
        }

        this.setState(
            {
                isLoading: true,
            },
            () => {
                callApi('/PatientEncounter/GetCalculator', 'post', patientData)
                    .then((res) => {
                        // console.log('res', res)
                        // console.log('calculatordata', calculatorData)
                        let newList = []
                        const newarr = res.filter((res_el) => {
                            return calculatorData.filter((cd_el) => {
                                if (res_el.measurecode === cd_el.measurecode) {
                                    let list = {}
                                    list.numerator = res_el.count[0].numeratorCount
                                    list.denomenator = res_el.count[0].denominatorCount
                                    list.objectivedescription = cd_el.objectivedescription
                                    list.criteria = cd_el.criteria
                                    list.description = cd_el.description
                                    list.displayorder = cd_el.displayorder
                                    list.id = cd_el.id
                                    list.measurecode = cd_el.measurecode
                                    list.measuretype = cd_el.measuretype
                                    list.percentagerequired = cd_el.percentagerequired
                                    list.percentage = res_el.count[0].percentage
                                    newList = newList.concat(list)
                                    return cd_el
                                }
                            })
                        })
                        // console.log('newarr', newList)
                        this.setState({
                            isLoading: false,
                            calculatorData: newList,
                        })
                    })

                    .catch((error) => {
                        console.log('error', error)
                    })
            },
        )
    }

    handleDate = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value,
        })
    }
    handleSelect = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value,
        })
    }
    render() {
        const {
            calculatorData,
            fromDate,
            toDate,
            isLoading,
            providerID,
        } = this.state
        const { userProviders } = this.props

        return (
            <React.Fragment>
                <div className="width100 float-left paddingtop3 encountertopbar">
                    <div className="row">
                        <div className="col-lg-3 col-md-12">
                            <div className="form-group">
                                <select
                                    name="providerID"
                                    aria-controls="DataTables_Table_0"
                                    className="form-control"
                                    onChange={(e) => this.handleSelect(e)}
                                    value={providerID}
                                >
                                    {userProviders &&
                                        userProviders.map((provider) => (
                                            <option value={provider.id}>{provider.label}</option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-12">
                            <div className="form-group">
                                <div className="displayflex date-container">
                                    <input
                                        type="date"
                                        className="form-control"
                                        onChange={(e) => this.handleDate(e)}
                                        value={fromDate}
                                        name="fromDate"
                                    />
                                    <span className="open-button">
                                        <button className="btn btn-primary btn-sm">
                                            <i className="fa fa-calendar" />
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12">
                            <div className="form-group">
                                <div className="displayflex date-container">
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="toDate"
                                        min="1900-01-01"
                                        onChange={(e) => this.handleDate(e)}
                                        value={toDate}
                                    />
                                    <span className="open-button">
                                        <button className="btn btn-primary btn-sm">
                                            <i className="fa fa-calendar" />
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12">
                            <div className="displayflex date-container">
                                <button
                                    disabled={isLoading}
                                    type="button"
                                    onClick={this.calculate}
                                    className="btn btn-sm btn-primary"
                                >
                                    Calculate
                                    {isLoading && <ButtonLoader small={true} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="table-responsive progresstable">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Measure Description</th>
                                    <th>Statistics</th>
                                    <th>Current Progress</th>
                                    <th>Required Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calculatorData &&
                                    calculatorData.map((items, i) => (
                                        <tr key={i}>
                                            <td>{items.measurecode}
                                                <img src={tickImage} style={{ width: "11px", float: "right" }} />
                                                <i className="fa fa-times text-danger"></i>
                                            </td>
                                            <td>
                                                <Tooltip text={items.criteria}>
                                                    <i className="fa fa-exclamation-circle progressalerticone float-left mr-2" />
                                                </Tooltip>
                                                <span className="elipiseCalculatorTable ml-2">
                                                    {items.description}
                                                </span>{' '}
                                                <i
                                                    className="fa fa-exclamation-circle progressalerticone float-right"
                                                    aria-hidden="true"
                                                ></i>
                                            </td>
                                            <td>
                                                {items.numerator ? items.numerator : 0}/{' '}
                                                {items.denomenator ? items.denomenator : 0}
                                            </td>
                                            <td>
                                                <div className="progressbar bluegradient" style={{ width: `${items.percentage}` }}></div>
                                            </td>
                                            <td>{items.percentagerequired}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        userProviders: state.userInfo
            ? state.userInfo.userProviders
                ? state.userInfo.userProviders
                : []
            : [],
    }
}
export default connect(mapStateToProps, null)(Calculator)
