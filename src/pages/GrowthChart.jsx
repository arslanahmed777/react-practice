import React, { Component } from "react";

import BirthTo24MonthsWeightForAge from "../components/All_Charts/Birth-to-24-months-weight-for-age/BirthTo24MonthsWeightForAge";
import BirthTo24MonthsWeightForLength from "../components/All_Charts/Birth-to-24-months-weight-for-length/BirthTo24MonthsWeightForLength";
import BirthTo24MonthsLengthForAge from "../components/All_Charts/Birth-to-24-months-length-for-age/BirthTo24MonthsLengthForAge"
import BirthTo24MonthsHeadCircumferenceForAge from "../components/All_Charts/Birth-to-24-months-head-circumference-for-age/BirthTo24MonthsHeadCircumferenceForAge";
import Accordion from "../components/Accordion/Accordion";
import './GrowthChart.css'


export const Html1 = ({ ChangeSubActiveTab, mainActiveTab, subActiveTab }) => {
  return (
    <>
      <div className="border p-1">
        <div onClick={() => { ChangeSubActiveTab(1) }} className={`mb-2 subTab ${mainActiveTab === 10 && subActiveTab === 1 ? "activeSubTab" : ""} `}>Weight for length </div>
        <div onClick={() => { ChangeSubActiveTab(2) }} className={`mb-2 subTab ${mainActiveTab === 10 && subActiveTab === 2 ? "activeSubTab" : ""} `}>Weight for age</div>
        <div onClick={() => { ChangeSubActiveTab(3) }} className={`mb-2 subTab ${mainActiveTab === 10 && subActiveTab === 3 ? "activeSubTab" : ""} `}>length for age</div>
        <div onClick={() => { ChangeSubActiveTab(4) }} className={`mb-2 subTab ${mainActiveTab === 10 && subActiveTab === 4 ? "activeSubTab" : ""} `}>Head Circumference</div>
      </div>
    </>
  )
}


export const Html2 = ({ ChangeSubActiveTab, mainActiveTab, subActiveTab }) => {
  return (
    <>
      <div className="border p-1">
        <div onClick={() => { ChangeSubActiveTab(5) }} className={`mb-2 subTab ${mainActiveTab === 20 && subActiveTab === 5 ? "activeSubTab" : ""} `}>Weight for length</div>
        <div onClick={() => { ChangeSubActiveTab(6) }} className={`mb-2 subTab ${mainActiveTab === 20 && subActiveTab === 6 ? "activeSubTab" : ""} `}>Weight for age</div>
        <div onClick={() => { ChangeSubActiveTab(7) }} className={`mb-2 subTab ${mainActiveTab === 20 && subActiveTab === 7 ? "activeSubTab" : ""} `}>length for age</div>
      </div>

    </>
  )
}


const mystyle = {

  color: "black",
  fontWeight: "bold",
  fontSize: "14px",
  borderBottom: "1px solid #036bb4",
  padding: "6px",
  background: "none"
}
const myActiveStyle = {
  color: "black",
  fontWeight: "bold",
  fontSize: "14px",
  borderBottom: "1px solid #036bb4",
  padding: "6px",
  background: "none"
}

export default class GrowthChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      clicked: "0",
      mainActiveTab: 10,
      subActiveTab: 1,
    }
  }

  handleToggle = (index, maintab, subtab) => {
    const { clicked } = this.state
    if (clicked === index) {
      return this.setState({
        clicked: "0"
      })
    }
    this.setState({
      clicked: index,
      mainActiveTab: maintab,
      subActiveTab: subtab,
    })
  };
  ChangeSubActiveTab = (tab) => {
    this.setState({
      subActiveTab: tab,
    })
  }
  render() {
    const { clicked, mainActiveTab, subActiveTab } = this.state
    return (
      <div>
        {/* <Chart /> */}

        <div className="container-fluid">
          <div className="row border">
            <div className="col-2 border py-2">

              <Accordion gap="15px" styling={mystyle} activeStyling={myActiveStyle} onToggle={() => this.handleToggle(0, 10, 1)} active={clicked === 0} header="Birth To 24 Months" >
                <Html1 ChangeSubActiveTab={this.ChangeSubActiveTab} mainActiveTab={mainActiveTab} subActiveTab={subActiveTab} />
              </Accordion>
              <Accordion gap="15px" styling={mystyle} activeStyling={myActiveStyle} onToggle={() => this.handleToggle(1, 20, 5)} active={clicked === 1} header="2 years To 22 years" >
                <Html2 ChangeSubActiveTab={this.ChangeSubActiveTab} mainActiveTab={mainActiveTab} subActiveTab={subActiveTab} />
              </Accordion>
            </div>
            <div className="col-10 border">

              {mainActiveTab === 10 ?
                subActiveTab === 1 ?
                  (<BirthTo24MonthsWeightForAge />)
                  :
                  subActiveTab === 2 ?
                    (<BirthTo24MonthsWeightForLength />)
                    :
                    subActiveTab === 3 ?
                      (<BirthTo24MonthsLengthForAge />)
                      : subActiveTab === 4 ?
                        (<BirthTo24MonthsHeadCircumferenceForAge />)
                        :
                        (<p>asdfsdf</p>)
                :
                mainActiveTab === 20 ?
                  subActiveTab === 5 ?
                    (<p>subActiveTab 5</p>)
                    :
                    subActiveTab === 6 ?
                      (<p>subActiveTab 6</p>)
                      :
                      subActiveTab === 7 ?
                        (<p>subActiveTab 7</p>)
                        : subActiveTab === 8 ?
                          (<p>subActiveTab 8</p>)
                          :
                          (<p>asdfsdf</p>)
                  :
                  mainActiveTab === 30 ?
                    (
                      <p>Tab 30</p>
                    ) :
                    (
                      <h1>No tab</h1>
                    )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
