import React, { Component } from "react";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
import { callApi } from "../../../../../utils/call-api";
import isNull from "../../../../../utils/null-checking";
import { getClinicalNotesData } from "./ClinicalNotesData";
import TableLoader from "../../../../shared/Loaders/TableLoader";
import "./styles.css";

class ClinicalDetailReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allClinicals: {
        medication: [],
        allergies: [],
        problemList: [],
        socialHistory: [],
        RFV: [],
        physicalExam: [],
        medicalNotes: [],
        ReviewOfSystem: [],
        familyHealth: [],
        vitals: [],
        procedure: [],
        immunization: [],
        FunctionalCognitiveStatus: [],
        Amendments: [],
      },

      userdata: [],
      allergies: [],
      immunization: [],
      familyHealth: [],
      procedure: [],
      socialHistory: {},
      positionedComponent: [],
      FunctionalCognitiveStatus: [],
      vitals: {},
      medication: [],
      practiceData: {},
      notesModules: [],
      RFV: {},
      module: [],
      check: true,
      patientEncounter: {},
    };
  }
  componentDidMount = async () => {
    const { patientNotesID, patientID } = this.props;

    if (patientID != null) {
      callApi("/PatientNotes/Practice", "get", null)
        .then((response) => {
          this.setState(
            { practiceData: response ? response : {} }
            // , this.setPosition
          );
          console.log("PRACTICE_RESPONSE", response);
        })
        .catch((error) => {
          console.log(error);
        });

      callApi(
        `/PatientNotes/SummarypatientHeader?patientID=${patientID}`,
        "get",
        null
      )
        .then((response) => {
          this.setState({ userdata: response ? response : [] });
          console.log("USER_DATA", response);
        })
        .catch((error) => {
          console.log(error);
        });

      callApi(
        `/PatientEncounter/PrintPatientEncounter?patientId=${patientID}&patientNotesId=${patientNotesID}`,
        "get",
        null
      )
        .then((response) => {
          this.setState({ patientEncounter: response ? response : {} });
          console.log("Patient_Encounter", response);
        })
        .catch((error) => {
          console.log(error);
        });
      // callApi(
      //   `/PatientEncounter/GetPatientAllergy?patientId=${patientID}`,
      //   'get',
      //   null,
      // )
      //   .then((response) => {
      //     this.setState({ allergies: response ? response : [] })
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
      // callApi(
      //   `/PatientEncounter/GetPatientImmunization?patientNotesId=${patientNotesID}`,
      //   'get',
      //   null,
      // )
      //   .then((response) => {
      //     this.setState({ immunization: response ? response : [] })
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
      // callApi(
      //   `//PatientEncounter/GetPatientProcedure?patientNotesId=${patientNotesID}`,
      //   'get',
      //   null,
      // )
      //   .then((response) => {
      //     this.setState({ procedure: response ? response : [] })
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
      // callApi(
      //   `/PatientEncounter/GetPatientVitals?patientNotesId=${patientNotesID}`,
      //   'get',
      //   null,
      // )
      //   .then((response) => {
      //     this.setState({ vitals: response ? response[0] : {} })
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
      // callApi(
      //   `/PatientEncounter/GetFamilyHistory?patientNotesId=${patientNotesID}`,
      //   'get',
      //   null,
      // )
      //   .then((response) => {
      //     this.setState({ familyHealth: response ? response : [] })
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
      // callApi(
      //   `/PatientEncounter/GetpatientSocialHistory?patientNotesID=${patientNotesID}`,
      //   'get',
      //   null,
      // )
      //   .then((response) => {
      //     this.setState({ socialHistory: response ? response[0] : {} })
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
      // callApi(
      //   `/PatientEncounter/GetFunctionalCognitiveStatus?patientNotesID=${patientNotesID}`,
      //   'get',
      //   null,
      // )
      //   .then((response) => {
      //     console.log('functionl cognative ', response)
      //     this.setState({
      //       FunctionalCognitiveStatus: response ? response : [],
      //     })
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
      // callApi(
      //   `/PatientEncounter/GetPatientPrescriptions?patientId=${patientID}`,
      //   'get',
      //   null,
      // )
      //   .then((response) => {
      //     this.setState({ medication: response ? response : [] })
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
      // callApi(
      //   `/PatientEncounter/GetPatientHPI?patientNotesId=${patientNotesID}`,
      //   'get',
      //   null,
      // )
      //   .then((response) => {
      //     this.setState({ RFV: response ? response[0] : {} })
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
    }
  };
  // setPosition = () => {
  //   let reaction = [
  //     { id: "", description: "Please Select" },
  //     { id: 0, description: "Unknown" },
  //     { id: 1, description: "Skin Rash" },
  //     { id: 2, description: "Hives" },
  //     { id: 3, description: "Respiratory Distress" },
  //     { id: 4, description: "Laryngeal Edema" },
  //     { id: 5, description: "Asthmatic Attack" },
  //     { id: 6, description: "Syncope" },
  //     { id: 7, description: "Anaphylaxis" },
  //     { id: 8, description: "Other" },
  //     { id: 9, description: "Diarrhea" },
  //     { id: 10, description: "Dizziness" },
  //     { id: 11, description: "Wheezing" },
  //   ];

  //   let severity = [
  //     { id: "", description: "Please Select" },
  //     { id: 1, description: "Fatal" },
  //     { id: 2, description: "Severe" },
  //     { id: 3, description: "Moderate to Severe" },
  //     { id: 4, description: "Moderate" },
  //     { id: 5, description: "Mild to Moderate" },
  //     { id: 6, description: "Mild" },
  //   ];

  //   let allergyType = [
  //     { id: "", description: "Please Select" },
  //     { id: 1, description: "Food Intolerance" },
  //     { id: 2, description: "Food Allergy" },
  //     { id: 3, description: "Drug Allergy" },
  //     { id: 4, description: "Propensity to Adverse Reactions to Substance" },
  //     { id: 5, description: "Propensity to Adverse Reactions to Food" },
  //     { id: 6, description: "Allergy to Substance" },
  //     { id: 7, description: "Propensity to Adverse Reactions to Drug" },
  //     { id: 8, description: "Propensity to Adverse Reactions" },
  //     { id: 9, description: "Drug Intolerance" },
  //   ];
  //   let genderIdentity = [
  //     { id: 446151000124109, description: "Male" },
  //     {
  //       id: 407376001,
  //       description: " Female-to-Male (FTM)/Transgender Male/Trans Man",
  //     },
  //     { id: 446141000124107, description: "female" },
  //     {
  //       id: 446131000124102,
  //       description: "Genderqueer, neither exclusively male nor female",
  //     },
  //     { id: "OTH", description: "Other" },
  //     { id: "UNK", description: "Unknown" },
  //     { id: "ASKU", description: "Choose not to disclose" },
  //     //  { id:  ,description: },
  //     //  { id:  ,description: },
  //     //  { id:  ,description: },
  //   ];
  //   let sexualOrientation = [
  //     {
  //       id: 20430005,
  //       description: "Heterosexual (not lesbian, gay, or bisexual)",
  //     },
  //     { id: 38628009, description: "Lesbian or gay" },
  //     { id: 42035005, description: "Bisexual" },
  //     {
  //       id: 446131000124102,
  //       description: "Genderqueer, neither exclusively male nor female",
  //     },
  //     { id: "OTH", description: "Other" },
  //     { id: "UNK", description: "Unknown" },
  //     { id: "ASKU", description: "Choose not to disclose" },
  //     //  { id:  ,description: },
  //     //  { id:  ,description: },
  //     //  { id:  ,description: },
  //   ];
  //   let tobaccoStatus = [
  //     { id: 449868002, description: "Current every day smoker" },
  //     { id: 8517006, description: "Former smoker" },
  //     { id: 266919005, description: "Never smoker" },
  //     { id: 77176002, description: "Smoker, current status unknown" },
  //     { id: 266927001, description: "Unknown if ever smoked" },
  //     { id: 428071000124103, description: "Heavy tobacco smoker" },
  //     { id: 42806100012410, description: "Light tobacco smoker" },
  //     //  { id:  ,description: },
  //     //  { id:  ,description: },
  //     //  { id:  ,description: },
  //   ];

  //   // let  =
  //   //   this.state.saveModel.tobaccoStatus ==
  //   //     ?
  //   //     : this.state.saveModel.tobaccoStatus ==
  //   //     ?
  //   //     : this.state.saveModel.tobaccoStatus ==
  //   //     ?
  //   //     : this.state.saveModel.tobaccoStatus ==
  //   //     ?
  //   //     : this.state.saveModel.tobaccoStatus ==
  //   //     ?
  //   //     : this.state.saveModel.tobaccoStatus == ""
  //   //     ?
  //   //     : this.state.saveModel.tobaccoStatus == ""
  //   //     ?
  //   //     : "";
  //   const response = this.state.allClinicals;
  //   let myAllergies = response.allergies.filter(
  //     (row) => row.isArchive === false
  //   );
  //   let myMedications = response.medication.filter(
  //     (row) => row.isArchive === true
  //   );
  //   let myProcedure = response.procedure
  //     ? response.procedure.filter((row) => row.status === true)
  //     : [];
  //   let myAmendment = response.Amendments
  //     ? response.Amendments.filter((row) => row.inactive === true)
  //     : [];

  //   let quitDate = this.state.socialHistory.quitDate
  //     ? this.state.socialHistory.quitDate.split("-")
  //     : "";
  //   let newQuitDate = quitDate[1] + "/" + quitDate[2] + "/" + quitDate[0];

  //   let startDate = this.state.socialHistory.startdate
  //     ? this.state.socialHistory.startdate.split("-")
  //     : "";
  //   let newStartDate = startDate[1] + "/" + startDate[2] + "/" + startDate[0];

  //   let endDate = this.state.socialHistory.enddate
  //     ? this.state.socialHistory.quitDate.split("-")
  //     : "";
  //   let newEndDate = endDate[1] + "/" + endDate[2] + "/" + endDate[0];

  //   let reviewofsystem = {
  //     ros: response.ReviewOfSystem.ros ? response.ReviewOfSystem.ros : [],
  //     template: response.ReviewOfSystem.template
  //       ? response.ReviewOfSystem.template
  //       : [],
  //   };

  //   let physicalExam = {
  //     physicalExam: response.physicalExam.physicalExam
  //       ? response.physicalExam.physicalExam
  //       : [],
  //     template: response.physicalExam.template
  //       ? response.physicalExam.template
  //       : [],
  //   };

  //   const positionArray = [
  //     {
  //       name: "Allergies",
  //       Component:

  //         ) : null,
  //     }
  //   ];
  //   const { module } = this.props;
  //   let positionedComponent = [];
  //   module.map((item, index) => {
  //     positionArray.map((position) => {
  //       if (item.displayName === position.name) {
  //         positionedComponent.push(position);
  //       }
  //     });
  //   });

  //   this.setState({ positionedComponent });
  // };
  render() {
    // console.log('vit', this.state.vitals)
    // console.log('this.state.RFV', this.state.RFV)
    const { userdata, practiceData, patientEncounter } = this.state;

    return (
      <>
        <div
          className="modal fade show"
          id="sm-model-vitalsAdd"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="lg-model-vitalsAdd"
          style={{
            display: "block",
            paddingRight: "2px",
            backgroundColor: "rgba(77, 77, 77, 0.6)",
            zIndex: "9000",
          }}
          aria-modal="true"
        >
          <div className="modal-dialog modal-xl " role="document">
            <div className="modal-content" style={{ padding: 5 }}>
              <div
                className="modal-header"
                style={{ display: "block", borderRadius: 4 }}
              >
                <span>Clinical Notes</span>
                <i
                  className="fa fa-times fontsize18 textwhite cursorpointer float-right"
                  onClick={this.props.close}
                  aria-hidden="true"
                />
                <ReactToPrint
                  trigger={() => (
                    <a
                      href
                      style={{
                        borderRight: "1px solid white",
                        paddingRight: 5,
                        marginRight: 6,
                      }}
                      className="float-right"
                    >
                      {" "}
                      Print
                    </a>
                  )}
                  content={() => this.componentRef}
                />
              </div>
              <div
                className="modal-body"
                ref={(el) => (this.componentRef = el)}
              >
                <div className="row">
                  <div className="col-sm-12">
                    <table className="gridtbl">
                      <tr>
                        <th width="7%" align="left">
                          PATIENT
                        </th>
                        <th width="37%" align="left">
                          &nbsp;
                        </th>
                        <th colspan="2" align="left">
                          FACILITY
                        </th>
                        <th colspan="2" align="left">
                          ENCOUNTER
                        </th>
                      </tr>
                      <tr>
                        <td height="21">
                          <strong>{userdata[0]?.patientName}</strong>
                        </td>
                        <td>&nbsp;</td>
                        <td colspan="2">
                          <strong>New Hope Integrative Medicine</strong>
                        </td>
                        <td width="11%">
                          <strong>
                            <strong>NOTE TYPE</strong>
                          </strong>{" "}
                        </td>
                        <td width="11%">SOAP Note </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>DOB</strong>
                        </td>
                        <td>{userdata[0]?.dob}</td>
                        <td width="2%">
                          <strong>T</strong>
                        </td>
                        <td width="31%"> {practiceData?.phoneNumber} </td>
                        <td>
                          <strong>SEEN BY</strong>
                        </td>
                        <td> Provider MD </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>AGE</strong>
                        </td>
                        <td>{userdata[0]?.age}</td>
                        <td>
                          <strong>F</strong>
                        </td>
                        <td>{practiceData?.faxNumber}</td>
                        <td>
                          <strong>DATE</strong>
                        </td>
                        <td> 08/06/2021 </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>SEX</strong>
                        </td>
                        <td>{userdata[0]?.patientGender}</td>
                        <td colspan="2">
                          {practiceData?.address?.split(",")[0]}
                        </td>
                        <td>
                          <strong>AGE AT DOS</strong>
                        </td>
                        <td> 55yrs </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>PRN</strong>
                        </td>
                        <td> HJ854398</td>
                        <td colspan="2">
                          {practiceData?.address?.split(",")[1]}
                        </td>
                        <td>Not Signed</td>
                        <td>&nbsp;</td>
                        <td width="1%">&nbsp;</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td colspan="2">
                          {practiceData?.address?.split(",")[2]}
                        </td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td colspan="6">
                          <strong>Chief complaint</strong>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="6">
                          Thyroid issues, anxiety about drs (Appt time: 11:00
                          AM) (Arrival time: 10:11 AM)
                        </td>
                      </tr>
                    </table>
                    <div className="gry-heading">
                      Patient identifying details and demographics
                    </div>
                    <table className="gridtbl">
                      <tr>
                        <td>
                          <strong>FIRST NAME</strong>
                        </td>
                        <td>{userdata[0]?.patientName.split(",")[0]}</td>
                        <td>
                          <strong>SEX</strong>
                        </td>
                        <td> {userdata[0]?.patientGender}</td>
                        <td>
                          <strong>RACE</strong>
                        </td>
                        <td> -</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>MIDDLE NAME</strong>
                        </td>
                        <td> -</td>
                        <td>
                          {" "}
                          <strong>DATE OF BIRTH</strong>
                        </td>
                        <td>{userdata[0]?.dob}</td>
                        <td>
                          {" "}
                          <strong>ETHNICITY</strong>
                        </td>
                        <td> -</td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <strong>LAST NAME</strong>
                        </td>
                        <td> {userdata[0]?.patientName.split(",")[1]}</td>
                        <td>
                          {" "}
                          <strong>DEATH OF DEATH</strong>
                        </td>
                        <td> -</td>
                        <td>
                          <strong>PREF. LANGUAGE</strong>
                        </td>
                        <td> -</td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <strong>SSN</strong>
                        </td>
                        <td>{userdata[0]?.ssn}</td>
                        <td>
                          <strong>PRN</strong>
                        </td>
                        <td>MJ854398</td>
                        <td>
                          {" "}
                          <strong>STATUS</strong>
                        </td>
                        <td> Active patient</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                    </table>
                    <div className="gry-heading">CONTACT INFORMATION</div>
                    <table className="gridtbl">
                      <tr>
                        <td width="33%">
                          <strong>NEX OF KIN</strong>
                        </td>
                        <td width="21%">Don Mason</td>
                        <td width="25%">
                          <strong>PATIENT'S MOTHER'S MAIDEN</strong>
                        </td>
                        <td width="21%"> -</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>RELATION TO PATIENT</strong>
                        </td>
                        <td> Spouse</td>
                        <td>
                          <strong>NAME</strong>
                        </td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>PHONE</strong>
                        </td>
                        <td> (843) 364-9090</td>
                        <td>
                          <strong> </strong>
                        </td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>ADDRESS</strong>
                        </td>
                        <td>-</td>
                        <td>&nbsp;</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                    </table>
                    <div className="gry-heading">FAMILY INFORMATION</div>
                    <table className="gridtbl">
                      <tr>
                        <td width="33%">
                          <strong>NEX OF KIN</strong>
                        </td>
                        <td width="21%">Don Mason</td>
                        <td width="25%">
                          <strong>PATIENT'S MOTHER'S MAIDEN</strong>
                        </td>
                        <td width="21%"> -</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>RELATION TO PATIENT</strong>
                        </td>
                        <td> Spouse</td>
                        <td>
                          <strong>NAME</strong>
                        </td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>PHONE</strong>
                        </td>
                        <td> (843) 364-9090</td>
                        <td>
                          <strong> </strong>
                        </td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>ADDRESS</strong>
                        </td>
                        <td>-</td>
                        <td>&nbsp;</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                    </table>
                    <div className="gry-heading">Vitals for this encounter</div>
                    <table className="gridtbl p-0 m-0 ">
                      <tr className="gry-2 border-top">
                        <td>&nbsp;</td>
                        <td>
                          <strong>
                            08/04/21<br></br>7:58 PM<br></br>
                          </strong>
                        </td>
                      </tr>
                      <tr className="border">
                        <td width="33%" className="border">
                          Weight
                        </td>
                        <td width="25%">
                          {patientEncounter?.patientVitas?.value[0]?.weight_lbs}
                        </td>
                      </tr>
                      <tr className="border">
                        <td className="border">Temperature</td>
                        <td>
                          {
                            patientEncounter?.patientVitas?.value[0]
                              ?.temperatureFahrenheit
                          }
                        </td>
                      </tr>
                      <tr className="border">
                        <td className="border">Pulse</td>
                        <td>
                          {patientEncounter?.patientVitas?.value[0]?.pulse}bpm
                        </td>
                      </tr>
                      <tr className="border">
                        <td className="border">O2 Saturation</td>
                        <td>
                          {
                            patientEncounter?.patientVitas?.value[0]
                              ?.oxygenSaturation
                          }{" "}
                          %
                        </td>
                      </tr>
                      <tr className="border">
                        <td className="border">Blood pressure</td>
                        <td>
                          {" "}
                          {
                            patientEncounter?.patientVitas?.value[0]?.bpSystolic
                          }{" "}
                          mmHg
                        </td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                    </table>
                    <div className="gry-heading">Diagnoses</div>
                    <table className="gridtbl p-0 m-0 ">
                      <tr className="border-top">
                        <td colspan="4">
                          Was diagnosis reconciliation completed<br></br>No
                          selection made
                        </td>
                      </tr>
                      <tr className="border gry-heading">
                        <td width="33%" className="border">
                          Current
                        </td>
                        <td width="12%" className="border">
                          ACUITY
                        </td>
                        <td width="6%" className="border">
                          START
                        </td>
                        <td width="7%" className="border">
                          STOP
                        </td>
                      </tr>
                      <tr className="border">
                        <td className="border">
                          (Z13.820) Encounter for screening for esteoporosis
                        </td>
                        <td>-</td>
                        <td>08/04/2021</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>
                          (N95.1) Menopausal and female climacteric states
                        </td>
                        <td>&nbsp;</td>
                        <td>08/04/2021</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>
                          (R94.6) Abnormal results of thyroid function studies
                        </td>
                        <td>&nbsp;</td>
                        <td>08/04/2021</td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td>(E55.9) Vitamin D deficiency, unspecified</td>
                        <td>&nbsp;</td>
                        <td>08/04/2021</td>
                        <td>-</td>
                      </tr>
                      <tr className="border gry-heading">
                        <td className="border">Historical</td>
                        <td className="border">ACUITY</td>
                        <td className="border">START</td>
                        <td className="border">STOP</td>
                      </tr>
                      <tr>
                        <td>No historical diagnoses</td>
                        <td colspan="3">&nbsp;</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                        <td colspan="3">&nbsp;</td>
                      </tr>
                    </table>
                    <div className="gry-heading">Social history</div>
                    <table className="gridtbl p-0 m-0 ">
                      <tr className="border gry-heading">
                        <td width="33%" className="border">
                          TOBACCO USE
                        </td>
                        <td width="7%" className="border">
                          RECORDED
                        </td>
                      </tr>
                      <tr className="border">
                        <td colspan="2" className="border">
                          No tobacco use history available for this patient
                        </td>
                      </tr>
                      <tr className="border gry-heading">
                        <td className="border">ALCOHOL USE</td>
                        <td className="border">RECORDED</td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          No alcohol use history available for this patient
                        </td>
                      </tr>
                      <tr className="border gry-heading">
                        <td className="border">SOCIAL HISTORY (FREE-TEXT)</td>
                        <td className="border">RECORDED</td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          No socila history (free-text) recorded for this
                          patient
                        </td>
                      </tr>
                      <tr className="border gry-heading">
                        <td className="border">FINANCIAL RESOURCES</td>
                        <td className="border">RECORDED</td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          No financial resources recorded for this patient
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">&nbsp;</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    userEmail: state.userInfo.email,
  };
}
export default connect(mapStateToProps, null)(ClinicalDetailReport);

//// old return method
//   < div
// className = "divblackbghide displayblock"
// style = {{ height: "350vh", marginTop: "-39px" }}
//         >
//   <div
//     className="encounterslider show d-block mt-5 ml-3"
//     id="medicationslider"
//     style={{
//       zIndex: 99999,
//       width: "90%",
//       height: "auto",
//       marginRight: "25px",
//     }}
//   >
//     <div className="row ml-1">
//       <div className="col-lg-12 col-md-12">
//         <div className="row clearfix">
//           <div
//             className="encounterlsidertopbar"
//             style={{ height: "30px", color: "white" }}
//           >
//             Clinical Notes
//             <div className="encounterheading ">
//               <ReactToPrint
//                 trigger={() => (
//                   <a
//                     href
//                     style={{
//                       position: "absolute",
//                       border: "none",
//                       color: "white",
//                       right: 30,
//                       top: 3,
//                       bottom: 30,
//                     }}
//                   >
//                     Print
//                   </a>
//                 )}
//                 content={() => this.componentRef}
//               />
//             </div>
//             <div className=" float-right">
//               <i
//                 className="fa fa-times fontsize18 textwhite cursorpointer"
//                 onClick={this.props.close}
//                 aria-hidden="true"
//                 id=""
//                 style={{ position: "absolute", top: 5, right: 5 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div
//       ref={(el) => (this.componentRef = el)}
//       className="container detail-report"
//       style={{
//         pageBreakBefore: "always",

//         height: "600px",
//         overflow: "scroll",
//       }}
//     >
//       <div
//         className="form-row pt-2 pb-2"
//         ref={(el) => (this.componentRef = el)}
//       >
//         <div className="form-group col-md-2 com-sm-12"></div>
//         <div className="form-group col-12 text-center">
//           <h3>{this.state.practiceData.name}</h3>
//           <h6>
//             <b>Address: </b>
//             {this.state.practiceData.address}
//           </h6>

//           <h6>
//             <b>Phone # :</b>
//             {this.state.practiceData.phoneNumber} &nbsp;{" "}
//             {this.state.practiceData.website ? (
//               <>
//                 {" "}
//                 <b>WebSite</b> {this.state.practiceData.website}{" "}
//               </>
//             ) : null}
//             &nbsp;{" "}
//             {this.state.practiceData.faxNumber ? (
//               <>
//                 {" "}
//                 <b>Fax</b> {this.state.practiceData.faxNumber}{" "}
//               </>
//             ) : null}
//           </h6>
//         </div>
//       </div>
//       {this.state.userdata.map((row) => (
//         <div
//           className="form-row border-bottom"
//           style={{ fontWeight: 400 }}
//         >
//           <div className="form-group col-8 p-0 m-0">
//             <div className="w-100">
//               <h6 className="d-inline">
//                 <b>Patient Name:</b>
//                 {row.patientName}
//               </h6>
//               <h6 className="d-inline pl-2">
//                 <b>DOB:</b> {row.dob} &nbsp;
//                 <b>Age:</b> {row.patientAge} {row.patientGender}
//               </h6>
//             </div>
//             <div className="w-100 pt-1">
//               <h6 className="d-inline">
//                 <b>Address:</b> {row.patientAddress}, {row.patientCity},{" "}
//                 {row.patientState}-{row.patientZipCode}
//               </h6>
//               <h6 className="d-inline pl-2">
//                 <b>Cell #</b> {row.patientphoneNumber}
//               </h6>
//             </div>
//           </div>
//           <div className="form-group col-4 p-0 m-0 text-right ">
//             <div className="w-100">
//               <h6 className="d-inline w-100">
//                 <b>Provider Name:</b> {row.provider}
//               </h6>
//             </div>
//             <div className="w-100 pt-1">
//               <h6 className="d-inline w-100">
//                 <b>Visit Date:</b> {row.visitadate}
//               </h6>
//             </div>
//           </div>
//         </div>
//       ))}

//       <div className="form-row font-weight-normal border-bottom">
//         <div className="form-group col-12 p-0 m-0 detailednotes-greyborder detailednotes-header">
//           <h6 className="pl-2 pt-1">Allergies</h6>
//         </div>
//         <div className="form-group col-12 pl-2 pr-2 pt-2 pb-0 m-0 mb-2 detailednotes-grey-border-topless">
//           <table className="table table-sm font-weight-normal detailednotes-tr-height">
//             <tbody>
//               <>
//                 <tr>
//                   <th scope="col">#</th>
//                   <th scope="col">Allergy Name</th>
//                   <th scope="col">Date</th>
//                   <th scope="col">Allergy Type</th>
//                   <th scope="col">Status</th>
//                   <th scope="col">Reaction</th>
//                   <th scope="col">Severity</th>
//                 </tr>
//                 {this.state.allergies.map((row, index) => (
//                   <tr>
//                     <th scope="row">{index + 1}</th>
//                     <td>{row.allergyName}</td>
//                     <td>{row.addedDate}</td>
//                     <td>{row.allergyType}</td>
//                     <td>{row.status}</td>
//                     <td>{row.reaction}</td>
//                     <td>{row.severity}</td>
//                   </tr>
//                 ))}
//               </>
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div className="form-row font-weight-normal">
//         <div className="form-group col-12 p-0 m-0 detailednotes-greyborder detailednotes-header">
//           <h6 className="pl-2 pt-1">Medication</h6>
//         </div>
//         <div className="form-group col-12 pl-2 pr-2 pt-2 pb-0 m-0 mb-2 detailednotes-grey-border-topless">
//           <table className="table table-sm font-weight-normal detailednotes-tr-height">
//             <tbody>
//               <tr>
//                 <th scope="col">#</th>
//                 <th scope="col">Prescription</th>
//                 <th scope="col">Status</th>
//                 <th scope="col">Date</th>
//                 <th scope="col">Directions</th>
//                 <th scope="col">Expires</th>
//                 <th scope="col">Quantity</th>
//                 <th scope="col">Refills</th>
//               </tr>
//               {this.state.medication &&
//                 this.state.medication.map((row, index) => (
//                   <tr>
//                     {row.isArchive === false ? (
//                       <>
//                         <th scope="row">{index + 1}</th>
//                         <td>{row.prescription}</td>
//                         <td>
//                           {row.isArchive ? "Active" : "In Active"}
//                         </td>
//                         {row.prescriptionSigs &&
//                           row.prescriptionSigs.map((item, index) => (
//                             <>
//                               <td>{item.addedDate}</td>
//                               <td>{item.description}</td>
//                             </>
//                           ))}
//                         <td>{row.expiryDate}</td>
//                         <td>{row.quantity}</td>
//                         <td>{row.refills}</td>
//                       </>
//                     ) : null}
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div className="form-row font-weight-normal border-bottom">
//         <div className="form-group col-12 p-0 m-0 detailednotes-greyborder detailednotes-header">
//           <h6 className="pl-2 pt-1">Vitals</h6>
//         </div>
//         <div className="form-group col-12 pl-2 pr-2 pt-2 pb-0 m-0 mb-2 detailednotes-grey-border-topless">
//           <div className="form-row text-center p-0 m-0 mb-2">
//             <div className="form-group col-2 pb-0 mb-0">
//               <div className="table-responsive">
//                 <table className="table table-bordered table-sm">
//                   <tbody>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Height
//                       </td>
//                       <td>
//                         {this.state.vitals &&
//                           this.state.vitals.height_meter ? (
//                           <>
//                             {this.state.vitals &&
//                               this.state.vitals.height_meter}{" "}
//                             meter
//                           </>
//                         ) : null}
//                         {this.state.vitals &&
//                           this.state.vitals.height_inches ? (
//                           <>
//                             {this.state.vitals &&
//                               this.state.vitals.height_inches}{" "}
//                             in
//                           </>
//                         ) : null}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Weight
//                       </td>
//                       <td>
//                         {this.state.vitals &&
//                           this.state.vitals.weight_lbs ? (
//                           <>
//                             {this.state.vitals &&
//                               this.state.vitals.weight_lbs}{" "}
//                             lbs{" "}
//                           </>
//                         ) : null}
//                         {this.state.vitals &&
//                           this.state.vitals.weight_OZ ? (
//                           <>
//                             {this.state.vitals &&
//                               this.state.vitals.weight_OZ}{" "}
//                             oz{" "}
//                           </>
//                         ) : null}
//                         {this.state.vitals &&
//                           this.state.vitals.weight_Kg ? (
//                           <>
//                             {this.state.vitals &&
//                               this.state.vitals.weight_Kg}{" "}
//                             kg{" "}
//                           </>
//                         ) : null}
//                         {this.state.vitals &&
//                           this.state.vitals.weight_gram ? (
//                           <>
//                             {this.state.vitals &&
//                               this.state.vitals.weight_gram}{" "}
//                             gm{" "}
//                           </>
//                         ) : null}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <div className="form-group col-2 pb-0 mb-0">
//               <div className="table-responsive">
//                 <table className="table table-bordered table-sm">
//                   <tbody>
//                     <tr>
//                       <td className="detailednotes-report-font">BMI</td>
//                       <td width="40%">
//                         {this.state.vitals && this.state.vitals.bmi ? (
//                           <>
//                             {this.state.vitals && this.state.vitals.bmi}{" "}
//                             kg
//                           </>
//                         ) : null}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Head Circumference
//                       </td>
//                       <td>
//                         {this.state.vitals &&
//                           this.state.vitals.headCircumference ? (
//                           <>
//                             {this.state.vitals &&
//                               this.state.vitals.headCircumference}{" "}
//                             lbs
//                           </>
//                         ) : null}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <div className="form-group col-3 pb-0 mb-0">
//               <div className="table-responsive">
//                 <table className="table table-bordered table-sm">
//                   <tbody>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Temperature
//                       </td>
//                       {(this.state.vitals &&
//                         this.state.vitals.temperatureFahrenheit) ||
//                         (this.state.vitals &&
//                           this.state.vitals.temperatureCelsius) ? (
//                         <td>
//                           {this.state.vitals &&
//                             this.state.vitals.temperatureFahrenheit ? (
//                             <>
//                               {this.state.vitals &&
//                                 this.state.vitals
//                                   .temperatureFahrenheit}{" "}
//                               F
//                             </>
//                           ) : (
//                             <>
//                               {this.state.vitals &&
//                                 this.state.vitals
//                                   .temperatureCelsius}{" "}
//                               C
//                             </>
//                           )}
//                         </td>
//                       ) : (
//                         <td></td>
//                       )}
//                     </tr>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Respiratory Rate
//                       </td>
//                       <td>
//                         {this.state.vitals &&
//                           this.state.vitals.respiratory_rate ? (
//                           <>
//                             {this.state.vitals &&
//                               this.state.vitals.respiratory_rate}{" "}
//                             rpm
//                           </>
//                         ) : null}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <div className="form-group col-2 pb-0 mb-0">
//               <div className="table-responsive">
//                 <table className="table table-bordered table-sm">
//                   <tbody>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Pulse
//                       </td>
//                       <td>
//                         {this.state.vitals &&
//                           this.state.vitals.pulse ? (
//                           <>
//                             {this.state.vitals &&
//                               this.state.vitals.pulse}{" "}
//                             bpm
//                           </>
//                         ) : null}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="detailednotes-report-font">BP</td>
//                       {(this.state.vitals &&
//                         this.state.vitals.bpSystolic) ||
//                         (this.state.vitals &&
//                           this.state.vitals.bpDiastolic) ? (
//                         <td>
//                           {this.state.vitals &&
//                             this.state.vitals.bpSystolic ? (
//                             <>
//                               {this.state.vitals &&
//                                 this.state.vitals.bpSystolic}
//                             </>
//                           ) : null}{" "}
//                           /{" "}
//                           {this.state.vitals &&
//                             this.state.vitals.bpDiastolic ? (
//                             <>
//                               {this.state.vitals &&
//                                 this.state.vitals.bpDiastolic}{" "}
//                               mm
//                             </>
//                           ) : null}
//                         </td>
//                       ) : (
//                         <td></td>
//                       )}
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <div className="form-group col-3 pb-0 mb-0">
//               <div className="table-responsive">
//                 <table className="table table-bordered table-sm">
//                   <tbody>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Oxygen Sat
//                       </td>
//                       <td>
//                         {this.state.vitals &&
//                           this.state.vitals.oxygenSaturation ? (
//                           <>{this.state.vitals.oxygenSaturation} %</>
//                         ) : null}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Pulse Oximetry
//                       </td>
//                       <td>
//                         {this.state.vitals &&
//                           this.state.vitals.pulseOximetry ? (
//                           <>{this.state.vitals.pulseOximetry} bpm</>
//                         ) : null}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="form-row font-weight-normal border-bottom">
//         <div className="form-group col-12 p-0 m-0 detailednotes-greyborder detailednotes-header">
//           <h6 className="pl-2 pt-1">Social History</h6>
//         </div>
//         <div className="form-group col-12 pl-2 pr-2 pt-2 pb-0 m-0 mb-2 detailednotes-grey-border-topless">
//           <div className="form-row p-0 m-0">
//             <div className="form-group col-3 pb-0 mb-0">
//               <div className="table-responsive">
//                 <table className="table table-bordered table-sm">
//                   <tbody>
//                     <tr className="text-center">
//                       <td
//                         className="detailednotes-report-font"
//                         colSpan="2"
//                       >
//                         Marital Status
//                       </td>
//                     </tr>
//                     {this.state.socialHistory &&
//                       this.state.socialHistory.homeEnvironment ? (
//                       <tr>
//                         <td className="detailednotes-report-font">
//                           Home Environment
//                         </td>
//                         <td>
//                           {this.state.socialHistory &&
//                             this.state.socialHistory
//                             ? this.state.socialHistory.homeEnvironment
//                             : ""}
//                         </td>
//                       </tr>
//                     ) : null}
//                     {this.state.socialHistory &&
//                       this.state.socialHistory.children ? (
//                       <tr>
//                         <td className="detailednotes-report-font">
//                           Children
//                         </td>
//                         <td>
//                           {this.state.socialHistory &&
//                             this.state.socialHistory
//                             ? this.state.socialHistory.children
//                             : ""}
//                         </td>
//                       </tr>
//                     ) : null}
//                     {this.state.socialHistory &&
//                       this.state.socialHistory.heighestEducation ? (
//                       <tr>
//                         <td className="detailednotes-report-font">
//                           Highest Education
//                         </td>
//                         <td>
//                           {this.state.socialHistory &&
//                             this.state.socialHistory
//                             ? this.state.socialHistory.heighestEducation
//                             : ""}
//                         </td>
//                       </tr>
//                     ) : null}
//                     {this.state.socialHistory &&
//                       this.state.socialHistory.occupation ? (
//                       <tr>
//                         <td className="detailednotes-report-font">
//                           Occupation:
//                         </td>
//                         <td>
//                           {this.state.socialHistory &&
//                             this.state.socialHistory
//                             ? this.state.socialHistory.occupation
//                             : ""}
//                         </td>
//                       </tr>
//                     ) : null}
//                     {this.state.socialHistory &&
//                       this.state.socialHistory.sexualOrientation ? (
//                       <tr>
//                         <td className="detailednotes-report-font">
//                           Sexual Orientation
//                         </td>
//                         <td>
//                           {/* {this.state.socialHistory
//                             ? this.state.socialHistory.sexualOrientation
//                             : ''} */}

//                           {this.state.socialHistory &&
//                             this.state.socialHistory.sexualOrientation.map(
//                               (row2) =>
//                                 row2.id ==
//                                   this.state.socialHistory
//                                     .sexualOrientation
//                                   ? row2.description === "Please Select"
//                                     ? ""
//                                     : row2.description
//                                   : ""
//                             )}
//                         </td>
//                       </tr>
//                     ) : null}
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Gender Identity
//                       </td>
//                       <td>
//                         {/* {this.state.socialHistory
//                             ? this.state.socialHistory.this.state.socialHistory.genderIdentity
//                             : ''} */}
//                         {/* {this.state.socialHistory.genderIdentity
//                                   ? ""
//                                   : genderIdentity} */}

//                         {/* {this.state.socialHistory.genderIdentity.map((row2) =>
//                               row2.id == this.state.socialHistory.genderIdentity
//                                 ? row2.description === "Please Select"
//                                   ? ""
//                                   : row2.description
//                                 : ""
//                             )} */}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <div className="form-group col-3 pb-0 mb-0">
//               <div className="table-responsive">
//                 <table className="table table-bordered table-sm">
//                   <tbody>
//                     <tr>
//                       <td
//                         className="detailednotes-report-font text-center"
//                         colSpan="2"
//                       >
//                         Risk Factors
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Exercise
//                       </td>
//                       <td>
//                         {this.state.socialHistory &&
//                           this.state.socialHistory
//                           ? this.state.socialHistory.excercise
//                           : ""}
//                       </td>
//                     </tr>
//                     {this.state.socialHistory &&
//                       this.state.socialHistory.drugUse ? (
//                       <tr>
//                         <td className="detailednotes-report-font">
//                           Drug Use
//                         </td>
//                         <td>
//                           {this.state.socialHistory &&
//                             this.state.socialHistory
//                             ? this.state.socialHistory.drugUse
//                             : ""}
//                         </td>
//                       </tr>
//                     ) : null}
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Quit Date
//                       </td>
//                       <td>
//                         {this.state.socialHistory &&
//                           this.state.socialHistory
//                           ? this.state.socialHistory.quitDate
//                           : ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Seatbelts:
//                       </td>
//                       <td>
//                         {this.state.socialHistory &&
//                           this.state.socialHistory
//                           ? this.state.socialHistory.seatBelts
//                           : ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Exposure
//                       </td>
//                       <td>
//                         {this.state.socialHistory &&
//                           this.state.socialHistory
//                           ? this.state.socialHistory.exposure
//                           : ""}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <div className="form-group col-3 pb-0 mb-0">
//               <div className="table-responsive">
//                 <table className="table table-bordered table-sm">
//                   <tbody>
//                     <tr>
//                       <td
//                         className="detailednotes-report-font text-center"
//                         colSpan="2"
//                       >
//                         Tobacco/Smoking Use
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Status
//                       </td>
//                       <td>
//                         {/* {this.state.socialHistory
//                             ? this.state.socialHistory.tobaccoStatus
//                             : ''} */}

//                         {/* {this.state.socialHistory.tobaccoStatus.map((row2) =>
//                               row2.id == this.state.socialHistory.tobaccoStatus
//                                 ? row2.description === "Please Select"
//                                   ? ""
//                                   : row2.description
//                                 : ""
//                             )} */}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Tobacco Type
//                       </td>
//                       <td>
//                         {this.state.socialHistory &&
//                           this.state.socialHistory
//                           ? this.state.socialHistory.tobaccoType
//                           : ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Year Started
//                       </td>
//                       <td>
//                         {this.state.socialHistory &&
//                           this.state.socialHistory
//                           ? this.state.socialHistory.yearStarted
//                           : ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Pack(s)/Day
//                       </td>
//                       <td>
//                         {this.state.socialHistory &&
//                           this.state.socialHistory
//                           ? this.state.socialHistory.packPerDay
//                           : ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Start Date
//                       </td>
//                       <td>
//                         {this.state.socialHistory &&
//                           this.state.socialHistory
//                           ? this.state.socialHistory.newStartDate
//                           : ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         End Date
//                       </td>
//                       <td>
//                         {this.state.socialHistory &&
//                           this.state.socialHistory
//                           ? this.state.socialHistory.newEndDate
//                           : ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Tobacco Cessation
//                       </td>
//                       <td>
//                         {this.state.socialHistory &&
//                           this.state.socialHistory
//                           ? this.state.socialHistory.tobaccoCessation
//                           : ""}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <div className="form-group col-3 pb-0 mb-0">
//               <div className="table-responsive">
//                 <table className="table table-bordered table-sm">
//                   <tbody>
//                     <tr>
//                       <td
//                         className="detailednotes-report-font text-center"
//                         colSpan="2"
//                       >
//                         Alcohol/Caffeine Use
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Alcohol Use
//                       </td>
//                       <td>
//                         {this.state.socialHistory &&
//                           this.state.socialHistory
//                           ? this.state.socialHistory.alcoholUse
//                           : ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         Caffeine Use
//                       </td>
//                       <td>
//                         {this.state.socialHistory &&
//                           this.state.socialHistory
//                           ? this.state.socialHistory.caffeineUse
//                           : ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="detailednotes-report-font">
//                         ETOH
//                       </td>
//                       <td>
//                         {this.state.socialHistory &&
//                           this.state.socialHistory
//                           ? this.state.socialHistory.etoh
//                           : ""}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="form-row font-weight-normal border-bottom">
//         <div className="form-group col-12 p-0 m-0 detailednotes-greyborder detailednotes-header">
//           <h6 className="pl-2 pt-1">Immunization</h6>
//         </div>
//         <div className="form-group col-12 pl-2 pr-2 pt-2 pb-0 m-0 mb-2 detailednotes-grey-border-topless">
//           <table className="table table-sm font-weight-normal detailednotes-tr-height">
//             <tbody>
//               <tr>
//                 <th scope="col">#</th>
//                 <th scope="col">Immunization Name</th>
//                 <th scope="col">Date</th>
//                 <th scope="col">Route</th>
//                 <th scope="col">Dose</th>
//                 <th scope="col">Manufacturer Info</th>
//               </tr>

//               {this.state.immunization &&
//                 this.state.immunization.map((row, index) => (
//                   <>
//                     <tr>
//                       <th scope="row">{index + 1}</th>
//                       <td>{row.immunizationName}</td>
//                       <td>{row.addedDate}</td>
//                       <td> {row.routeDescription} </td>
//                       <td>
//                         {row.dose} {row.units}
//                       </td>
//                       <td>{row.manufacturerDetail}</td>
//                     </tr>
//                   </>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div className="form-row font-weight-normal border-bottom">
//         <div className="form-group col-12 p-0 m-0 detailednotes-greyborder detailednotes-header">
//           <h6 className="pl-2 pt-1">Patient Procedure</h6>
//         </div>
//         <div className="form-group col-12 pl-2 pr-2 pt-2 pb-0 m-0 mb-2 detailednotes-grey-border-topless">
//           <table className="table table-sm font-weight-normal detailednotes-tr-height">
//             <tbody>
//               <tr>
//                 <th scope="col">#</th>
//                 <th scope="col">Date</th>
//                 <th scope="col">Code</th>
//                 <th scope="col">Status</th>
//                 <th scope="col">Type</th>
//                 <th scope="col">Description</th>
//               </tr>
//               {this.state.procedure &&
//                 this.state.procedure.map((row, index) => (
//                   <>
//                     {row.status === null ? (
//                       <tr>
//                         <th scope="row">{index + 1}</th>
//                         <td>{this.props.visitDate}</td>
//                         <td>{row.code}</td>

//                         <td>{row.status ? "Active" : "In Active"}</td>
//                         <td>{row.type}</td>
//                         <td
//                           style={{
//                             width: "fixed",
//                           }}
//                         >
//                           {row.description}
//                         </td>
//                       </tr>
//                     ) : null}
//                     {row.status === null ? (
//                       <>
//                         {row.notes ? (
//                           <td colSpan="12">
//                             <b>Notes :</b> {row.note}
//                           </td>
//                         ) : null}{" "}
//                       </>
//                     ) : null}
//                   </>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div className="form-row font-weight-normal border-bottom">
//         <div
//           className="form-group col-12 p-0 m-0 detailednotes-greyborder detailednotes-header"
//           style={{
//             pageBreakBefore: "auto",
//             pageBreakInside: "auto",
//           }}
//         >
//           <h6 className="pl-2 pt-1">Family Health History</h6>
//         </div>
//         <div className="form-group col-12 pl-2 pr-2 pt-2 pb-0 m-0 mb-2 detailednotes-grey-border-topless">
//           <table className="table  table-sm font-weight-normal detailednotes-tr-height">
//             <tbody>
//               <tr>
//                 <th scope="col">#</th>
//                 <th scope="col">Date</th>
//                 <th scope="col">ICD</th>
//                 <th scope="col">Desc</th>
//                 <th scope="col">RelationShip</th>
//               </tr>
//               {this.state.familyHealth &&
//                 this.state.familyHealth.map((row, index) => (
//                   <tr>
//                     <th scope="row">{index + 1}</th>
//                     <td>{row.date}</td>
//                     <td>{row.code}</td>
//                     <td>{row.description}</td>
//                     <td>{row.relationship}</td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div className="form-row font-weight-normal border-bottom">
//         <div className="form-group col-12 p-0 m-0 detailednotes-greyborder detailednotes-header">
//           <h6 className="pl-2 pt-1">Functional And Cognitive Status</h6>
//         </div>
//         <div className="form-group col-12 pl-2 pr-2 pt-2 pb-0 m-0 mb-2 detailednotes-grey-border-topless">
//           <table className="table table-sm font-weight-normal detailednotes-tr-height">
//             <tbody>
//               <tr>
//                 <th scope="col">#</th>
//                 <th scope="col">Module Type</th>
//                 <th scope="col">Date</th>
//                 <th scope="col">Code</th>
//                 <th scope="col">Status</th>
//                 <th scope="col">Code Type</th>
//                 <th scope="col" width="55%">
//                   Desc
//                 </th>
//               </tr>
//               {this.state.FunctionalCognitiveStatus &&
//                 this.state.FunctionalCognitiveStatus.map(
//                   (row, index) => (
//                     <>
//                       <tr>
//                         <th scope="row">{index + 1}</th>
//                         <td>{row.moduleType}</td>
//                         <td>{row.date}</td>
//                         <td>{row.code}</td>
//                         <td>{row.status}</td>
//                         <td>{row.codeType}</td>
//                         <td style={{ textAlign: "justify" }}>
//                           {row.description}
//                         </td>
//                       </tr>
//                       {row.note ? (
//                         <td colSpan="12">
//                           <b>Notes :</b> {row.note}
//                         </td>
//                       ) : null}
//                     </>
//                   )
//                 )}
//               {/* <tr scope="row">
//                   <td>
//                     <b>Notes</b>
//                   </td>
//                   <td colSpan="12">
//                    notee
//                   </td>
//                 </tr> */}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div className="form-row font-weight-normal">
//         <div className="form-group col-12 p-0 m-0 detailednotes-greyborder detailednotes-header">
//           <h6 className="pl-2 pt-1">RFV & HPI</h6>
//         </div>
//         <div className="form-group col-12 pl-2 pr-2 pt-2 pb-0 m-0 mb-2 detailednotes-grey-border-topless">
//           <div className="table-responsive">
//             {(!isNull(this.state.RFV) &&
//               !isNull(this.state.RFV.reasonForVisit)) ||
//               (!isNull(this.state.RFV) &&
//                 !isNull(this.state.RFV.location)) ||
//               (!isNull(this.state.RFV) &&
//                 !isNull(this.state.RFV.timing)) ||
//               (!isNull(this.state.RFV) &&
//                 !isNull(this.state.RFV.severity)) ||
//               (!isNull(this.state.RFV) &&
//                 !isNull(this.state.RFV.duration)) ||
//               (!isNull(this.state.RFV) &&
//                 !isNull(this.state.RFV.modifyingFactors)) ||
//               (!isNull(this.state.RFV) &&
//                 !isNull(this.state.RFV.assosciatedSymptoms)) ? (
//               <table className="table table-sm font-weight-normal detailednotes-tr-height">
//                 <tbody>
//                   <tr>
//                     <th scope="col">Reason For Visit</th>
//                     <th scope="col">Location</th>
//                     <th scope="col">Timing</th>
//                     <th scope="col">Severity</th>
//                     <th scope="col">Duration</th>
//                     <th scope="col">Modifying Factor</th>
//                     <th scope="col">Associated Symptons</th>
//                   </tr>
//                   <tr>
//                     <td>
//                       {!isNull(this.state.RFV) &&
//                         !isNull(this.state.RFV.reasonForVisit)
//                         ? this.state.RFV.reasonForVisit
//                         : ""}
//                     </td>
//                     <td>
//                       {!isNull(this.state.RFV) &&
//                         !isNull(this.state.RFV.location)
//                         ? this.state.RFV.location
//                         : ""}
//                     </td>
//                     <td>
//                       {!isNull(this.state.RFV) &&
//                         !isNull(this.state.RFV.timing)
//                         ? this.state.RFV.timing
//                         : ""}
//                     </td>
//                     <td>
//                       {!isNull(this.state.RFV) &&
//                         !isNull(this.state.RFV.severity)
//                         ? this.state.RFV.severity
//                         : ""}
//                     </td>
//                     <td>
//                       {!isNull(this.state.RFV) &&
//                         !isNull(this.state.RFV.duration)
//                         ? this.state.RFV.duration
//                         : ""}
//                     </td>
//                     <td>
//                       {!isNull(this.state.RFV) &&
//                         !isNull(this.state.RFV.modifyingFactors)
//                         ? this.state.RFV.modifyingFactors
//                         : ""}
//                     </td>
//                     <td>
//                       {!isNull(this.state.RFV) &&
//                         !isNull(this.state.RFV.assosciatedSymptoms)
//                         ? this.state.RFV.assosciatedSymptoms
//                         : ""}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             ) : null}
//           </div>
//           {!isNull(this.state.RFV) &&
//             !isNull(this.state.RFV.context) ? (
//             <div className="form=row d-flex">
//               <strong
//                 style={{ display: "contents", textAlign: "justify" }}
//               >
//                 Context :{" "}
//               </strong>
//               {this.state.RFV.context}
//             </div>
//           ) : null}
//           {!isNull(this.state.RFV) &&
//             !isNull(this.state.RFV.description) ? (
//             <div className="form=row d-flex">
//               <strong style={{ display: "contents" }}>
//                 Description :{" "}
//               </strong>
//               {this.state.RFV.description}
//             </div>
//           ) : null}
//           {!isNull(this.state.RFV) && !isNull(this.state.RFV.report) ? (
//             <div className="form=row d-flex">
//               <strong style={{ width: "80px" }}>HPI : </strong>
//               <div
//                 dangerouslySetInnerHTML={{
//                   __html: this.state.RFV.report,
//                 }}
//               ></div>
//             </div>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   </div>
//         </div >
