import React from "react";
import { callApi } from "../../../../../utils/call-api";
import {
  gender,
  usStates,
  coverage,
  relationship,
  genderidentity,
  sexualorentation,
  ActiveAndIn,
} from "../../../../../utils/dropdownValues";
import { connect } from "react-redux";
import tickImage from "../../../../../asserts/images/svg/check-icon.svg";
import Swal from "sweetalert2";
import { ErrorHandlingMessage } from "../../../../../utils/error-handling-message";
import Select from "react-select";
import MyAutocomplete from "../../../../shared/MyAutoComplete/MyAutocomplete.component";
import isNull from "../../../../../utils/null-checking";
import AddCTMembers from "./AddCTMembers";
import Format from "../../../../../utils/Format";
import PlanDetailPopup from "./PlanDetailPopup";
import moment from "moment";
import { enumUtil } from "../../../../shared/enum";
import toaster from "../../../../shared/toaster";
import ConfirmationPopup from "../../../../shared/ConfirmationModal/ConfirmationPopup";
import { TabAction } from "../../../../../actions/opentab/tabAction";
import { type } from "jquery";
import ReactToPrint from "react-to-print";
import "./demographics.styles.css";

const patientStatus = [
  { value: "Active", display: "Active" },
  { value: "Inactive", display: "Inactive" },
  { value: "Clinical Discharged", display: "Clinical Discharged" },
  { value: "Physician Discharged", display: "Physician Discharged" },
  { value: "Deceased", display: "Deceased" },
];

class Demographics extends React.Component {
  constructor(props) {
    super(props);
    this.patientPlanUrl = process.env.REACT_APP_URL + "/PatientPlan/";

    //Patient Model
    this.patientModel = {
      id: 0,
      accountNum: "",
      medicalRecordNumber: "",
      title: "",
      lastName: "",
      middleInitial: "",
      status: "",
      firstName: "",
      ssn: "",
      dob: "",
      deceasedDate: "",
      gender: "",
      maritalStatus: "",
      race: "",
      ethinicity: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      notes: "",
      email: "",
      practiceID: null,
      locationId: null,
      providerID: null,
      refProviderID: null,
      isDeleted: false,
      isActive: true,
      statementMessage: "",
      ChargeTable: [],
      statement: true,
      batchDocumentID: null,
      pageNumber: "",
      holdStatement: false,
      extension: "",
      phoneNumber: "",
      mobileNumber: "",
      workPhoneNumber: "",
      emailComments: "",
      phoneNumberComments: "",
      phoneNumberExt: "",
      workPhoneNumberComments: "",
      orkPhoneNumberExt: "",
      importMedication: false,
      sendAppointmentSMS: false,
      deceasedPatient: false,
      deceasedDate: "",
      prvDecesdDate: "",
      holdSubmission: false,
      isApiAccess: false,
      isPhrUser: false,
      patientForms: null,
      patientPlans: [],
      patientRacesEthnicity: [],
      patientCareTeam: [],
      patientContact: [],
      patientAdditionalInfo: [],
    };

    this.additionalInfo = {
      id: 0,
      patientid: 0,
      previousname: "",
      countyorparish: "",
      alternatepatientname: "",
      languageability: null,
      mothermaidenlastname: "",
      mothermaidenfirstname: "",
      mothermaidenmi: "",
      mothermaidensuffix: "",
      mothermaidenprefix: "",
      mothermaidenprofessionalsuffix: "",
      languageid: null,
      religionId: null,
      nametypecode: "",
      birthorder: null,
      alternateaddress: "",
      sexualorentation: "",
      multiplebirthindicator: false,

      languageproficiency: null,
      patientsuffix: "",
      patientprefix: "",
      genderidentity: "",
      other: "",
      alternativeadress: "",
      speciescodeid: null,
      registrystatus: "",
      registrystatuseffectivedate: "",
      publicitycodeid: "",
      publicitycodeeffectivedate: "",
      protectionindicatoreffectivedate: "",
      protectionIndicator: "",
      alternatelastname: "",
      alternatefirstname: "",
      alternatemiddleinitial: "",
      alternateaddress1: "",
      alternateaddress2: "",
      alternatecity: "",
      alternatestate: "",
      alternatezipCode: "",
      alternatecountry: "",
      alternatecountryorparishcode: "",
      alternateaddresstype: "",
    };

    this.patientContact = {
      id: 0,
      patientID: null,
      status: "",
      proffesionalsuffix: "",
      inactive: false,
      practiceID: null,
      address1: "",
      address2: "",
      addresstype: "",
      city: "",
      contacttype: "",
      country: "",
      countyorparish: "",
      email: "",
      firstname: "",
      isphrenable: false,
      lastname: "",
      middleinitial: "",
      organizationname: "",
      ext: "",
      phonenumber: "",
      phrusername: "",
      prefix: "",
      relationship: "",
      state: "",
      suffix: "",
      zipcode: "",
      relationshipid: null,
      comments: "",

      //Validation Field

      firstNameValFields: null,
      lastNameValFields: null,
    };

    this.patientPlanModel = {
      patientID: 0,
      id: 0,
      insurancePlanID: null,
      insurancePlanName: "",
      patientID: null,
      coverage: "",
      relationShip: "",
      lastName: "",
      firstName: "",
      middleInitial: "",
      dob: "",
      gender: "",
      address1: "",
      city: "",
      state: "",
      zipCode: "",
      subscriberId: "",
      groupNumber: "",
      groupName: "",
      insurancePlanAddressID: null,
      insurancePlanAddresses: [],
      isActive: true,
      eligibilityStatus: "",
      authRequired: true,
      insurancePlanObject: {},
      commonKey: "",

      //Validation Field
      lastNameValField: null,
      firstNameValField: null,
      coverageValField: null,
      relationshipValField: null,
      subscriberIDValField: null,
      insurancePlanValField: null,
      dobValField: null,
    };

    //Validation Model
    this.validationModel = {
      lastNameValField: "",
      firstNameValField: "",
      ssnValField: "",
      dobValField: "",
      zipCodeValField: "",
      emailVal: "",
      // firstNameValFields:'',
      // lastNameValFields:'',
    };

    // care team
    this.careTeamModel = {
      id: 0,
      patientID: 0,
      name: "",
      status: "",
      careTeamNameValField: "",
    };
    this.state = {
      showDeceasedDate: false,
      PatientNotesLength: 0,
      buttondisable: false,
      patientModel: this.patientModel,
      additionalInfo: this.additionalInfo,
      patientContact: this.patientContact,
      patientPlanModel: this.patientPlanModel,
      validationModel: this.validationModel,
      careTeamModel: this.careTeamModel,
      ptContactList: [],
      editId: this.props.patientId,
      PatInfolabelFlag: false,
      additionalInfo: false,
      loadExtraPatInfoFlag: false,
      InsuranceLableFlag: false,

      addInsurance: false,
      contactlabelFlag: false,
      addOtherAdd: false,
      legalEntitesLabelFlag: false,
      careTeamLabelFlag: false,
      addCareTeam: false,
      pharmacyLabelFlag: false,
      addPharmacy: false,
      emergencyLabelFlag: false,
      addEmergency: false,
      immunizationLabelFlag: false,
      ethnicityLookup: this.props.RaceandEthnicity
        ? this.props.RaceandEthnicity.ethnicityLookup
        : [],
      raceLookup: this.props.RaceandEthnicity
        ? this.props.RaceandEthnicity.raceLookup
        : [],
      languageList: this.props.PreferredLanguage,
      preferLanguage: "",
      patientPlanPri: "",
      patientPlanSec: "",
      LanguageAbility: this.props.Ability,
      LanguageProficiency: this.props.LanguageProficiency,
      Religion: this.props.Religion,
      PtImmunization: this.props.PtImmunization,
      sectionID: null,
      relationShipForContact: this.props.Relationship,
      ptInsruancePlan: [],
      raceByPatientID: [],
      ethinicityByPatientID: [],
      saveClicked: false,
      careTeamPopup: false,
      careTeamId: 0,
      planDetailPopup: false,
      dataForPlan: [],
      ptContactListRowId: null,
      editFlag: true,
      isopen: false,
      deletedIndex: "",
      deletedId: "",
      deleteMethod: "",
      confirmationMessage: "",
      confimationType: "",
      loader: false,
      photoModal: false,
      showPopup: false,
    };
  }

  componentWillMount() {
    this.findPatientByID();
  }

  toggleLoader = (value) => {
    this.setState({ loader: value });
  };
  GetRaceEthnicityByPatient = (id) => {
    callApi("/Patient/GetPatientRacesEthnicity?patientID=" + id)
      .then((res) => {
        if (res) {
          this.setState({
            raceByPatientID: res.patientRace,
            ethinicityByPatientID: res.patientEthnicity,
            patientModel: {
              ...this.state.patientModel,
              patientRacesEthnicity:
                this.state.patientModel.patientRacesEthnicity.concat(
                  res.patientRace,
                  res.patientEthnicity
                ),
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deletepatientplane = (index, id) => {
    if (id > 0) {
      callApi(
        "/Patientplan/DeletePatientPlan?primaryKeyValue=" + id,
        "get",
        null
      )
        .then(() => {
          toaster("Record Deleted Successfully", enumUtil.enumtoaster.warning);
          let ptInsruancePlan = [...this.state.ptInsruancePlan];
          ptInsruancePlan.splice(index, 1);
          this.setState({
            ptInsruancePlan: ptInsruancePlan,
          });
        })
        .catch((error) => {
          ErrorHandlingMessage(error);
        });
    } else {
      toaster("Record Deleted Successfully", enumUtil.enumtoaster.warning);
      let ptInsruancePlan = [...this.state.ptInsruancePlan];
      ptInsruancePlan.splice(index, 1);
      this.setState({
        ptInsruancePlan: ptInsruancePlan,
      });
    }
  };

  getAdditionalInfo = (patientID) => {
    callApi(
      "/Patient/GetPatientAdditionalInfo?patientID=" + patientID,
      "get",
      null
    )
      .then((res) => {
        if (res.length !== 0) {
          this.setState({
            additionalInfo: res[0],
            preferLanguage: res[0].language,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  findPatientContactByPatientID = (patientID) => {
    callApi("/patient/GetPatientContact?patientID=" + patientID, "get", null)
      .then((response) => {
        if (response.length > 0) {
          this.setState({
            ptContactList: response,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  findPatientPlanByPatientID = (patientID) => {
    let newList = [];
    let isPlanExist = [];
    callApi("/patient/findPatientplans/" + patientID, "get", null)
      .then((response) => {
        try {
          if (response.length > 0) {
            let sortedArr = response.sort((a, b) =>
              a.coverage !== b.coverage ? (a.coverage < b.coverage ? -1 : 1) : 0
            );
            sortedArr.map((row) => {
              if (row.coverage === "P" && row.isActive === true) {
                isPlanExist = newList.some(
                  (row) => row.coverage === "P" && row.isActive === true
                );
                if (!isPlanExist) {
                  newList = newList.concat(row);
                }
              }
              if (row.coverage === "S" && row.isActive === true) {
                isPlanExist = newList.some(
                  (row) => row.coverage === "S" && row.isActive === true
                );
                if (!isPlanExist) {
                  newList = newList.concat(row);
                }
              }
              if (row.coverage === "T" && row.isActive === true) {
                isPlanExist = newList.some(
                  (row) => row.coverage === "T" && row.isActive === true
                );
                if (!isPlanExist) {
                  newList = newList.concat(row);
                }
              }
            });
          }

          let filterdata = response.filter(
            (dataresponce) => dataresponce.isActive !== true
          );

          this.setState({ ptInsruancePlan: newList, dataForPlan: filterdata });
        } catch (error) {
          console.log(error);
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  passRowToInsurancePlanParent = (arr) => {
    let activePtPlans = [...this.state.ptInsruancePlan];
    let dataForPlanfortable = [...this.state.dataForPlan];
    let array1 = [...arr];
    try {
      const ElementFromArray = array1.filter((el) => {
        return activePtPlans.filter((ele) => {
          if (
            el.original.coverage === ele.coverage &&
            el.original.isActive !== ele.isActive
          ) {
            return el;
          } else if (el.original.coverage !== ele.coverage) {
            return el;
          }
        });
      });

      let OBJ = {};
      let findEL = -1;
      let inactiveIndex = -1;
      if (ElementFromArray.length > 0) {
        for (let index = 0; index < ElementFromArray.length; index++) {
          OBJ = ElementFromArray[index].original;
          findEL = activePtPlans.findIndex((value) => {
            return (
              value.coverage === OBJ.coverage && value.isActive !== OBJ.isActive
            );
          });
          inactiveIndex = dataForPlanfortable.findIndex((value) => {
            return value.id === OBJ.id;
          });
          dataForPlanfortable.splice(inactiveIndex, 1);

          OBJ.isActive = true;

          if (findEL === -1) {
            this.setState({
              ptInsruancePlan: activePtPlans.concat(OBJ),
              dataForPlan: dataForPlanfortable,
            });
          } else {
            let switchEle = activePtPlans[findEL];
            switchEle.isActive = false;
            activePtPlans[findEL] = OBJ;
            this.setState({
              ptInsruancePlan: activePtPlans,
              dataForPlan: dataForPlanfortable.concat(switchEle),
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  GetCareTeamByPatient = (patientID) => {
    callApi("/Patient/GetPatientCareTeam?patientID=" + patientID, "get", null)
      .then((response) => {
        if (response.length > 0) {
          this.setState({
            patientModel: {
              ...this.state.patientModel,
              patientCareTeam: response,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  findPatientByID = () => {
    const { editId } = this.state;
    let NewPatientmodel = "";
    this.toggleLoader(true);
    callApi("/patient/findPatient/" + editId, "get", null)
      .then((response) => {
        this.toggleLoader(false);
        NewPatientmodel = response[0];
        if (NewPatientmodel) {
          NewPatientmodel.patientPlans = [];
          NewPatientmodel.patientRacesEthnicity = [];
          NewPatientmodel.patientCareTeam = [];
          NewPatientmodel.patientContact = [];
          NewPatientmodel.patientAdditionalInfo = [];
          NewPatientmodel.isApiAccess =
            NewPatientmodel.isPhrUser === true ? true : false;
          this.findPatientPlanByPatientID(NewPatientmodel.id);
          this.getAdditionalInfo(NewPatientmodel.id);
          this.findPatientContactByPatientID(NewPatientmodel.id);
          this.GetRaceEthnicityByPatient(NewPatientmodel.id);
          this.GetCareTeamByPatient(NewPatientmodel.id);
        }
        if (NewPatientmodel.status === "Deceased") {
          this.setState({
            showDeceasedDate: true,
          });
        }
        this.setState({
          patientModel: NewPatientmodel,
          PatientNotesLength: isNull(response[0].notes)
            ? 0
            : response[0].notes.length,
        });
      })
      .catch((error) => {
        console.log(error);
        ErrorHandlingMessage(error);
        this.toggleLoader(false);
      });
  };

  handleLableChange = (LableFlag, id) => {
    if (id !== this.state.sectionID) {
      this.setState({
        [LableFlag]: true,
        sectionID: id,
      });
    } else {
      this.setState({
        [LableFlag]: !this.state[LableFlag],
        sectionID: id,
      });
    }
  };

  handleEditAll = (event, name) => {
    const {
      contactlabelFlag,
      additionalInfoFlag,
      legalEntitesLabelFlag,
      PatInfolabelFlag,
      InsuranceLableFlag,
      careTeamLabelFlag,
      pharmacyLabelFlag,
      emergencyLabelFlag,
      mothermaidenInfoFlag,
      immunizationLabelFlag,
      sectionID,
    } = this.state;
    if (name === "edit") {
      this.setState({
        immunizationLabelFlag: true,
        legalEntitesLabelFlag: true,
        additionalInfoFlag: true,
        PatInfolabelFlag: true,
        contactlabelFlag: true,
        mothermaidenInfoFlag: true,
        emergencyLabelFlag: true,
        careTeamLabelFlag: true,
        editFlag: false,
        InsuranceLableFlag: true,
        pharmacyLabelFlag: true,
        sectionID: 0,
      });
    } else {
      this.setState({
        immunizationLabelFlag: false,
        legalEntitesLabelFlag: false,
        additionalInfoFlag: false,
        PatInfolabelFlag: false,
        contactlabelFlag: false,
        mothermaidenInfoFlag: false,
        emergencyLabelFlag: false,
        careTeamLabelFlag: false,
        InsuranceLableFlag: false,
        pharmacyLabelFlag: false,
        editFlag: true,
        sectionID: 0,
      });
    }

    // this.setState({
    //   InsuranceLableFlag: !InsuranceLableFlag,
    //   careTeamLabelFlag: !careTeamLabelFlag,
    //   pharmacyLabelFlag: !pharmacyLabelFlag,
    //  // emergencyLabelFlag: !emergencyLabelFlag,
    // })
  };

  addMoreFields = (targettedFlag) => {
    this.setState({
      [targettedFlag]: !this.state[targettedFlag],
    });
  };

  addEmergencyRow = (targettedFlag) => {
    let ptContactList = [...this.state.ptContactList];
    let len = ptContactList.length;
    try {
      const patientContactModel = { ...this.state.patientContact };
      patientContactModel.patientID = this.state.patientModel.id;

      if (len === 0) {
        ptContactList = ptContactList.concat(patientContactModel);
        this.setState({
          [targettedFlag]: !this.state[targettedFlag],
          ptContactList: ptContactList,
          emergencyLabelFlag: true,
          sectionID: ptContactList.length - 1,
        });
      } else {
        let validationCount = 0;
        let prevIndex = ptContactList[len - 1];

        if (isNull(prevIndex.firstname)) {
          prevIndex.firstNameValFields = (
            <span className="validationMsg">Enter First Name</span>
          );
          validationCount += 1;
        } else {
          prevIndex.firstNameValFields = null;
        }

        if (isNull(prevIndex.lastname)) {
          prevIndex.lastNameValFields = (
            <span className="validationMsg">Enter Last Name</span>
          );
          validationCount += 1;
        } else {
          prevIndex.lastNameValFields = null;
        }

        if (validationCount > 0) {
          ptContactList[len - 1] = prevIndex;
          this.setState({
            ptContactList: ptContactList,
          });
          this.openConfirmationPopUp(
            "First  Fill All Required Fields of Emergency Contact",
            "error"
          );
          return;
        } else {
          const patientContactModel = { ...this.state.patientContact };
          ptContactList = ptContactList.concat(patientContactModel);

          this.setState({
            [targettedFlag]: !this.state[targettedFlag],
            ptContactList: ptContactList,
            emergencyLabelFlag: true,
            sectionID: ptContactList.length - 1,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  deletePtContact = (index, id) => {
    if (id > 0) {
      callApi(
        "/Patient/DeletePatientContact?primaryKeyValue=" + id,
        "get",
        null
      )
        .then(() => {
          toaster("Record Deleted Successfully", enumUtil.enumtoaster.warning);
          let ptContactList = [...this.state.ptContactList];
          ptContactList.splice(index, 1);
          this.setState({
            ptContactList: ptContactList,
          });
        })
        .catch((error) => {
          ErrorHandlingMessage(error);
        });
    } else {
      toaster("Record Deleted Successfully", enumUtil.enumtoaster.warning);
      let ptContactList = [...this.state.ptContactList];
      ptContactList.splice(index, 1);
      this.setState({
        ptContactList: ptContactList,
      });
    }
  };
  addPlanRow = (targettedFlag) => {
    let ptInsruancePlan = [...this.state.ptInsruancePlan];
    let len = ptInsruancePlan.length;

    try {
      const patientInsruanceModel = { ...this.state.patientPlanModel };
      patientInsruanceModel.patientID = this.state.patientModel.id;

      if (len === 0) {
        ptInsruancePlan = ptInsruancePlan.concat(patientInsruanceModel);

        this.setState({
          [targettedFlag]: !this.state[targettedFlag],
          ptInsruancePlan: ptInsruancePlan,
          InsuranceLableFlag: true,
          sectionID: ptInsruancePlan.length - 1,
        });
      } else {
        let validationCount = 0;
        let prevIndex = ptInsruancePlan[len - 1];

        if (isNull(prevIndex.insurancePlanID)) {
          prevIndex.insurancePlanValField = (
            <span className="validationMsg">Enter plan</span>
          );
          validationCount += 1;
        } else {
          prevIndex.insurancePlanValField = null;
        }

        if (isNull(prevIndex.subscriberId)) {
          prevIndex.subscriberIDValField = (
            <span className="validationMsg">Enter subscriberId</span>
          );
          validationCount += 1;
        } else {
          prevIndex.subscriberIDValField = null;
        }

        if (isNull(prevIndex.lastName)) {
          prevIndex.lastNameValField = (
            <span className="validationMsg">Enter Last Name</span>
          );

          validationCount += 1;
        } else {
          prevIndex.lastNameValField = null;
        }

        //First Name Validation
        if (isNull(prevIndex.firstName)) {
          prevIndex.firstNameValField = (
            <span className="validationMsg">Enter First Name</span>
          );
          validationCount += 1;
        } else {
          prevIndex.firstNameValField = null;
        }
        //Coverage Val Field
        if (isNull(prevIndex.coverage)) {
          prevIndex.coverageValField = (
            <span className="validationMsg">Select Coverage</span>
          );
          validationCount += 1;
        } else {
          prevIndex.coverageValField = null;
        }

        //Relationship Val Field
        if (isNull(prevIndex.relationShip)) {
          prevIndex.relationshipValField = (
            <span className="validationMsg">Select Relationship</span>
          );
          validationCount += 1;
        } else {
          prevIndex.relationshipValField = null;
        }
        ///new requrid

        if (validationCount > 0) {
          ptInsruancePlan[len - 1] = prevIndex;

          this.setState({
            ptInsruancePlan: ptInsruancePlan,
            InsuranceLableFlag: true,
            sectionID: ptInsruancePlan.length - 1,
          });
          this.openConfirmationPopUp(
            "First  Fill All Required Fields of Current Plan",
            "error"
          );
          return;
        } else {
          patientInsruanceModel.patientID = this.state.patientModel.id;
          ptInsruancePlan = ptInsruancePlan.concat(patientInsruanceModel);
          this.setState({
            [targettedFlag]: !this.state[targettedFlag],
            ptInsruancePlan: ptInsruancePlan,
            InsuranceLableFlag: true,
            sectionID: ptInsruancePlan.length - 1,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  addCareTeam = () => {
    let careTeamList = [...this.state.patientModel.patientCareTeam];
    let len = careTeamList.length;
    const careTeam = { ...this.state.careTeamModel };
    careTeam.patientID = this.state.patientModel.id;
    careTeam.status = "Active";
    try {
      if (len === 0) {
        careTeamList = careTeamList.concat(careTeam);
        this.setState({
          //
          sectionID: this.state.patientModel.patientCareTeam.length - 1,
          careTeamLabelFlag: true,
          //
          patientModel: {
            ...this.state.patientModel,
            patientCareTeam: careTeamList,
          },
          sectionID: careTeamList.length - 1,
        });
      } else {
        let validationCount = 0;
        let prevIndex = careTeamList[len - 1];

        if (isNull(prevIndex.name)) {
          prevIndex.careTeamNameValField = (
            <span className="validationMsg">Enter Team Name</span>
          );
          validationCount += 1;
        } else {
          prevIndex.careTeamNameValField = null;
        }
        if (validationCount > 0) {
          careTeamList[len - 1] = prevIndex;

          this.setState({
            ptInsruancePlan: careTeamList,
            InsuranceLableFlag: true,
            sectionID: careTeamList.length - 1,
          });
          this.openConfirmationPopUp("First  Fill Name of Care team", "error");
          return;
        } else {
          careTeam.patientID = this.state.patientModel.id;
          careTeam.status = "Active";
          careTeamList = careTeamList.concat(careTeam);
          this.setState({
            //
            sectionID: this.state.patientModel.patientCareTeam.length - 1,
            careTeamLabelFlag: true,
            //
            patientModel: {
              ...this.state.patientModel,
              patientCareTeam: careTeamList,
            },
            sectionID: careTeamList.length - 1,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  deleteCareTeam = (index, id) => {
    if (id > 0) {
      callApi(
        "/Patient/DeletePatientCareTeam?primaryKeyValue=" + id,
        "get",
        null
      )
        .then(() => {
          toaster("Record Deleted Successfully", enumUtil.enumtoaster.warning);
          let careTeamList = [...this.state.patientModel.patientCareTeam];
          careTeamList.splice(index, 1);
          this.setState({
            patientModel: {
              ...this.state.patientModel,
              patientCareTeam: careTeamList,
            },
          });
        })
        .catch((error) => {
          ErrorHandlingMessage(error);
        });
    } else {
      toaster("Record Deleted Successfully", enumUtil.enumtoaster.warning);
      let careTeamList = [...this.state.patientModel.patientCareTeam];
      careTeamList.splice(index, 1);
      this.setState({
        patientModel: {
          ...this.state.patientModel,
          patientCareTeam: careTeamList,
        },
      });
    }
  };
  careTeamPopup = (id) => {
    if (id > 0) {
      this.setState(
        {
          careTeamId: id,
          careTeamPopup: true,
        }
        //   () => {
        //  //   document.getElementById('careteamslider').scrollIntoView()
        //   },
      );
    } else {
      this.openConfirmationPopUp("Please Save Team First", "error");

      return;
    }
  };
  handleCareTeamClose = () => {
    this.setState({
      careTeamId: 0,
      careTeamPopup: false,
    });
  };
  handlePatChange = (event) => {
    let eventValue = event.target.value;
    let eventName = event.target.name;

    if (
      eventName === "firstName" ||
      "lastName" ||
      "middleInitial" ||
      "gender" ||
      "dob" ||
      "ssn"
    ) {
      this.relationshipEffectChange(eventValue, eventName);
    }

    if (eventValue === "Please Select") {
      eventValue = null;
    } else if (event.target.name === "dob") {
      eventValue = event.target.value;
    } else if (eventValue === "Deceased") {
      this.setState({
        showDeceasedDate: true,
      });
    } else {
      eventValue =
        eventName === "status" ? eventValue : eventValue.toUpperCase();
    }

    this.setState(
      {
        patientModel: {
          ...this.state.patientModel,
          [event.target.name]: eventValue,
        },
      },
      () => {
        if (eventName === "notes") {
          this.setState({
            PatientNotesLength: eventValue.length,
          });
        }
      }
    );
  };
  relationshipEffectChange = (value, name) => {
    let newList = [...this.state.ptInsruancePlan];

    for (let i = 0; i < newList.length; i++) {
      if (newList[i].relationShip === "18") {
        if (name === "firstName") {
          newList[i].firstName = value;
        }
        if (name === "lastName") {
          newList[i].lastName = value;
        }
        if (name === "middleInitial") {
          newList[i].middleInitial = value;
        }
        if (name === "dob") {
          newList[i].dob = value;
        }
        if (name === "ssn") {
          newList[i].ssn = value;
        }
        if (name === "gender") {
          newList[i].gender = value;
        }
      }
    }
    this.setState({
      ptInsruancePlan: newList,
    });
  };

  handlePatContChange = (event, id) => {
    let zip = event.target.value;
    let newList = [...this.state.ptContactList];
    newList[event.target.id][event.target.name] =
      event.target.value === "Please Select"
        ? null
        : event.target.value.toUpperCase();
    this.setState({
      ptContactList: newList,
      ptContactListRowId: id,
    });
    if (event.target.name === "zipcode") {
      if (zip.length >= 5 && zip.length <= 9) {
        callApi("/Common/GetCityStateInfo/" + zip, "get", null)
          .then((response) => {
            newList[event.target.id].city = response.city.toUpperCase();
            newList[event.target.id].state = response.state_id;
            this.setState({
              ptContactList: newList,
            });
          })
          .catch((error) => {
            ErrorHandlingMessage(error);
          });
      }
    }
  };
  handlePatPlanAutoChange = async (event, index) => {
    // let insurancePlanAddresses = []
    // try {
    //   await callApi(
    //     '/InsurancePlanAddress/GetInsurancePlanAddressesByInsurancePlanID/' +
    //       event.id,
    //   )
    //     .then((res) => {
    //       insurancePlanAddresses = res
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // } catch (error) {
    //   console.log(error)
    // }
    let newList = [...this.state.ptInsruancePlan];
    newList[index].insurancePlanName = event === null ? "" : event.label;
    newList[index].insurancePlanID = event === null ? "" : event.id;
    await this.setState({
      ptInsruancePlan: newList,
    });
  };
  handleAddInfoChange = (event) => {
    let eventValue = "";
    if (event.target.name === "protectionIndicator") {
      eventValue = event.target.value;
    } else if (
      event.target.name === "sexualorentation" ||
      event.target.name === "genderidentity"
    ) {
      eventValue = event.target.value;
    } else {
      eventValue =
        event.target.value === "Please Select"
          ? null
          : event.target.value.toUpperCase();
    }
    this.setState({
      additionalInfo: {
        ...this.state.additionalInfo,
        [event.target.name]: eventValue,
      },
    });
  };
  handleNumericCheck(event) {
    if (event.charCode >= 48 && event.charCode <= 57) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  validateModel = () => {
    var myVal = { ...this.validationModel };
    myVal.validation = false;
    let valIndex;
    const patientModelForValidation = { ...this.state.patientModel };

    // Patient Info validation
    if (isNull(patientModelForValidation.lastName)) {
      myVal.lastNameValField = (
        <span className="validationMsg">Enter Last Name</span>
      );
      myVal.validation = true;
    } else {
      myVal.lastNameValField = "";
      if (myVal.validation === false) myVal.validation = false;
    }

    if (isNull(patientModelForValidation.firstName)) {
      myVal.firstNameValField = (
        <span className="validationMsg">Enter First Name</span>
      );
      myVal.validation = true;
    } else {
      myVal.firstNameValField = "";
      if (myVal.validation === false) myVal.validation = false;
    }
    if (!isNull(patientModelForValidation.dob)) {
      if (
        new Date(
          moment(patientModelForValidation.dob).format().slice(0, 10)
        ).getTime() > new Date(moment().format().slice(0, 10)).getTime()
      ) {
        myVal.dobValField = (
          <span className="validationMsg">Future date can't be selected</span>
        );
        myVal.validation = true;
      } else {
        myVal.dobValField = "";
        if (myVal.validation === false) myVal.validation = false;
      }
    } else {
      myVal.dobValField = "";
      if (myVal.validation === false) myVal.validation = false;
    }
    if (
      isNull(patientModelForValidation.zipCode) === false &&
      patientModelForValidation.zipCode.length > 0
    ) {
      if (this.state.patientModel.zipCode.length < 5) {
        myVal.zipCodeValField = (
          <span className="validationMsg">
            Zip should be of alleast 5 digits
          </span>
        );
        myVal.validation = true;
      } else if (
        this.state.patientModel.zipCode.length > 5 &&
        this.state.patientModel.zipCode.length < 9
      ) {
        myVal.zipCodeValField = (
          <span className="validationMsg">
            Zip should be of either 5 or 9 digits
          </span>
        );
        myVal.validation = true;
      } else {
        myVal.zipCodeValField = "";
        if (myVal.validation === false) myVal.validation = false;
      }
    } else {
      myVal.zipCodeValField = "";
      if (myVal.validation === false) myVal.validation = false;
    }
    if (myVal.validation === true) {
      this.setState({ validationModel: myVal, PatInfolabelFlag: true });
      this.openConfirmationPopUp("Fill All Patient Info Fields", "error");
      return true;
    } else {
      myVal.validation = false;
    }
    // // end Patient Info

    //Patient Plans Validation
    let patientPlans = [];
    let patientPlanValidationCount = 0;

    try {
      patientPlans = [...this.state.ptInsruancePlan];
      valIndex = patientPlans.length - 1;

      patientPlans.map((plan, index) => {
        //Last Name Validation
        if (isNull(plan.lastName)) {
          plan.lastNameValField = (
            <span className="validationMsg">Enter Last Name</span>
          );
          patientPlanValidationCount += 1;
          valIndex = index;
        } else {
          plan.lastNameValField = null;
        }
        //First Name Validation
        if (isNull(plan.firstName)) {
          plan.firstNameValField = (
            <span className="validationMsg">Enter First Name</span>
          );
          patientPlanValidationCount += 1;
          valIndex = index;
        } else {
          plan.firstNameValField = null;
        }
        //Coverage Val Field
        if (isNull(plan.coverage)) {
          plan.coverageValField = (
            <span className="validationMsg">Select Coverage</span>
          );
          patientPlanValidationCount += 1;
          valIndex = index;
        } else {
          plan.coverageValField = null;
        }

        //Relationship Val Field
        if (isNull(plan.relationShip)) {
          plan.relationshipValField = (
            <span className="validationMsg">Select Relationship</span>
          );
          patientPlanValidationCount += 1;
          valIndex = index;
        } else {
          plan.relationshipValField = null;
        }

        //Subscriber validation
        if (isNull(plan.subscriberId)) {
          plan.subscriberIDValField = (
            <span className="validationMsg">Enter SubscriberID</span>
          );
          patientPlanValidationCount += 1;
          valIndex = index;
        } else {
          plan.subscriberIDValField = null;
        }

        //Insurance Plan Validation
        if (isNull(plan.insurancePlanID)) {
          plan.insurancePlanValField = (
            <span className="validationMsg">Enter Insurance Plan</span>
          );
          patientPlanValidationCount += 1;
          valIndex = index;
        } else {
          plan.insurancePlanValField = null;
        }

        //dob validation
        if (!isNull(plan.dob)) {
          if (
            new Date(moment(plan.dob).format().slice(0, 10)).getTime() >
            new Date(moment().format().slice(0, 10)).getTime()
          ) {
            plan.dobValField = (
              <span className="validationMsg">
                Future date can't be selected
              </span>
            );
            patientPlanValidationCount += 1;
            valIndex = index;
          } else {
            plan.dobValField = null;
          }
        } else {
          plan.dobValField = null;
        }
      });

      if (patientPlanValidationCount > 0) {
        myVal.validation = true;
        this.openConfirmationPopUp("Fill All Plans Fields", "error");
      } else {
        myVal.validation = false;
      }

      if (myVal.validation === true) {
        this.setState({
          validationModel: myVal,
          InsuranceLableFlag: true,
          sectionID: valIndex,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    // end Patient Plans

    // start patient Contact & Address  fields

    if (
      isNull(patientModelForValidation.email) &&
      patientModelForValidation.isPhrUser
    ) {
      myVal.emailVal = <span className="validationMsg">Enter Email</span>;
      myVal.validation = true;
    } else {
      myVal.emailVal = "";
      if (myVal.validation === false) myVal.validation = false;
    }

    // if (isNull(patientContactForValidation.lastname)) {
    //   myVal.lastNameValFields = (
    //     <span className="validationMsg">Enter last Name</span>
    //   );
    //   myVal.validation = true;
    // } else {
    //   myVal.lastNameValFields = "";
    //   if (myVal.validation === false) myVal.validation = false;
    // }

    if (myVal.validation === true) {
      this.setState({ validationModel: myVal, contactlabelFlag: true });
      this.openConfirmationPopUp("Fill All Contact & Address Fields", "error");
      return true;
    } else {
      myVal.validation = false;
    }

    // // end patientContact filds

    // pt Emergency Contact validation
    let patientContactcheck = [];
    let patientValidationCount = 0;

    try {
      patientContactcheck = [...this.state.ptContactList];
      valIndex = patientContactcheck.length - 1;
      // map ptContactList list
      patientContactcheck.map((contact, index) => {
        //first Name Validation of ptContactList

        if (isNull(contact.firstname)) {
          contact.firstNameValFields = (
            <span className="validationMsg">Enter first Name</span>
          );
          patientValidationCount += 1;
          valIndex = index;
        } else {
          contact.firstNameValFields = null;
        }
        //last Name Validation of ptContactList

        if (isNull(contact.lastname)) {
          contact.lastNameValFields = (
            <span className="validationMsg">Enter Last Name</span>
          );
          patientValidationCount += 1;
          valIndex = index;
        } else {
          contact.lastNameValFields = null;
        }

        // email required check on isphrenabale true or false

        if (contact.isphrenable === true && isNull(contact.email)) {
          contact.emailValFields = (
            <span className="validationMsg">Enter Email</span>
          );
          patientValidationCount += 1;
          valIndex = index;
        } else {
          contact.emailValFields = null;
        }
      });
      // ptContactList

      if (patientValidationCount > 0) {
        myVal.validation = true;
        this.openConfirmationPopUp(
          "Fill All Emergency Contact Fields",
          "error"
        );
      } else {
        myVal.validation = false;
      }
      if (myVal.validation === true) {
        this.setState({
          validationModel: myVal,
          emergencyLabelFlag: true,
          sectionID: valIndex,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    // // end ptContact validation

    // care team validation
    let careTeamList = [...this.state.patientModel.patientCareTeam];
    let careTeamValidationCount = 0;

    try {
      careTeamList.map((team) => {
        if (isNull(team.name)) {
          team.careTeamNameValField = (
            <span className="validationMsg">Enter Team Name</span>
          );
          careTeamValidationCount += 1;
        } else {
          team.careTeamNameValField = null;
        }
      });
      if (careTeamValidationCount > 0) {
        this.openConfirmationPopUp("Fill All Teams", "error");
        myVal.validation = true;
      } else {
        myVal.validation = false;
      }
      if (myVal.validation === true) {
        this.setState({
          validationModel: myVal,
          careTeamLabelFlag: true,
          sectionID: careTeamList.length - 1,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    if (myVal.validation === true) {
      this.setState({ validationModel: myVal });
      return true;
    }
    // // end care team validation
    this.setState({
      saveClicked: false,
    });
  };

  saveCareTeam = (index) => {
    try {
      let patientCareTeamList = [...this.state.patientModel.patientCareTeam];
      let careTeamValidationCount = 0;
      if (isNull(patientCareTeamList[index].name)) {
        patientCareTeamList[index].careTeamNameValField = (
          <span className="validationMsg">Enter Team Name</span>
        );
        careTeamValidationCount += 1;
      } else {
        patientCareTeamList[index].careTeamNameValField = "";
        careTeamValidationCount = 0;
      }

      if (careTeamValidationCount > 0) {
        // Swal.fire("Fill All Teams", "error");
        this.openConfirmationPopUp("Fill All Teams", "error");
        this.setState({
          patientModel: {
            ...this.state.patientModel,
            patientCareTeam: patientCareTeamList,
          },
        });
        return;
      }

      callApi(
        "/Patient/SavePatientCareTeam",
        "post",
        patientCareTeamList[index]
      )
        .then((response) => {
          if (response) {
            patientCareTeamList[index] = response;
            this.setState({
              patientModel: {
                ...this.state.patientModel,
                patientCareTeam: patientCareTeamList,
              },
            });
            toaster("Save Successfully", enumUtil.enumtoaster.success);
          }
        })
        .catch((error) => {
          ErrorHandlingMessage(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  savePatient = (e) => {
    this.toggleLoader(true);
    // if (this.state.saveClicked) {
    //   return
    // }
    // this.setState({
    //   saveClicked: true,
    // })
    let saveModel = { ...this.state.patientModel };
    // let saveModelpatientContact={...this.state.patientContact}

    let additionalInfoModel = { ...this.state.additionalInfo };
    additionalInfoModel.patientid = saveModel.id;
    saveModel.location = null;
    saveModel.provider = null;
    saveModel.refProvider = null;
    saveModel.BatchDocument = null;
    saveModel.patientAdditionalInfo = additionalInfoModel;
    saveModel.patientPlans = [
      ...this.state.ptInsruancePlan,
      ...this.state.dataForPlan,
    ];
    saveModel.patientContact = [...this.state.ptContactList];

    try {
      let newList = [];
      let ethinicity = [...this.state.ethinicityByPatientID];
      let race = [...this.state.raceByPatientID];
      if (saveModel.patientRacesEthnicity.length > 0) {
        for (
          let index = 0;
          index < saveModel.patientRacesEthnicity.length;
          index++
        ) {
          let element = saveModel.patientRacesEthnicity[index];
          if (element.type === "Races") {
            let race1 = race.filter((race) => {
              return race.value == element.value;
            });
            if (race1.length === 0) {
              element.inactive = true;
              newList = newList.concat(element);
            }
          }

          if (element.type === "Ethnicity") {
            let eth1 = ethinicity.filter((eth) => {
              return eth.value === element.value;
            });
            if (eth1.length === 0) {
              element.inactive = true;
              newList = newList.concat(element);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

    var returnValue = this.validateModel();
    if (returnValue === true) {
      this.toggleLoader(false);
      return;
    }

    // for patient udpate it will push changes in redux
    // let patientTabsFromRedux = this.props.OpenDynamicTab.length > 0 ? this.props.OpenDynamicTab : []
    // let arr = patientTabsFromRedux.filter(el => el.data.id === saveModel.id)
    // let obj = {
    //   key: 3,
    //   name: 'Patient',
    //   active: true,
    //   data: {
    //     id: saveModel.id,
    //     name: saveModel.lastName + "," + saveModel.firstName,
    //     class: 'patienttabs btn btn-outline-secondary nav-link',
    //     subTab: arr[0].data.subTab
    //   },
    //   rerender: true
    // }
    callApi("/patient/NewSavePatient/", "post", saveModel)
      .then(async (res) => {
        if (res) {
          // pushing patient changes to redux
          // await this.props.TabAction(obj)
          this.setState({ patientModel: res, saveClicked: false }, () => {
            toaster("Save Successfully", enumUtil.enumtoaster.success);
            this.handleEditAll(e);
            this.toggleLoader(false);
          });
        }
      })
      .catch((error) => {
        this.setState({ saveClicked: false });
        this.toggleLoader(false);

        // ErrorHandlingMessage(error);
      });
  };

  // for all check boxes
  handleCheckBoxes = (e) => {
    if (e.target.name === "multiplebirthindicator") {
      this.setState({
        additionalInfo: {
          ...this.state.additionalInfo,
          [e.target.name]: !this.state.additionalInfo[e.target.name],
        },
      });
    } else {
      this.setState({
        patientModel: {
          ...this.state.patientModel,
          [e.target.name]: !this.state.patientModel[e.target.name],
        },
      });
    }
  };

  onPasteZip = async (event) => {
    let zip = event.target.value;
    // const index = event.target.id
    // const name = event.target.name
    // const value = event.target.value
    // zip = zip.trim()
    // var regex = /^[0-9]+$/
    // if (zip.length == 0) {
    //   this.setState({
    //     patientModel: {
    //       ...this.state.patientModel,
    //       [event.target.name]: zip,
    //     },
    //   })
    //   return
    // }

    // if (!zip.match(regex)) {
    //   Swal.fire('Error', 'Should be Number', 'error')
    //   return
    // } else {
    this.setState({
      patientModel: {
        ...this.state.patientModel,
        [event.target.name]: event.target.value.toUpperCase(),
      },
    });
    // }

    if (zip.length >= 5 && zip.length <= 9) {
      callApi("/Common/GetCityStateInfo/" + zip, "get", null)
        .then((response) => {
          this.setState({
            patientModel: {
              ...this.state.patientModel,
              city: response.city.toUpperCase(),
              state: response.state_id,
            },
          });
        })
        .catch((error) => {
          ErrorHandlingMessage(error);
        });
    }
  };

  handleEthnicityChange = (event, type) => {
    let ethinicityByPatientID = [...this.state.ethinicityByPatientID];
    let raceByPatientID = [...this.state.raceByPatientID];
    let patientRacesEthnicity = [
      ...this.state.patientModel.patientRacesEthnicity,
    ];
    let modelList = [];
    let model = {
      id: 0,
      racesIEthnicityID: null,
      type: "",
      label: "",
      value: "",
    };

    if (event) {
      if (event.length > 0) {
        event.map((row) => {
          model.id = 0;
          model.racesIEthnicityID = row.id;
          model.type = type;
          model.label = row.label;
          model.value = row.value;
          modelList = [...modelList, model];
          model = {};
        });
      }

      try {
        let result = patientRacesEthnicity.filter((o1) =>
          modelList.some((o2) => o1.value === o2.value && o1.type === o2.type)
        );

        let filteredItems = [];
        if (result.length > 0) {
          filteredItems = modelList.filter(
            (item) =>
              item.value !== result[0].value && item.type !== result[0].value
          );
          patientRacesEthnicity = patientRacesEthnicity.concat(filteredItems);
        } else {
          patientRacesEthnicity = patientRacesEthnicity.concat(modelList);
        }
      } catch (error) {
        console.log(error);
      }

      if (type === "Ethnicity") {
        ethinicityByPatientID = modelList;
      }
      if (type === "Races") {
        raceByPatientID = modelList;
      }

      this.setState({
        patientModel: {
          ...this.state.patientModel,
          patientRacesEthnicity: patientRacesEthnicity,
        },
        ethinicityByPatientID: ethinicityByPatientID,
        raceByPatientID: raceByPatientID,
      });
    }
  };

  handleLanguageChange = (event) => {
    if (event === null) {
      this.setState({
        additionalInfo: {
          ...this.state.additionalInfo,
          languageid: null,
        },
        preferLanguage: "",
      });
    } else {
      this.setState({
        additionalInfo: {
          ...this.state.additionalInfo,
          languageid: event.id,
        },
        preferLanguage: event.label,
      });
    }
  };

  handlePatPlanChange = (event) => {
    let newList = [...this.state.ptInsruancePlan];
    let eventName = event.target.name;
    let eventIndex = event.target.id;
    let eventValue = event.target.value;

    newList[eventIndex][eventName] =
      event.target.value === "Please Select" ? null : eventValue.toUpperCase();
    if (eventName === "relationShip") {
      if (eventValue === "18") {
        newList[eventIndex].lastName = this.state.patientModel.lastName;
        newList[eventIndex].firstName = this.state.patientModel.firstName;
        newList[eventIndex].middleInitial =
          this.state.patientModel.middleInitial;
        newList[eventIndex].gender = this.state.patientModel.gender;
        newList[eventIndex].dob = this.state.patientModel.dob;
        newList[eventIndex].ssn = this.state.patientModel.ssn;
      } else {
        newList[eventIndex].lastName = "";
        newList[eventIndex].firstName = "";
        newList[eventIndex].middleInitial = "";
        newList[eventIndex].gender = "";
        newList[eventIndex].dob = "";
        newList[eventIndex].ssn = "";
      }
    } else if (eventName === "isActive") {
      // newList[eventIndex].isActive=this.state.patientModel.isActive
      if (eventValue === "1") {
        newList[eventIndex][eventName] = true;
      } else {
        newList[eventIndex][eventName] = false;
      }
    }

    this.setState({
      ptInsruancePlan: newList,
    });
  };
  handleCareTeamChange = (event) => {
    let newList = [...this.state.patientModel.patientCareTeam];
    newList[event.target.id][event.target.name] =
      event.target.value.toUpperCase();

    this.setState({
      patientModel: {
        ...this.state.patientModel,
        patientCareTeam: newList,
      },
    });
  };
  handleAutoInsChange = async (value, index) => {
    let newList = [...this.state.ptInsruancePlan];
    newList[index].insurancePlanName = value;
    await this.setState({
      ptInsruancePlan: newList,
    });
  };
  saveTeam = () => {
    this.setState({
      careTeamId: 0,
      careTeamPopup: false,
    });
  };

  replace(field, replaceWhat, replaceWith) {
    if (isNull(field)) return field;
    else return field.replace(replaceWhat, replaceWith);
  }

  openPlansPopup = (event) => {
    event.preventDefault();
    this.setState({
      planDetailPopup: true,
    });
  };
  closePlansPopup = () => {
    this.setState({
      planDetailPopup: false,
    });
  };
  onAlternatePasteZip = (event) => {
    let zip = event.target.value;
    this.setState({
      additionalInfo: {
        ...this.state.additionalInfo,
        [event.target.name]: event.target.value.toUpperCase(),
      },
    });
    if (zip.length >= 5 && zip.length <= 9) {
      callApi("/Common/GetCityStateInfo/" + zip, "get", null)
        .then((response) => {
          this.setState({
            additionalInfo: {
              ...this.state.additionalInfo,
              alternatecity: response.city.toUpperCase(),
              alternatestate: response.state_id,
            },
          });
        })
        .catch((error) => {
          ErrorHandlingMessage(error);
        });
    }
  };

  handleEmailRequiredCheck = (rowId, isPhrEnableCheck) => {
    var updateArrayPtContact = this.state.ptContactList.map((el) => {
      if (el.id == rowId) {
        return Object.assign({}, el, { isphrenable: !isPhrEnableCheck });
      }
      return el;
    });
    this.setState({ ptContactList: updateArrayPtContact });
  };
  confirmationPopupHandler = (value) => {
    this.setState({
      isopen: false,
    });
    if (value) {
      this.state.deleteMethod(this.state.deletedIndex, this.state.deletedId);
    } else {
      this.setState({
        deletedIndex: "",
        deletedId: "",
      });
    }
  };
  openConfirmationPopUp = (message, type, index, id, methodName) => {
    this.setState({
      confirmationMessage: message,
      confimationType: type,
      deletedIndex: index,
      deletedId: id,
      deleteMethod: methodName,
      isopen: true,
    });
  };

  showPopupfunc = () => {
    this.setState({
      showPopup: true,
    });
  };

  render() {
    const {
      PatInfolabelFlag,
      loadExtraPatInfoFlag,
      InsuranceLableFlag,
      contactlabelFlag,

      legalEntitesLabelFlag,
      patientModel,
      careTeamLabelFlag,
      additionalInfoFlag,
      mothermaidenInfoFlag,
      emergencyLabelFlag,
      validationModel,
      addEmergency,
      careTeamPopup,
      careTeamId,
      immunizationLabelFlag,
      planDetailPopup,
      dataForPlan,
      additionalInfo,
      languageList,
      isopen,
      loader,
      photoModal,
    } = this.state;
    const { userLocations, userProviders, userRefProviders } = this.props;

    let popup = "";
    if (careTeamPopup) {
      popup = (
        <AddCTMembers
          id={careTeamId}
          onClose={() => this.handleCareTeamClose()}
          patientID={this.state.patientModel.id}
        />
      );
    }
    if (planDetailPopup) {
      popup = (
        <PlanDetailPopup
          planPopup={planDetailPopup}
          onClose={() => this.closePlansPopup()}
          data={dataForPlan}
          disabledbutton={this.state.buttondisable}
          passRowToInsurancePlanParent={this.passRowToInsurancePlanParent}
        />
      );
    }
    if (isopen) {
      popup = (
        <ConfirmationPopup
          close={() => this.setState({ isopen: false })}
          heading={this.state.confirmationMessage}
          error={this.state.confimationType}
          confirmationPopupHandler={this.confirmationPopupHandler}
        />
      );
    }
    if (loader) {
      popup = (
        <div class="loaderbgpopup">
          <div class="loaderdivpopup"></div>
        </div>
      );
    }

    let EmergencyContactSection = (
      <div className="col-lg-6">
        <div className="float-left headingcolums">
          Emergency&nbsp;Cont.&nbsp;&&nbsp;Next&nbsp;of&nbsp;Kin
        </div>

        <div className="row">
          {/* <div className="col-lg-4 col-md-12">
            <div className="form-group">
              <label htmlFor="mothermaidenlastname">Mother's Last Name:</label>
              <input
                className="form-control"
                type="text"
                name="mothermaidenlastname"
                id="mothermaidenlastname"
                value={additionalInfo.mothermaidenlastname}
                onChange={(e) => this.handleAddInfoChange(e)}
                autoComplete="nope"
              />
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <div className="form-group">
              <label htmlFor="mothermaidenmi">Mother's MI Name:</label>
              <input
                className="form-control"
                type="text"
                name="mothermaidenmi"
                id="mothermaidenmi"
                value={additionalInfo.mothermaidenmi}
                onChange={(e) => this.handleAddInfoChange(e)}
                autoComplete="nope"
              />
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <div className="form-group">
              <label htmlFor="mothermaidenfirstname">
                Mother's First Name:
              </label>
              <input
                className="form-control"
                type="text"
                autoComplete="nope"
                name="mothermaidenfirstname"
                id="mothermaidenfirstname"
                value={additionalInfo.mothermaidenfirstname}
                onChange={(e) => this.handleAddInfoChange(e)}
              />
            </div>
          </div> */}
        </div>

        <div className="nokview">
          <div className="margintop10">
            <h6>Emergency Contact</h6>

            {this.state.ptContactList.map((row, index) => {
              let rowId = row.id;
              let isPhrEnableCheck = row.isphrenable;

              return (
                <>
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <b>#{index + 1}</b>{" "}
                    </div>
                    <div
                      className="editiconround d-flex"
                      id="nokinfo"
                      style={{ marginRight: "50px" }}
                    >
                      <i
                        className={
                          "fa fa-pencil editiconcollapse inputfilelableshow " +
                          (emergencyLabelFlag && this.state.sectionID === index
                            ? "displaynone"
                            : "")
                        }
                        onClick={() =>
                          this.handleLableChange("emergencyLabelFlag", index)
                        }
                        style={{ cursor: "pointer" }}
                      ></i>

                      <i
                        className={
                          "fa fa-check editiconcollapse displaynone inputfieldshow " +
                          (emergencyLabelFlag && this.state.sectionID === index
                            ? "displayblock"
                            : "")
                        }
                        onClick={() =>
                          this.handleLableChange("emergencyLabelFlag", index)
                        }
                        style={{ cursor: "pointer" }}
                      ></i>
                      <i
                        className="fa fa-trash ml-2 text-danger"
                        style={{
                          paddingTop: "6px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          this.openConfirmationPopUp(
                            "Are you sure you want to delete the selected Record?",
                            "warning",
                            index,
                            row.id,
                            this.deletePtContact
                          )
                        }
                        data-toggle="modal"
                        href="#warningalert"
                      ></i>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="formtitle">Name:</div>
                      <div className="formdiscription">
                        {row.lastname}
                        &nbsp;
                        {row.middleinitial}
                        &nbsp;
                        {row.firstname}
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="formtitle">Address :</div>
                      <div className="formdiscription maxwidthauto">
                        {row.address1}
                        &nbsp; {row.city}
                        &nbsp;
                        {row.state}&nbsp;
                        {row.zipcode}
                        &nbsp; {row.country}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      "nokedit " +
                      (emergencyLabelFlag && this.state.sectionID === index
                        ? "displayblock"
                        : "")
                    }
                  >
                    <div className="row clearfix">
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="firstname" className="required">
                            First Name:
                          </label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.firstname}
                            name="firstname"
                            id={index}
                            type="text"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                          <div
                            className="invalid-feedback"
                            style={{ paddingLeft: "0px" }}
                          >
                            {row.firstNameValFields}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="middleinitial">Middle Name:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.middleinitial}
                            id={index}
                            name="middleinitial"
                            type="text"
                            maxLength="20"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="email" className="required">
                            Last Name:
                          </label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.lastname}
                            id={index}
                            name="lastname"
                            type="text"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                          <div
                            className="invalid-feedback"
                            style={{ paddingLeft: "0px" }}
                          >
                            {row.lastNameValFields}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="email">Relation to Patient:</label>
                          <select
                            onChange={(e) => this.handlePatContChange(e)}
                            name="relationshipid"
                            id={index}
                            value={row.relationshipid}
                            aria-controls="DataTables_Table_0"
                            className="form-control"
                          >
                            {this.state.relationShipForContact.map((s) => {
                              return (
                                <option key={s.id} value={s.id}>
                                  {s.description}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="suffix">Suffix:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.suffix}
                            id={index}
                            name="suffix"
                            type="text"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="prefix">Prefix:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.prefix}
                            id={index}
                            name="prefix"
                            type="text"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="proffesionalsuffix">
                            Professional Suffix:{" "}
                          </label>

                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.proffesionalsuffix}
                            id={index}
                            name="proffesionalsuffix"
                            type="text"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="email">Address Line 1:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.address1}
                            id={index}
                            name="address1"
                            type="text"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="email">Address Line 2:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.address2}
                            id={index}
                            name="address2"
                            type="text"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                        </div>{" "}
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="email">City:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.city}
                            id={index}
                            name="city"
                            type="text"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="state">State:</label>
                          <select
                            aria-controls="DataTables_Table_0"
                            className="form-control"
                            value={row.state}
                            id={index}
                            name="state"
                            onChange={(e) => this.handlePatContChange(e)}
                          >
                            {usStates.map((s) => (
                              <option key={s.value} value={s.value}>
                                {s.display}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="email">Zip:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.zipcode}
                            id={index}
                            name="zipcode"
                            type="text"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="email">Country:</label>
                          <select
                            value={row.country}
                            id={index}
                            name="country"
                            onChange={(e) => this.handlePatContChange(e)}
                            className="form-control"
                          >
                            <option value="USA">USA</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="phoneNumberExt">Ext #:</label>
                          <input
                            autoComplete="nope"
                            type="text"
                            className="form-control"
                            name="phoneNumberExt"
                            id={index}
                            maxLength="4"
                            value={row.phoneNumberExt}
                            onChange={(event) =>
                              this.handlePatContChange(event)
                            }
                            onKeyPress={(event) =>
                              this.handleNumericCheck(event)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="phonenumber">Phone:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.phonenumber}
                            id={index}
                            name="phonenumber"
                            type="text"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="cellnumber">Mobile:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.cellnumber}
                            id={index}
                            name="cellnumber"
                            type="text"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-12">
                        <label className="fancy-checkbox margintop26">
                          <input
                            autoComplete="nope"
                            type="checkbox"
                            id={row.id}
                            name={row.id}
                            checked={isPhrEnableCheck}
                            onChange={() => {
                              this.handleEmailRequiredCheck(
                                rowId,
                                isPhrEnableCheck
                              );
                            }}
                          />
                          <span>Email Required</span>
                        </label>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <label
                            htmlFor="email"
                            className={row.isphrenable ? "required" : ""}
                          >
                            Email:
                          </label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            type="text"
                            name="email"
                            id={index}
                            onChange={(e) =>
                              this.handlePatContChange(e, row.id)
                            }
                            maxLength="60"
                            value={row.email}
                          />
                          <div
                            className="invalid-feedback"
                            style={{ paddingLeft: "0px" }}
                          >
                            {row.emailValFields}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-12">
                        <div className="form-group">
                          <label htmlFor="comments">Comments :</label>
                          <textarea
                            className="form-control"
                            name="comments"
                            id={index}
                            value={row.comments}
                            onChange={(e) => this.handlePatContChange(e)}
                            rows={1}
                            col={1}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>

        <div className="nextofkinformbutton">
          <a
            data-toggle="modal"
            href="#warningalert"
            className="patienttabs btn btn-orange nav-link active"
            onClick={() => this.addEmergencyRow("addEmergency")}
          >
            <span id="nextofkinformbutton">
              {addEmergency ? "Add Next of Kins" : "Add Next of Kin"}
            </span>
            <span className="paddingleft10">
              <i
                className="fa fa-plus-circle fontawesomehover"
                aria-hidden="true"
              ></i>
            </span>
          </a>
        </div>
      </div>
    );
    let MotherMaidenInfo = (
      <div className="col-lg-6">
        <div className="float-left headingcolums">Mother Maiden Name Info</div>
        <div className="editiconround" id="mothermaideninfo">
          <i
            className={
              "fa fa-pencil editiconcollapse inputfilelableshow " +
              (mothermaidenInfoFlag ? "displaynone" : "")
            }
            onClick={() => this.handleLableChange("mothermaidenInfoFlag")}
            style={{ cursor: "pointer" }}
          ></i>
          <i
            className={
              "fa fa-check editiconcollapse displaynone inputfieldshow " +
              (mothermaidenInfoFlag ? "displayblock" : "")
            }
            onClick={() => this.handleLableChange("mothermaidenInfoFlag")}
            style={{ cursor: "pointer" }}
          ></i>
        </div>
        <div
          className={
            "contactaddview " + (mothermaidenInfoFlag ? "displaynone" : "")
          }
        >
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="formtitle">Mother Name:</div>
              <div className="formdiscription">
                {additionalInfo && additionalInfo.mothermaidenfirstname}
                &nbsp;&nbsp;
                {additionalInfo && additionalInfo.mothermaidenlastname}
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="formtitle">Suffix:</div>
              <div className="formdiscription">
                {additionalInfo.mothermaidensuffix}
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="formtitle">Prefix:</div>
              <div className="formdiscription">
                {additionalInfo.mothermaidenprefix}
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="formtitle">Professional Suffix:</div>
              <div className="formdiscription">
                {additionalInfo.mothermaidenprofessionalsuffix}
              </div>
            </div>
          </div>
        </div>

        <div
          className={
            "contactaddedit " + (mothermaidenInfoFlag ? "displayblock" : "")
          }
        >
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <div className="form-group">
                <label htmlFor="mothermaidenlastname">
                  Mother's Last Name:
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="mothermaidenlastname"
                  id="mothermaidenlastname"
                  value={additionalInfo.mothermaidenlastname}
                  onChange={(e) => this.handleAddInfoChange(e)}
                  autoComplete="nope"
                />
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="form-group">
                <label htmlFor="mothermaidenmi">Mother's MI Name:</label>
                <input
                  className="form-control"
                  type="text"
                  name="mothermaidenmi"
                  id="mothermaidenmi"
                  value={additionalInfo.mothermaidenmi}
                  onChange={(e) => this.handleAddInfoChange(e)}
                  autoComplete="nope"
                />
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="form-group">
                <label htmlFor="mothermaidenfirstname">
                  Mother's First Name:
                </label>
                <input
                  className="form-control"
                  type="text"
                  autoComplete="nope"
                  name="mothermaidenfirstname"
                  id="mothermaidenfirstname"
                  value={additionalInfo.mothermaidenfirstname}
                  onChange={(e) => this.handleAddInfoChange(e)}
                />
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="form-group">
                <label htmlFor="mothermaidensuffix">Suffix:</label>
                <input
                  className="form-control"
                  type="text"
                  autoComplete="nope"
                  name="mothermaidensuffix"
                  id="mothermaidensuffix"
                  value={additionalInfo.mothermaidensuffix}
                  onChange={(e) => this.handleAddInfoChange(e)}
                />
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="form-group">
                <label htmlFor="mothermaidenprefix">Prefix:</label>
                <input
                  className="form-control"
                  type="text"
                  autoComplete="nope"
                  name="mothermaidenprefix"
                  id="mothermaidenprefix"
                  value={additionalInfo.mothermaidenprefix}
                  onChange={(e) => this.handleAddInfoChange(e)}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="form-group">
                <label htmlFor="mothermaidenprofessionalsuffix">
                  Professional Suffix:
                </label>
                <input
                  className="form-control"
                  type="text"
                  autoComplete="nope"
                  name="mothermaidenprofessionalsuffix"
                  id="mothermaidenprofessionalsuffix"
                  value={additionalInfo.mothermaidenprofessionalsuffix}
                  onChange={(e) => this.handleAddInfoChange(e)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="nokview">
          <div className="margintop10">
            <h6>Emergency Contact</h6>

            {this.state.ptContactList.map((row, index) => {
              return (
                <>
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <b>#{index + 1}</b>{' '}
                    </div>
                    <div className="editiconround d-flex" id="nokinfo">
                      <i
                        className={
                          'fa fa-pencil editiconcollapse inputfilelableshow ' +
                          (emergencyLabelFlag && this.state.sectionID === index
                            ? 'displaynone'
                            : '')
                        }
                        
                        onClick={() =>
                          this.handleLableChange('emergencyLabelFlag', index)
                        }
                      ></i>

                      <i
                        className={
                          'fa fa-check editiconcollapse displaynone inputfieldshow ' +
                          (emergencyLabelFlag && this.state.sectionID === index
                            ? 'displayblock'
                            : '')
                        }
                      ></i>
                    </div>
                       <i
                        className="fa fa-trash ml-2"
                        style={{position:"relative",top:"2px",left:"585px"}}
                        onClick={() => this.deletePtContact(index, row.id)}
                      ></i>

                    <div className="col-lg-6 col-md-6">
                      <div className="formtitle">Name:</div>
                      <div className="formdiscription">
                        {row.lastname}
                        &nbsp;
                        {row.middleinitial}
                        &nbsp;
                        {row.firstname}
                      </div>
                    </div>


                    <div className="col-lg-12 col-md-12">
                      <div className="formtitle">Address :</div>
                      <div className="formdiscription maxwidthauto">
                        {row.address1}
                        &nbsp; {row.city}
                        &nbsp;
                        {row.state}&nbsp;
                        {row.zipcode}
                        &nbsp; {row.country}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      'nokedit ' +
                      (emergencyLabelFlag && this.state.sectionID === index
                        ? 'displayblock'
                        : '')
                    }
                  >
                    <div className="row clearfix">
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="firstname">First Name:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.firstname}
                            name="firstname"
                            id={index}
                            type="text"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                          <div
                            className="invalid-feedback"
                            style={{ paddingLeft: '0px' }}
                          >
                            {row.firstNameValFields}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="middleinitial">Middle Name:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.middleinitial}
                            id={index}
                            name="middleinitial"
                            type="text"
                            maxLength="20"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="email">Last Name:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.lastname}
                            id={index}
                            name="lastname"
                            type="text"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                          <div
                            className="invalid-feedback"
                            style={{ paddingLeft: '0px' }}
                          >
                            {row.lastNameValFields}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="email">Relation to Patient:</label>
                          <select
                            onChange={(e) => this.handlePatContChange(e)}
                            name="relationshipid"
                            id={index}
                            value={row.relationshipid}
                            aria-controls="DataTables_Table_0"
                            className="form-control"
                          >
                            {this.state.relationShipForContact.map((s) => {
                              return (
                                <option key={s.id} value={s.id}>
                                  {s.description}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="email">Address Line 1:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.address1}
                            id={index}
                            name="address1"
                            type="text"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="email">Address Line 2:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.address2}
                            id={index}
                            name="address2"
                            type="text"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                        </div>{' '}
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="email">City:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.city}
                            id={index}
                            name="city"
                            type="text"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="state">State:</label>
                          <select
                            aria-controls="DataTables_Table_0"
                            className="form-control"
                            value={row.state}
                            id={index}
                            name="state"
                            onChange={(e) => this.handlePatContChange(e)}
                          >
                            {usStates.map((s) => (
                              <option key={s.value} value={s.value}>
                                {s.display}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="email">Zip:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.zipcode}
                            id={index}
                            name="zipcode"
                            type="text"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="email">Country:</label>
                          <select
                            value={row.country}
                            id={index}
                            name="country"
                            onChange={(e) => this.handlePatContChange(e)}
                            className="form-control"
                          >
                            <option value="1">US</option>
                            <option Selected value="2">
                              USA
                            </option>
                            <option value="3">USA</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="phonenumber">Phone:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.phonenumber}
                            id={index}
                            name="phonenumber"
                            type="text"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label htmlFor="cellnumber">Mobile:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            value={row.cellnumber}
                            id={index}
                            name="cellnumber"
                            type="text"
                            onChange={(e) => this.handlePatContChange(e)}
                          />
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-12">
                        <label className="fancy-checkbox margintop26">
                          <input
                            autoComplete="nope"
                            type="checkbox"
                            id={row.id}
                            name={row.id}
                            checked={
                              this.state.ptContactListRowId === row.id && this.state.isphrenable ?
                                this.state.isphrenable
                                :
                                false
                            }
                            onChange={() => this.handleEmailRequired(row.id)}
                          />
                          <span>
                            Email Required
                          </span>
                        </label>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <label htmlFor="email">Email:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            type="text"
                            name="email"
                            id={index}
                            onChange={(e) => this.handlePatContChange(e, row.id)}
                            maxLength="60"
                            value={row.email}
                          />
                          <div
                            className="invalid-feedback"
                            style={{ paddingLeft: '0px' }}
                          >
                            {row.emailValFields}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-12">
                        <div className="form-group">
                          <label htmlFor="comments">Comments :</label>
                          <textarea
                            className="form-control"
                            name="comments"
                            id={index}
                            value={row.comments}
                            onChange={(e) => this.handlePatContChange(e)}
                            rows={1}
                            col={1}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div> */}

        {/* <div className="nextofkinformbutton">
          <a
            data-toggle="tab"
            className="patienttabs btn btn-outline-secondary nav-link active"
            onClick={() => this.addEmergencyRow('addEmergency')}
          >
            <span id="nextofkinformbutton">
              {addEmergency ? 'Add Next of Kins' : 'Add Next of Kin'}
            </span>
            <span className="paddingleft10">
              <i
                className="fa fa-plus-circle fontawesomehover"
                aria-hidden="true"
              ></i>
            </span>
          </a>
        </div> */}
      </div>
    );

    let InsurancePlanSection = (
      <div className="col-lg-6">
        <div className="row clearfix">
          <div className="float-left headingcolums">Insurance </div>
          {dataForPlan.length > 0 ? (
            <div class="headerLink" id="PatientInfoediticon">
              <a href="/" onClick={(e) => this.openPlansPopup(e)}>
                Show Plans
              </a>
            </div>
          ) : null}

          {this.state.ptInsruancePlan.map((row, index) => {
            return (
              <>
                <div
                  className={
                    "secondryinsurance " +
                    (InsuranceLableFlag && this.state.sectionID === index
                      ? "displayblock"
                      : "")
                  }
                >
                  <div className="row">
                    <div
                      className="editiconround d-flex"
                      id="insuranceedit"
                      style={{ marginRight: "50px" }}
                    >
                      <i
                        className={
                          "fa fa-pencil editiconcollapse secondryinsurance " +
                          (InsuranceLableFlag && this.state.sectionID === index
                            ? "displaynone"
                            : "")
                        }
                        onClick={() =>
                          this.handleLableChange("InsuranceLableFlag", index)
                        }
                        style={{ cursor: "pointer" }}
                      ></i>

                      <i
                        className={
                          "fa fa-check editiconcollapse displaynone primaryinsuranceedit " +
                          (InsuranceLableFlag && this.state.sectionID === index
                            ? "displayblock"
                            : "")
                        }
                        onClick={() =>
                          this.handleLableChange("InsuranceLableFlag", index)
                        }
                        style={{ cursor: "pointer" }}
                      ></i>
                      <i
                        className="fa fa-trash ml-2 text-danger"
                        style={{
                          paddingTop: "6px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          this.openConfirmationPopUp(
                            "Are you sure you want to delete the selected Record?",
                            "warning",
                            index,
                            row.id,
                            this.deletepatientplane
                          )
                        }
                        data-toggle="modal"
                        href="#warningalert"
                      ></i>
                    </div>

                    <div className="col-lg-6 col-md-12">
                      <h6>
                        {" "}
                        {row.coverage === "P"
                          ? "Primary"
                          : row.coverage === "S"
                          ? "Secondary"
                          : row.coverage === "T"
                          ? "Tertiary"
                          : "Other"}
                        &nbsp;Insurance
                      </h6>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 col-md-12">
                      <div className="formtitle">Plan:</div>
                      <div className="formdiscription">
                        {row.insurancePlanName}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="formtitle">Coverage:</div>
                      <div className="formdiscription">
                        {row.coverage === "P"
                          ? "Primary"
                          : row.coverage === "S"
                          ? "Secondry"
                          : row.coverage === "T"
                          ? "TERTIARY"
                          : "Other"}
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                      <div className="formtitle">Subscriber ID:</div>
                      <div className="formdiscription">{row.subscriberId}</div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                      <div className="formtitle">Status:</div>
                      <div className="formdiscription text-success">
                        {row.isActive ? "Active" : "InActive"}
                      </div>
                    </div>
                  </div>

                  <div
                    className={
                      "secondryinsuranceedit " +
                      (InsuranceLableFlag && this.state.sectionID === index
                        ? "displayblock"
                        : "")
                    }
                  >
                    <div className="row clearfix">
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <label htmlFor="email" className="required">
                            Plan:
                          </label>
                          <div>
                            <MyAutocomplete
                              onOptoinSelected={(event) =>
                                this.handlePatPlanAutoChange(event, index)
                              }
                              onOptionCancel={(event) =>
                                this.handlePatPlanAutoChange(event, index)
                              }
                              onChange={(value) =>
                                this.handleAutoInsChange(value, index)
                              }
                              value={row.insurancePlanName}
                              id={row.coverage + patientModel.id}
                              style={{
                                marginLeft: "0px",
                                position: "relative",
                                width: "98%",
                              }}
                              crossIconStyles={{
                                position: "absolute",
                                right: "5px",
                                top: "4px",
                              }}
                              searchIconStyles={{
                                position: "absolute",
                                right: "5px",
                                top: "8px",
                              }}
                              loadingIconStyles={{
                                position: "absolute",
                                right: "0px",
                                top: "3px",
                              }}
                              placeholder="Plan Search..."
                              baseurl={this.patientPlanUrl}
                              api={"GetPatientPlan/" + row.insurancePlanName}
                            ></MyAutocomplete>
                            <div
                              className="invalid-feedback"
                              style={{ paddingLeft: "0px" }}
                            >
                              {row.insurancePlanValField}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <label htmlFor="coverage" className="required">
                            Coverage:
                          </label>
                          <select
                            aria-controls="DataTables_Table_0"
                            className="form-control"
                            id={index}
                            value={row.coverage}
                            onChange={(e) => this.handlePatPlanChange(e)}
                            name="coverage"
                          >
                            {coverage.map((s) => (
                              <option key={s.value} value={s.value}>
                                {s.display}
                              </option>
                            ))}
                          </select>
                          <div
                            className="invalid-feedback"
                            style={{ paddingLeft: "0px" }}
                          >
                            {row.coverageValField}
                          </div>
                        </div>
                      </div>
                      {/*    */}
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <label htmlFor="email" className="required">
                            Relationship:
                          </label>
                          <select
                            aria-controls="DataTables_Table_0"
                            className="form-control"
                            id={index}
                            value={row.relationShip}
                            onChange={(e) => this.handlePatPlanChange(e)}
                            name="relationShip"
                          >
                            {relationship.map((s) => (
                              <option key={s.value} value={s.value}>
                                {s.display}
                              </option>
                            ))}
                          </select>
                          <div
                            className="invalid-feedback"
                            style={{ paddingLeft: "0px" }}
                          >
                            {row.relationshipValField}
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <label htmlFor="subscriberId" className="required">
                            Subscriber ID:
                          </label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            id={index}
                            value={row.subscriberId}
                            onChange={(e) => this.handlePatPlanChange(e)}
                            name="subscriberId"
                            type="text"
                          />
                          <div
                            className="invalid-feedback"
                            style={{ paddingLeft: "0px" }}
                          >
                            {row.subscriberIDValField}
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <label htmlFor="groupNumber">Group Number:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            id={index}
                            value={row.groupNumber}
                            onChange={(e) => this.handlePatPlanChange(e)}
                            name="groupNumber"
                            type="text"
                            maxLength="60"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <label htmlFor="groupName">Group Name:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            id={index}
                            value={row.groupName}
                            onChange={(e) => this.handlePatPlanChange(e)}
                            name="groupName"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <label htmlFor="email">Status</label>
                          <select
                            name="isActive"
                            aria-controls="DataTables_Table_0"
                            className="form-control"
                            id={index}
                            value={row.isActive ? "1" : "0"}
                            onChange={(e) => this.handlePatPlanChange(e)}
                          >
                            <option value="1" selected>
                              Active{" "}
                            </option>
                            <option value="0">In Active </option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <label htmlFor="lastName" className="required">
                            Last Name:
                          </label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            id={index}
                            value={row.lastName}
                            onChange={(e) => this.handlePatPlanChange(e)}
                            name="lastName"
                            type="text"
                            maxLength="25"
                          />
                          <div
                            className="invalid-feedback"
                            style={{ paddingLeft: "0px" }}
                          >
                            {row.lastNameValField}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <label htmlFor="firstName" className="required">
                            First Name:
                          </label>
                          <input
                            autoComplete="nope"
                            maxLength="25"
                            className="form-control"
                            id={index}
                            value={row.firstName}
                            onChange={(e) => this.handlePatPlanChange(e)}
                            name="firstName"
                            type="text"
                          />
                          <div
                            className="invalid-feedback"
                            style={{ paddingLeft: "0px" }}
                          >
                            {row.firstNameValField}
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <label htmlFor="middleInitial">Middle Name:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            id={index}
                            value={row.middleInitial}
                            onChange={(e) => this.handlePatPlanChange(e)}
                            name="middleInitial"
                            type="text"
                            maxLength="20"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <label htmlFor="gender">Gender:</label>
                          <select
                            id={index}
                            value={row.gender}
                            onChange={(e) => this.handlePatPlanChange(e)}
                            name="gender"
                            aria-controls="DataTables_Table_0"
                            className="form-control"
                          >
                            {gender.map((s) => (
                              <option key={s.value} value={s.value}>
                                {s.display}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <label htmlFor="dob">DOB:</label>
                          <input
                            // autoComplete="nope"
                            className="form-control"
                            type="date"
                            min="1900-01-01"
                            max="9999-12-31"
                            name="dob"
                            min="1900-01-01"
                            max="9999-12-31"
                            id={index}
                            value={this.replace(row.dob, "T00:00:00", "")}
                            onChange={(e) => this.handlePatPlanChange(e)}
                          />
                          <div
                            className="invalid-feedback"
                            style={{ paddingLeft: "0px" }}
                          >
                            {row.dobValField}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <label htmlFor="ssn">SSN:</label>
                          <input
                            autoComplete="nope"
                            className="form-control"
                            id={index}
                            value={row.ssn}
                            onChange={(e) => this.handlePatPlanChange(e)}
                            name="ssn"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}

          <div className="row margintop10">
            <div className="col-lg-12">
              <a
                data-toggle="modal"
                href="#warningalert"
                id="primaryinsuadd"
                className="patienttabs btn btn-orange nav-link active"
                onClick={
                  // addInsurance
                  //   ? () => this.savePatient()
                  //   :
                  () => this.addPlanRow("addInsurance")
                }
              >
                <span
                  className="primaryinsuadd"
                  // onClick={
                  // addInsurance
                  //   ? () => this.savePatient()
                  //   :
                  // () => this.addPlanRow('addInsurance')
                  // }
                >
                  {/* {addInsurance ? 'Save' : 'Add Insurance'} */}
                  Add Insurance
                </span>
                <span className="paddingleft10">
                  <i
                    className="fa fa-plus-circle fontawesomehover"
                    aria-hidden="true"
                  ></i>
                </span>
              </a>
              {/* Save Button */}
              {this.state.ptInsruancePlan.length > 0 ? (
                <a
                  data-toggle="tab"
                  id="primaryinsuadd"
                  className="patienttabs btn btn-primary nav-link active"
                  onClick={
                    // addInsurance
                    //   ? () => this.savePatient()
                    () => this.savePatient()
                    //   :
                    // () => this.addPlanRow('addInsurance')
                  }
                  hidden="true"
                >
                  <span
                    className="primaryinsuadd"
                    // onClick={
                    // addInsurance
                    //   ? () => this.savePatient()
                    // () => this.savePatient()
                    //   :
                    // () => this.addPlanRow('addInsurance')
                    // }
                  >
                    {/* {addInsurance ? 'Save' : 'Add Insurance'} */}
                    save
                  </span>
                  <span className="paddingleft10">
                    <i
                      className="fa fa-plus-circle fontawesomehover"
                      aria-hidden="true"
                    ></i>
                  </span>
                </a>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    );

    let alternatePatientInfoSection = (
      <div className="col-lg-6">
        <div className="float-left headingcolums">
          Alternate Patient Information
        </div>
        <div className="editiconround" id="contactaddressinfo">
          <i
            className={
              "fa fa-pencil editiconcollapse inputfilelableshow " +
              (additionalInfoFlag ? "displaynone" : "")
            }
            onClick={() => this.handleLableChange("additionalInfoFlag")}
            style={{ cursor: "pointer" }}
          ></i>
          <i
            className={
              "fa fa-check editiconcollapse displaynone inputfieldshow " +
              (additionalInfoFlag ? "displayblock" : "")
            }
            onClick={() => this.handleLableChange("additionalInfoFlag")}
            style={{ cursor: "pointer" }}
          ></i>
        </div>

        <div
          className={
            "contactaddview " + (additionalInfoFlag ? "displaynone" : "")
          }
        >
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="formtitle">Name:</div>
              <div
                className="formdiscription"
                title={
                  additionalInfo.alternatefirstname +
                  " " +
                  additionalInfo.alternatemiddleinitial +
                  "" +
                  additionalInfo.alternatelastname
                }
              >
                {additionalInfo.alternatefirstname}
                &nbsp;&nbsp;
                {additionalInfo.alternatemiddleinitial}
                &nbsp;&nbsp;
                {additionalInfo.alternatelastname}
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="formtitle">Alternative Suffix:</div>
              <div className="formdiscription">
                {additionalInfo.alternatesuffix}
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="formtitle">Alternative Prefix:</div>
              <div className="formdiscription">
                {additionalInfo.alternateprefix}
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="formtitle">Address 1:</div>
              <div className="formdiscription">
                {additionalInfo.alternateaddress1}
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="formtitle">Address 2:</div>
              <div className="formdiscription">
                {additionalInfo.alternateaddress2}
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="formtitle">Address Type:</div>
              <div className="formdiscription">
                {additionalInfo.alternateaddresstype}
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="formtitle">City:</div>
              <div className="formdiscription">
                {additionalInfo.alternatecity}
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="formtitle">State:</div>
              <div className="formdiscription">
                {additionalInfo.alternatestate}
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="formtitle">Zip:</div>
              <div className="formdiscription">
                {additionalInfo.alternatezipCode}
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="formtitle">Country:</div>
              <div className="formdiscription">
                {additionalInfo.alternatecountry}
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="formtitle">Country or Parish Code::</div>
              <div className="formdiscription">
                {additionalInfo.alternatecountryorparishcode}
              </div>
            </div>
          </div>
        </div>

        <div
          className={
            "contactaddedit " + (additionalInfoFlag ? "displayblock" : "")
          }
        >
          <div className="row clearfix">
            <div className="col-lg-4 col-md-12">
              <div className="form-group">
                <label htmlFor="alternatefirstname">First Name:</label>
                <input
                  autoComplete="nope"
                  className="form-control"
                  value={additionalInfo.alternatefirstname}
                  id="alternatefirstname"
                  name="alternatefirstname"
                  onChange={(event) => this.handleAddInfoChange(event)}
                  type="text"
                />
                <div className="invalid-feedback">
                  {validationModel.firstNameValField}
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="form-group">
                <label htmlFor="alternatemiddleinitial">Middle Name:</label>
                <input
                  autoComplete="nope"
                  className="form-control"
                  value={additionalInfo.alternatemiddleinitial}
                  id="alternatemiddleinitial"
                  name="alternatemiddleinitial"
                  onChange={(event) => this.handleAddInfoChange(event)}
                  maxLength="20"
                  type="text"
                />
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="form-group">
                <label htmlFor="alternatelastname">Last Name:</label>
                <input
                  autoComplete="nope"
                  className="form-control"
                  value={additionalInfo.alternatelastname}
                  id="alternatelastname"
                  name="alternatelastname"
                  onChange={(event) => this.handleAddInfoChange(event)}
                  type="text"
                />
                <div className="invalid-feedback">
                  {validationModel.lastNameValField}
                </div>
              </div>
            </div>

            {/* Alternative Suffix */}

            <div className="col-lg-6 col-md-12">
              <div className="form-group">
                <label htmlFor="alternatesuffix">Alternative Suffix:</label>
                <input
                  autoComplete="nope"
                  className="form-control"
                  id="alternatesuffix"
                  name="alternatesuffix"
                  maxLength="55"
                  value={additionalInfo.alternatesuffix}
                  onChange={(event) => this.handleAddInfoChange(event)}
                  type="text"
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="form-group">
                <label htmlFor="alternateprefix">Alternative Prefix:</label>
                <input
                  autoComplete="nope"
                  className="form-control"
                  id="alternateprefix"
                  name="alternateprefix"
                  maxLength="55"
                  value={additionalInfo.alternateprefix}
                  onChange={(event) => this.handleAddInfoChange(event)}
                  type="text"
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="form-group">
                <label htmlFor="alternateaddress1">Address 1:</label>
                <input
                  autoComplete="nope"
                  className="form-control"
                  id="alternateaddress1"
                  name="alternateaddress1"
                  maxLength="55"
                  value={additionalInfo.alternateaddress1}
                  onChange={(event) => this.handleAddInfoChange(event)}
                  type="text"
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="form-group">
                <label htmlFor="alternateaddress2">Address 2:</label>
                <input
                  autoComplete="nope"
                  className="form-control"
                  id="alternateaddress2"
                  name="alternateaddress2"
                  maxLength="55"
                  value={additionalInfo.alternateaddress2}
                  onChange={(event) => this.handleAddInfoChange(event)}
                  type="text"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="form-group">
                <label htmlFor="alternateaddresstype">Address Type:</label>
                <input
                  autoComplete="nope"
                  className="form-control"
                  id="alternateaddresstype"
                  name="alternateaddresstype"
                  maxLength="55"
                  value={additionalInfo.alternateaddresstype}
                  onChange={(event) => this.handleAddInfoChange(event)}
                  type="text"
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-12">
              <div className="form-group">
                <label htmlFor="alternatecity">City:</label>
                <input
                  autoComplete="nope"
                  className="form-control"
                  id="alternatecity"
                  name="alternatecity"
                  maxLength="30"
                  value={additionalInfo.alternatecity}
                  onChange={(event) => this.handleAddInfoChange(event)}
                  type="text"
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-12">
              <div className="form-group">
                <label htmlFor="alternatecountry">Country:</label>
                <select
                  value={additionalInfo.alternatecountry}
                  id="alternatecountry"
                  name="alternatecountry"
                  onChange={(event) => this.handleAddInfoChange(event)}
                  className="form-control"
                >
                  <option value="1">US</option>
                  <option Selected value="2">
                    USA
                  </option>
                  <option value="3">USA</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="form-group">
                <label htmlFor="alternatestate">State :</label>
                <select
                  aria-controls="DataTables_Table_0"
                  className="form-control"
                  name="alternatestate"
                  id="alternatestate"
                  value={additionalInfo.alternatestate}
                  onChange={(event) => this.handleAddInfoChange(event)}
                >
                  {usStates.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.display}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="form-group">
                <label htmlFor="alternatezipcode">Zip:</label>
                <input
                  autoComplete="nope"
                  type="text"
                  className="form-control"
                  name="alternatezipCode"
                  id="alternatezipCode"
                  maxLength="9"
                  value={additionalInfo.alternatezipCode}
                  onInput={this.onAlternatePasteZip}
                  onKeyPress={(event) => this.handleNumericCheck(event)}
                />
                <div className="invalid-feedback">
                  {validationModel.zipCodeValField}
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="form-group">
                <label htmlFor="alternatecountryorparishcode">
                  Country or Parish Code:
                </label>
                <input
                  autoComplete="nope"
                  className="form-control"
                  id="alternatecountryorparishcode"
                  name="alternatecountryorparishcode"
                  value={additionalInfo.alternatecountryorparishcode}
                  onChange={(event) => this.handleAddInfoChange(event)}
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    let careTeamSection = (
      <div className="col-lg-6">
        <div className="row clearfix">
          <div className="float-left headingcolums">Care Team</div>
          <div className="editiconround d-flex" id="careteaminfo">
            <i
              data-toggle="modal"
              href="#warningalert"
              className="fa fa-plus editiconcollapse inputfilelableshow"
              onClick={() => this.addCareTeam()}
              style={{ cursor: "pointer" }}
            ></i>
          </div>

          <div className="careteamaddview width100 displayblock">
            {this.state.patientModel &&
              this.state.patientModel.patientCareTeam.map((row, index) => {
                return (
                  <div className=" graylink width100">
                    <div className="row">
                      <div className="col-8">
                        <i
                          className="fa fa-hand-o-right"
                          aria-hidden="true"
                        ></i>
                        <b>#{index + 1}</b>{" "}
                        <span
                          id="careteamopenpanel"
                          onClick={() => this.careTeamPopup(row.id)}
                        >
                          Care Team {row.name}
                        </span>
                      </div>
                      <div className="col-4">
                        <i
                          className="ml-5 fa fa-pencil"
                          onClick={() =>
                            this.handleLableChange("careTeamLabelFlag", index)
                          }
                          style={{ cursor: "pointer" }}
                        ></i>

                        <i
                          className="fa fa-trash ml-2 text-danger"
                          data-toggle="modal"
                          href="#warningalert"
                          onClick={() =>
                            this.openConfirmationPopUp(
                              "Are you sure you want to delete the selected Record?",
                              "warning",
                              index,
                              row.id,
                              this.deleteCareTeam
                            )
                          }
                          style={{ cursor: "pointer" }}
                        ></i>
                      </div>
                    </div>

                    <div
                      className={
                        "row " +
                        (careTeamLabelFlag && this.state.sectionID === index
                          ? "displayblock"
                          : "displaynone")
                      }
                    >
                      <div className="col-lg-6 col-md-12">
                        <div className="form-group">
                          <label htmlFor="firstname">Name</label>
                          <div className="d-flex">
                            <input
                              autoComplete="nope"
                              type="text"
                              className="form-control"
                              value={row.name}
                              id={index}
                              name="name"
                              onChange={(event) =>
                                this.handleCareTeamChange(event)
                              }
                            />

                            <button
                              type="submit"
                              className="btn btn-primary ml-2"
                              id="careteamaddpatient"
                              data-toggle="modal"
                              href="#warningalert"
                              onClick={() => this.saveCareTeam(index)}
                            >
                              Save
                            </button>
                          </div>
                          <div className="invalid-feedback">
                            {row.careTeamNameValField}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* <div className="row margintop10 addcareteamformbutton">
          <a
            data-toggle="tab"
            className="patienttabs btn btn-outline-secondary nav-link active"
          >
            <span id="addcareteamformbutton">
              Add Patient Care Team Members
            </span>

            <span className="paddingleft10">
              <i
                className="fa fa-plus-circle fontawesomehover"
                aria-hidden="true"
              ></i>
            </span>
          </a>
        </div> */}
      </div>
    );

    return (
      <>
        <div className="tab-pane" id="Demography">
          <div className="card">
            <div className="body">
              <div className="">
                <div className="row clearfix">
                  <div className="col-12"></div>
                </div>
                <div className="row clearfix">
                  <div className="col-12">
                    <div className="bg-clear">
                      <div>
                        <div className="tab-content mt-0">
                          <div
                            className="tab-pane active show"
                            id="patientinfo"
                          >
                            <div className="row">
                              <div className="col-md-12">
                                <div className="bd-example" data-example-id="">
                                  <div
                                    id="accordion"
                                    role="tablist"
                                    aria-multiselectable="true"
                                    className="height100vh"
                                  >
                                    <div className="row demographicheightscroll">
                                      <div className="demographic-button">
                                        <button
                                          type="button"
                                          className="btn btn-primary right_toggle float-right buttonslim"
                                          data-toggle="modal"
                                          href="#warningalert"
                                          onClick={() => this.savePatient()}
                                        >
                                          Save
                                        </button>
                                        <button
                                          type="submit"
                                          className="btn btn-outline-danger right_toggle float-right buttonslim"
                                          onClick={(event) =>
                                            this.handleEditAll(event, "cancel")
                                          }
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          hidden={
                                            this.state.editFlag ? false : true
                                          }
                                          type="button"
                                          className="btn btn-outline-secondary right_toggle float-right buttonslim"
                                          onClick={(event) =>
                                            this.handleEditAll(event, "edit")
                                          }
                                        >
                                          Edit All
                                        </button>
                                        <button
                                          onClick={this.showPopupfunc}
                                          className="btn btn-outline-success right_toggle float-right buttonslim"
                                        >
                                          Print
                                        </button>
                                      </div>
                                      <div className="col-lg-6">
                                        <div className="row clearfix">
                                          <div className="float-left headingcolums">
                                            Patient Info
                                          </div>
                                          <div
                                            className="editiconround"
                                            id="PatientInfoediticon"
                                          >
                                            <i
                                              className={
                                                "fa fa-pencil editiconcollapse inputfilelableshow " +
                                                (PatInfolabelFlag
                                                  ? "displaynone"
                                                  : "")
                                              }
                                              onClick={() =>
                                                this.handleLableChange(
                                                  "PatInfolabelFlag"
                                                )
                                              }
                                              style={{ cursor: "pointer" }}
                                            ></i>
                                            <i
                                              className={
                                                "fa fa-check editiconcollapse displaynone inputfieldshow " +
                                                (PatInfolabelFlag
                                                  ? "displayblock"
                                                  : "")
                                              }
                                              onClick={() =>
                                                this.handleLableChange(
                                                  "PatInfolabelFlag"
                                                )
                                              }
                                              style={{ cursor: "pointer" }}
                                            ></i>
                                          </div>

                                          <div
                                            className={
                                              "inputfilelableshow " +
                                              (PatInfolabelFlag
                                                ? "displaynone"
                                                : "")
                                            }
                                          >
                                            <div className="row">
                                              <div className="col-lg-6 col-md-12">
                                                <div className="formtitle">
                                                  MRN:
                                                </div>
                                                <div className="formdiscription">
                                                  {patientModel &&
                                                    patientModel.medicalRecordNumber}
                                                </div>
                                              </div>
                                              <div className="col-lg-6 col-md-12">
                                                <div className="formtitle">
                                                  Name:
                                                </div>
                                                <div
                                                  className="formdiscription"
                                                  title={
                                                    patientModel &&
                                                    patientModel.firstName +
                                                      " " +
                                                      patientModel &&
                                                    patientModel.lastName
                                                  }
                                                >
                                                  {patientModel &&
                                                    patientModel.firstName}
                                                  &nbsp;&nbsp;
                                                  {patientModel &&
                                                    patientModel.lastName}
                                                </div>
                                              </div>

                                              <div className="col-lg-6 col-md-12">
                                                <div className="formtitle">
                                                  Race:
                                                </div>
                                                <div className="formdiscription">
                                                  {this.state.raceByPatientID.map(
                                                    (options) =>
                                                      options.value + ","
                                                  )}
                                                </div>
                                              </div>
                                              <div className="col-lg-6 col-md-12">
                                                <div className="formtitle">
                                                  Ethnicity:
                                                </div>
                                                <div className="formdiscription">
                                                  {this.state.ethinicityByPatientID.map(
                                                    (options) =>
                                                      options.value + ","
                                                  )}
                                                </div>
                                              </div>
                                              <div className="col-lg-6 col-md-12">
                                                <div className="formtitle">
                                                  Sex:
                                                </div>
                                                <div className="formdiscription">
                                                  {gender.map((s) =>
                                                    patientModel &&
                                                    patientModel.gender ===
                                                      s.value
                                                      ? s.display === "Select"
                                                        ? ""
                                                        : s.display
                                                      : ""
                                                  )}
                                                </div>
                                              </div>
                                              <div className="col-lg-6 col-md-12">
                                                <div className="formtitle">
                                                  Status:
                                                </div>
                                                <div className="formdiscription">
                                                  {patientModel &&
                                                    patientModel.status}
                                                </div>
                                              </div>
                                              <div className="col-lg-6 col-md-12">
                                                <div className="formtitle">
                                                  DOB:
                                                </div>
                                                <div className="formdiscription">
                                                  {patientModel &&
                                                  patientModel.dob
                                                    ? Format(
                                                        patientModel &&
                                                          patientModel.dob,
                                                        "mm-dd-yyyy"
                                                      )
                                                    : ""}
                                                </div>
                                              </div>
                                              <div className="col-lg-6 col-md-12">
                                                <div className="formtitle">
                                                  Deceased P:
                                                </div>
                                                <div className="formdiscription">
                                                  No
                                                </div>
                                              </div>
                                              <div className="col-lg-6 col-md-12">
                                                <div className="formtitle">
                                                  SS #:
                                                </div>
                                                <div className="formdiscription">
                                                  {patientModel &&
                                                    patientModel.ssn}
                                                </div>
                                              </div>
                                              <div className="col-lg-6 col-md-12">
                                                <div className="formtitle">
                                                  Preferred Language:
                                                </div>
                                                <div className="formdiscription">
                                                  {languageList &&
                                                    languageList.map((s) =>
                                                      !isNull(
                                                        additionalInfo.languageid
                                                      )
                                                        ? s.id ===
                                                          additionalInfo.languageid
                                                          ? s.label
                                                          : ""
                                                        : ""
                                                    )}
                                                </div>
                                              </div>
                                              <div className="col-lg-6 col-md-12">
                                                <div className="formtitle">
                                                  Sexual Orientation:
                                                </div>
                                                <div className="formdiscription">
                                                  {sexualorentation.map(
                                                    (codes) =>
                                                      this.state.additionalInfo
                                                        .sexualorentation ==
                                                      codes.value
                                                        ? codes.display ===
                                                          "Select"
                                                          ? ""
                                                          : codes.display
                                                        : ""
                                                  )}
                                                </div>
                                              </div>
                                              <div className="col-lg-6 col-md-12">
                                                <div className="formtitle">
                                                  Gender Identity:
                                                </div>
                                                <div className="formdiscription">
                                                  {genderidentity.map((codes) =>
                                                    this.state.additionalInfo
                                                      .genderidentity ==
                                                    codes.value
                                                      ? codes.display ===
                                                        "Please Select"
                                                        ? ""
                                                        : codes.display
                                                      : ""
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          <div
                                            className={
                                              "inputfieldshow " +
                                              (PatInfolabelFlag
                                                ? "displayblock"
                                                : "")
                                            }
                                          >
                                            <div className="row">
                                              <div className="col-lg-3 col-md-12">
                                                <div className="form-group">
                                                  <label htmlFor="medicalRecordNumber">
                                                    MRN:
                                                  </label>
                                                  <input
                                                    autoComplete="nope"
                                                    type="text"
                                                    className="form-control"
                                                    disabled
                                                    value={
                                                      patientModel &&
                                                      patientModel.medicalRecordNumber
                                                    }
                                                    id="medicalRecordNumber"
                                                    name="medicalRecordNumber"
                                                    onChange={(event) =>
                                                      this.handlePatChange(
                                                        event
                                                      )
                                                    }
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-3 col-md-12">
                                                <div className="form-group">
                                                  <label
                                                    htmlFor="firstName"
                                                    class="required"
                                                  >
                                                    First Name:
                                                  </label>
                                                  <input
                                                    autoComplete="nope"
                                                    className="form-control"
                                                    value={
                                                      patientModel &&
                                                      patientModel.firstName
                                                    }
                                                    id="firstName"
                                                    name="firstName"
                                                    onChange={(event) =>
                                                      this.handlePatChange(
                                                        event
                                                      )
                                                    }
                                                    type="text"
                                                  />
                                                  <div className="invalid-feedback">
                                                    {
                                                      validationModel.firstNameValField
                                                    }
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="col-lg-3 col-md-12">
                                                <div className="form-group">
                                                  <label htmlFor="middleInitial">
                                                    Middle Name:
                                                  </label>
                                                  <input
                                                    autoComplete="nope"
                                                    className="form-control"
                                                    value={
                                                      patientModel &&
                                                      patientModel.middleInitial
                                                    }
                                                    id="middleInitial"
                                                    name="middleInitial"
                                                    onChange={(event) =>
                                                      this.handlePatChange(
                                                        event
                                                      )
                                                    }
                                                    maxLength="20"
                                                    type="text"
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-3 col-md-12">
                                                <div className="form-group">
                                                  <label
                                                    htmlFor="lastName"
                                                    class="required"
                                                  >
                                                    Last Name:
                                                  </label>
                                                  <input
                                                    autoComplete="nope"
                                                    className="form-control"
                                                    value={
                                                      patientModel &&
                                                      patientModel.lastName
                                                    }
                                                    id="lastName"
                                                    name="lastName"
                                                    onChange={(event) =>
                                                      this.handlePatChange(
                                                        event
                                                      )
                                                    }
                                                    type="text"
                                                  />
                                                  <div className="invalid-feedback">
                                                    {
                                                      validationModel.lastNameValField
                                                    }
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="col-lg-6 col-md-12">
                                                <div className="row">
                                                  <div className="col-lg-6 col-md-12">
                                                    <div className="form-group">
                                                      <label htmlFor="email">
                                                        Sex:
                                                      </label>
                                                      <select
                                                        id="gender"
                                                        name="gender"
                                                        aria-controls="DataTables_Table_0"
                                                        className="form-control"
                                                        value={
                                                          patientModel &&
                                                          patientModel.gender
                                                        }
                                                        onChange={(event) =>
                                                          this.handlePatChange(
                                                            event
                                                          )
                                                        }
                                                      >
                                                        {gender.map((s) => (
                                                          <option
                                                            key={s.value}
                                                            value={s.value}
                                                          >
                                                            {s.display}
                                                          </option>
                                                        ))}
                                                      </select>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-6 col-md-12">
                                                    <div className="form-group">
                                                      <label htmlFor="genderidentity">
                                                        Gender Identity:
                                                      </label>
                                                      <select
                                                        aria-controls="DataTables_Table_0"
                                                        className="form-control"
                                                        name="genderidentity"
                                                        id="genderidentity"
                                                        value={
                                                          additionalInfo.genderidentity
                                                        }
                                                        onChange={(e) =>
                                                          this.handleAddInfoChange(
                                                            e
                                                          )
                                                        }
                                                      >
                                                        {genderidentity.map(
                                                          (s) => (
                                                            <option
                                                              key={s.value}
                                                              value={s.value}
                                                            >
                                                              {s.display}
                                                            </option>
                                                          )
                                                        )}
                                                      </select>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="col-lg-3 col-md-12">
                                                <div className="form-group">
                                                  <label htmlFor="dob">
                                                    DOB:
                                                  </label>
                                                  <div className="input-group">
                                                    <div className="input-group-prepend">
                                                      {/* <span className="input-group-text">
                                                        <i className="fa fa-calendar"></i>
                                                      </span> */}
                                                    </div>
                                                    <input
                                                      // autoComplete="nope"
                                                      // data-provide="datepicker"
                                                      // data-date-autoclose="true"
                                                      className="form-control"
                                                      min="1900-01-01"
                                                      max="9999-12-31"
                                                      name="dob"
                                                      id="dob"
                                                      value={this.replace(
                                                        patientModel &&
                                                          patientModel.dob,
                                                        "T00:00:00",
                                                        ""
                                                      )}
                                                      type="date"
                                                      onChange={(event) =>
                                                        this.handlePatChange(
                                                          event
                                                        )
                                                      }
                                                    />
                                                    <div className="invalid-feedback">
                                                      {
                                                        validationModel.dobValField
                                                      }
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="col-lg-3 col-md-12">
                                                <div className="form-group">
                                                  <label htmlFor="ssn">
                                                    SSN:
                                                  </label>
                                                  <div className="input-group">
                                                    <div className="input-group-prepend">
                                                      <span className="input-group-text">
                                                        <i className="fa fa-eye"></i>
                                                      </span>
                                                    </div>
                                                    <input
                                                      autoComplete="nope"
                                                      className="form-control"
                                                      type="text"
                                                      name="ssn"
                                                      id="ssn"
                                                      maxLength="9"
                                                      value={
                                                        patientModel &&
                                                        patientModel.ssn
                                                      }
                                                      onKeyPress={(event) =>
                                                        this.handleNumericCheck(
                                                          event
                                                        )
                                                      }
                                                      onChange={(event) =>
                                                        this.handlePatChange(
                                                          event
                                                        )
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="col-lg-12 col-md-12">
                                                <div className="row">
                                                  <div className="col-lg-6 col-md-12">
                                                    <div className="form-group">
                                                      <label htmlFor="email">
                                                        Race:
                                                      </label>
                                                      <div className="displayflex">
                                                        <Select
                                                          value={
                                                            this.state
                                                              .raceByPatientID
                                                          }
                                                          defaultValue={[]}
                                                          isMulti
                                                          name="colors"
                                                          options={
                                                            this.state
                                                              .raceLookup
                                                          }
                                                          onChange={(e) =>
                                                            this.handleEthnicityChange(
                                                              e,
                                                              "Races"
                                                            )
                                                          }
                                                          className="basic-multi-select"
                                                          classNamePrefix="select"
                                                          styles={{
                                                            // control: (defaultStyles) => ({
                                                            //   ...defaultStyles,
                                                            //   boxShadow: 'none',
                                                            //   borderColor: '#eb788f',
                                                            //   '&:hover': {
                                                            //     borderColor: '#eb788f',
                                                            //   },
                                                            // }),
                                                            container: (
                                                              defaultStyles
                                                            ) => ({
                                                              ...defaultStyles,
                                                              width: "400px",
                                                            }),
                                                            clearIndicator: (
                                                              defaultStyles
                                                            ) => ({
                                                              ...defaultStyles,
                                                              color: "#286881",
                                                            }),
                                                          }}
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>

                                                  <div className="col-lg-6 col-md-12">
                                                    <div className="form-group">
                                                      <label htmlFor="email">
                                                        Ethnicity:
                                                      </label>
                                                      <div className="displayflex">
                                                        <Select
                                                          value={
                                                            this.state
                                                              .ethinicityByPatientID
                                                          }
                                                          defaultValue={[]}
                                                          isMulti
                                                          name="colors"
                                                          options={
                                                            this.state
                                                              .ethnicityLookup
                                                          }
                                                          onChange={(e) =>
                                                            this.handleEthnicityChange(
                                                              e,
                                                              "Ethnicity"
                                                            )
                                                          }
                                                          className="basic-multi-select"
                                                          classNamePrefix="select"
                                                          styles={{
                                                            // control: (defaultStyles) => ({
                                                            //   ...defaultStyles,
                                                            //   boxShadow: 'none',
                                                            //   borderColor: '#eb788f',
                                                            //   '&:hover': {
                                                            //     borderColor: '#eb788f',
                                                            //   },
                                                            // }),
                                                            container: (
                                                              defaultStyles
                                                            ) => ({
                                                              ...defaultStyles,
                                                              width: "400px",
                                                            }),
                                                            clearIndicator: (
                                                              defaultStyles
                                                            ) => ({
                                                              ...defaultStyles,
                                                              color: "#286881",
                                                            }),
                                                          }}
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-6 col-md-12">
                                                    <div className="form-group">
                                                      <label htmlFor="languageid">
                                                        Preferred Language:
                                                      </label>
                                                      <MyAutocomplete
                                                        onOptoinSelected={(
                                                          event
                                                        ) =>
                                                          this.handleLanguageChange(
                                                            event
                                                          )
                                                        }
                                                        onOptionCancel={(
                                                          event
                                                        ) =>
                                                          this.handleLanguageChange(
                                                            event
                                                          )
                                                        }
                                                        onChange={(value) =>
                                                          this.setState({
                                                            preferLanguage:
                                                              value,
                                                          })
                                                        }
                                                        value={
                                                          this.state
                                                            .preferLanguage
                                                        }
                                                        id={
                                                          patientModel &&
                                                          "languageSearch" +
                                                            patientModel.id
                                                        }
                                                        style={{
                                                          marginLeft: "0px",
                                                          position: "relative",
                                                          width: "98%",
                                                        }}
                                                        crossIconStyles={{
                                                          position: "absolute",
                                                          right: "5px",
                                                          top: "4px",
                                                        }}
                                                        searchIconStyles={{
                                                          position: "absolute",
                                                          right: "5px",
                                                          top: "8px",
                                                        }}
                                                        loadingIconStyles={{
                                                          position: "absolute",
                                                          right: "0px",
                                                          top: "3px",
                                                        }}
                                                        placeholder="Language Search..."
                                                        options={
                                                          this.state
                                                            .languageList
                                                        }
                                                      ></MyAutocomplete>
                                                    </div>
                                                  </div>

                                                  <div className="col-lg-6 col-md-12">
                                                    <div className="form-group">
                                                      <label htmlFor="sexualorentation">
                                                        Sexual Orientation:
                                                      </label>
                                                      <select
                                                        aria-controls="DataTables_Table_0"
                                                        className="form-control"
                                                        name="sexualorentation"
                                                        id="sexualorentation"
                                                        value={
                                                          additionalInfo.sexualorentation
                                                        }
                                                        onChange={(e) =>
                                                          this.handleAddInfoChange(
                                                            e
                                                          )
                                                        }
                                                      >
                                                        {sexualorentation.map(
                                                          (s) => (
                                                            <option
                                                              key={s.value}
                                                              value={s.value}
                                                            >
                                                              {s.display}
                                                            </option>
                                                          )
                                                        )}
                                                      </select>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>

                                            <div
                                              className={
                                                "patientinfomore" +
                                                " " +
                                                (loadExtraPatInfoFlag
                                                  ? "displayblock displaynone"
                                                  : "")
                                              }
                                            >
                                              <div className="row">
                                                <div className="col-lg-4 col-md-12">
                                                  <div className="form-group">
                                                    <label htmlFor="patientprefix">
                                                      Prefix:
                                                    </label>
                                                    <input
                                                      autoComplete="nope"
                                                      className="form-control"
                                                      type="text"
                                                      id="patientprefix"
                                                      name="patientprefix"
                                                      value={
                                                        additionalInfo.patientprefix
                                                      }
                                                      onChange={(e) =>
                                                        this.handleAddInfoChange(
                                                          e
                                                        )
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-lg-4 col-md-12">
                                                  <div className="form-group">
                                                    <label htmlFor="patientsuffix">
                                                      Suffix:
                                                    </label>
                                                    <input
                                                      autoComplete="nope"
                                                      className="form-control"
                                                      type="text"
                                                      id="patientsuffix"
                                                      name="patientsuffix"
                                                      value={
                                                        additionalInfo.patientsuffix
                                                      }
                                                      onChange={(e) =>
                                                        this.handleAddInfoChange(
                                                          e
                                                        )
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-lg-4 col-md-12">
                                                  <div className="form-group">
                                                    <label htmlFor="previousname">
                                                      Previous Name:
                                                    </label>
                                                    <input
                                                      autoComplete="nope"
                                                      className="form-control"
                                                      type="text"
                                                      id="previousname"
                                                      name="previousname"
                                                      value={
                                                        additionalInfo.previousname
                                                      }
                                                      onChange={(e) =>
                                                        this.handleAddInfoChange(
                                                          e
                                                        )
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-lg-4 col-md-12">
                                                  <div className="form-group">
                                                    <label htmlFor="alternatepatientname">
                                                      Alternate Patient Name:
                                                    </label>

                                                    <input
                                                      autoComplete="nope"
                                                      className="form-control"
                                                      id="alternatepatientname"
                                                      name="alternatepatientname"
                                                      value={
                                                        additionalInfo.alternatepatientname
                                                      }
                                                      onChange={(e) =>
                                                        this.handleAddInfoChange(
                                                          e
                                                        )
                                                      }
                                                      type="text"
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-lg-4 col-md-12">
                                                  <div className="form-group">
                                                    <label htmlFor="email">
                                                      Language Proficiency:
                                                    </label>
                                                    <select
                                                      aria-controls="DataTables_Table_0"
                                                      className="form-control"
                                                      name="languageproficiency"
                                                      id="languageproficiency"
                                                      value={
                                                        additionalInfo.languageproficiency
                                                      }
                                                      onChange={(e) =>
                                                        this.handleAddInfoChange(
                                                          e
                                                        )
                                                      }
                                                    >
                                                      {this.state
                                                        .LanguageProficiency &&
                                                        this.state.LanguageProficiency.map(
                                                          (s) => (
                                                            <option
                                                              key={s.id}
                                                              value={s.id}
                                                            >
                                                              {s.description}
                                                            </option>
                                                          )
                                                        )}
                                                    </select>
                                                  </div>
                                                </div>

                                                <div className="col-lg-4 col-md-12">
                                                  <div className="form-group">
                                                    <label htmlFor="languageability">
                                                      Language Ability:
                                                    </label>
                                                    <select
                                                      aria-controls="DataTables_Table_0"
                                                      className="form-control"
                                                      name="languageability"
                                                      id="languageability"
                                                      value={
                                                        additionalInfo.languageability
                                                      }
                                                      onChange={(e) =>
                                                        this.handleAddInfoChange(
                                                          e
                                                        )
                                                      }
                                                    >
                                                      {this.state.LanguageAbility.map(
                                                        (s) => (
                                                          <option
                                                            key={s.id}
                                                            value={s.id}
                                                          >
                                                            {s.description}
                                                          </option>
                                                        )
                                                      )}
                                                    </select>
                                                  </div>
                                                </div>

                                                <div className="col-lg-4 col-md-12">
                                                  <div className="form-group">
                                                    <label htmlFor="countyorparish">
                                                      Country of Parish:
                                                    </label>
                                                    <input
                                                      autoComplete="nope"
                                                      className="form-control"
                                                      id="countyorparish"
                                                      name="countyorparish"
                                                      value={
                                                        additionalInfo.countyorparish
                                                      }
                                                      onChange={(event) =>
                                                        this.handleAddInfoChange(
                                                          event
                                                        )
                                                      }
                                                      type="text"
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-lg-4 col-md-12">
                                                  <div className="form-group">
                                                    <label htmlFor="religionId">
                                                      Religion:
                                                    </label>
                                                    <select
                                                      aria-controls="DataTables_Table_0"
                                                      className="form-control"
                                                      name="religionId"
                                                      id="religionId"
                                                      value={
                                                        additionalInfo.religionId
                                                      }
                                                      onChange={(e) =>
                                                        this.handleAddInfoChange(
                                                          e
                                                        )
                                                      }
                                                    >
                                                      {this.state.Religion.map(
                                                        (s) => (
                                                          <option
                                                            key={s.id}
                                                            value={s.id}
                                                          >
                                                            {s.description}
                                                          </option>
                                                        )
                                                      )}
                                                    </select>
                                                  </div>
                                                </div>
                                                <div className="col-lg-4 col-md-12">
                                                  <div className="form-group">
                                                    <label htmlFor="nametypecode">
                                                      Name Type Code:
                                                    </label>
                                                    <input
                                                      autoComplete="nope"
                                                      className="form-control"
                                                      id="nametypecode"
                                                      name="nametypecode"
                                                      value={
                                                        additionalInfo.nametypecode
                                                      }
                                                      onChange={(event) =>
                                                        this.handleAddInfoChange(
                                                          event
                                                        )
                                                      }
                                                      type="text"
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-lg-4 col-md-12">
                                                  <div className="form-group">
                                                    <label htmlFor="birthorder">
                                                      Birth Order:
                                                    </label>
                                                    <input
                                                      autoComplete="nope"
                                                      className="form-control"
                                                      id="birthorder"
                                                      name="birthorder"
                                                      value={
                                                        additionalInfo.birthorder
                                                      }
                                                      onChange={(event) =>
                                                        this.handleAddInfoChange(
                                                          event
                                                        )
                                                      }
                                                      type="text"
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-lg-4 col-md-12">
                                                  <div className="form-group">
                                                    <label htmlFor="status">
                                                      Status:
                                                    </label>
                                                    <select
                                                      id="status"
                                                      name="status"
                                                      aria-controls="DataTables_Table_0"
                                                      className="form-control"
                                                      value={
                                                        patientModel &&
                                                        patientModel.status
                                                      }
                                                      onChange={(event) =>
                                                        this.handlePatChange(
                                                          event
                                                        )
                                                      }
                                                    >
                                                      {patientStatus.map(
                                                        (s) => (
                                                          <option
                                                            key={s.value}
                                                            value={s.value}
                                                          >
                                                            {s.display}
                                                          </option>
                                                        )
                                                      )}
                                                    </select>
                                                  </div>
                                                </div>

                                                {this.state.showDeceasedDate &&
                                                patientModel.status ===
                                                  "Deceased" ? (
                                                  <div className="col-lg-4 col-md-12">
                                                    <div className="form-group">
                                                      <label htmlFor="dob">
                                                        Deceased Date:
                                                      </label>
                                                      <div className="input-group">
                                                        <div className="input-group-prepend">
                                                          {/* <span className="input-group-text">
                                                        <i className="fa fa-calendar"></i>
                                                      </span> */}
                                                        </div>
                                                        <input
                                                          // autoComplete="nope"
                                                          // data-provide="datepicker"
                                                          // data-date-autoclose="true"
                                                          className="form-control"
                                                          min="1900-01-01"
                                                          max={Format(
                                                            new Date(),
                                                            "yyyy-mm-dd"
                                                          )}
                                                          name="deceasedDate"
                                                          id="deceasedDate"
                                                          value={this.replace(
                                                            patientModel &&
                                                              patientModel.deceasedDate,
                                                            "T00:00:00",
                                                            ""
                                                          )}
                                                          type="date"
                                                          onChange={(event) =>
                                                            this.handlePatChange(
                                                              event
                                                            )
                                                          }
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                ) : (
                                                  ""
                                                )}

                                                <div className="col-lg-4 col-md-12">
                                                  <label className="fancy-checkbox margintop26">
                                                    <input
                                                      autoComplete="nope"
                                                      type="checkbox"
                                                      id="multiplebirthindicator"
                                                      name="multiplebirthindicator"
                                                      checked={
                                                        additionalInfo.multiplebirthindicator
                                                      }
                                                      onChange={
                                                        this.handleCheckBoxes
                                                      }
                                                    />
                                                    <span>
                                                      Multiple Birth Indicator
                                                    </span>
                                                  </label>
                                                </div>
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div
                                                className="col-lg-6 col-md-12 moreinfo cursorpointer bluelink"
                                                id="moreinfoid"
                                                onClick={() =>
                                                  this.addMoreFields(
                                                    "loadExtraPatInfoFlag"
                                                  )
                                                }
                                              >
                                                {loadExtraPatInfoFlag
                                                  ? "Less Info"
                                                  : "More Info"}
                                              </div>
                                              {loadExtraPatInfoFlag ? (
                                                <div className="col-lg-6 col-md-12">
                                                  <a
                                                    data-toggle="tab"
                                                    id="addprevadd"
                                                    className="patienttabs btn btn-primary nav-link active"
                                                    onClick={() =>
                                                      this.savePatient()
                                                    }
                                                  >
                                                    <span className="addprevadd">
                                                      Save
                                                    </span>
                                                    <span className="paddingleft10">
                                                      <i
                                                        className="fa fa-plus-circle fontawesomehover"
                                                        aria-hidden="true"
                                                      ></i>
                                                    </span>
                                                  </a>
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {InsurancePlanSection}
                                      <div className="col-lg-6">
                                        <div className="float-left headingcolums">
                                          Contact & Address
                                        </div>
                                        <div
                                          className="editiconround"
                                          id="contactaddressinfo"
                                        >
                                          <i
                                            className="fa fa-pencil editiconcollapse inputfilelableshow"
                                            className={
                                              "fa fa-pencil editiconcollapse inputfilelableshow " +
                                              (contactlabelFlag
                                                ? "displaynone"
                                                : "")
                                            }
                                            onClick={() =>
                                              this.handleLableChange(
                                                "contactlabelFlag",
                                                333
                                              )
                                            }
                                            style={{ cursor: "pointer" }}
                                          ></i>
                                          <i
                                            className={
                                              "fa fa-check editiconcollapse displaynone inputfieldshow " +
                                              (contactlabelFlag
                                                ? "displayblock"
                                                : "")
                                            }
                                            onClick={() =>
                                              this.handleLableChange(
                                                "contactlabelFlag",
                                                333
                                              )
                                            }
                                            style={{ cursor: "pointer" }}
                                          ></i>
                                        </div>

                                        <div
                                          className={
                                            "contactaddview " +
                                            (contactlabelFlag
                                              ? "displaynone"
                                              : "")
                                          }
                                        >
                                          <h6>Current Address</h6>
                                          <div className="row">
                                            <div className="col-lg-6 col-md-12">
                                              <div className="formtitle">
                                                Address 1:
                                              </div>
                                              <div className="formdiscription maxwidthauto">
                                                {patientModel &&
                                                  patientModel.address1}
                                              </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                              <div className="formtitle">
                                                Address 2:
                                              </div>
                                              <div className="formdiscription maxwidthauto">
                                                {patientModel &&
                                                  patientModel.address2}
                                              </div>
                                            </div>

                                            <div className="col-lg-6 col-md-12">
                                              <div className="formtitle">
                                                City:
                                              </div>
                                              <div className="formdiscription">
                                                {patientModel &&
                                                  patientModel.city}
                                              </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                              <div className="formtitle">
                                                State:
                                              </div>
                                              <div className="formdiscription">
                                                {patientModel &&
                                                  patientModel.state}
                                              </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                              <div className="formtitle">
                                                Zip:
                                              </div>
                                              <div className="formdiscription">
                                                {patientModel &&
                                                  patientModel.zipCode}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="margintop10">
                                            <h6>Contact Info</h6>
                                            <div className="row">
                                              <div className="col-lg-6 col-md-12">
                                                <div className="formtitle">
                                                  Home #:
                                                </div>
                                                <div className="formdiscription">
                                                  {patientModel &&
                                                    patientModel.phoneNumber}
                                                </div>
                                              </div>
                                              <div className="col-lg-6 col-md-12">
                                                <div className="formtitle">
                                                  Mobile #:
                                                </div>
                                                <div className="formdiscription">
                                                  {patientModel &&
                                                    patientModel.mobileNumber}
                                                </div>
                                              </div>
                                              <div className="col-lg-6 col-md-12">
                                                <div className="formtitle">
                                                  Work #:
                                                </div>
                                                <div className="formdiscription">
                                                  {patientModel &&
                                                    patientModel.workPhoneNumber}
                                                </div>
                                              </div>
                                              <div className="col-lg-6 col-md-12">
                                                <div className="formtitle">
                                                  Email:
                                                </div>
                                                <div
                                                  className="formdiscription"
                                                  title={
                                                    patientModel &&
                                                    patientModel.email
                                                  }
                                                >
                                                  {patientModel &&
                                                    patientModel.email}
                                                </div>
                                              </div>
                                              <div className="col-lg-6 col-md-12">
                                                <div className="float-left">
                                                  Preferred communication:
                                                </div>
                                                <div className="formdiscription">
                                                  Mobile
                                                </div>
                                              </div>
                                              <div className="col-lg-6 col-md-12">
                                                <div className="float-left">
                                                  Email Reminders:
                                                </div>
                                                <div className="checkiconclick">
                                                  <img
                                                    src={tickImage}
                                                    style={{ width: "11px" }}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-6 col-md-12">
                                                <div className="float-left">
                                                  SMS Reminders:
                                                </div>
                                                <div className="checkiconclick">
                                                  {patientModel &&
                                                  patientModel.sendAppointmentSMS ? (
                                                    <img
                                                      src={tickImage}
                                                      style={{ width: "11px" }}
                                                    />
                                                  ) : null}
                                                  {patientModel &&
                                                  patientModel.sendAppointmentSMS
                                                    ? "Yes"
                                                    : "No"}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div
                                          className={
                                            "contactaddedit " +
                                            (contactlabelFlag
                                              ? "displayblock"
                                              : "")
                                          }
                                        >
                                          <h6>Current Address</h6>
                                          <div className="row clearfix">
                                            <div className="col-lg-6 col-md-12">
                                              <div className="form-group">
                                                <label htmlFor="address1">
                                                  Address Line 1:
                                                </label>
                                                <input
                                                  autoComplete="nope"
                                                  className="form-control"
                                                  id="address1"
                                                  name="address1"
                                                  maxLength="55"
                                                  value={
                                                    patientModel &&
                                                    patientModel.address1
                                                  }
                                                  onChange={(event) =>
                                                    this.handlePatChange(event)
                                                  }
                                                  type="text"
                                                />
                                              </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                              <div className="form-group">
                                                <label htmlFor="address2">
                                                  Address Line 2:
                                                </label>
                                                <input
                                                  autoComplete="nope"
                                                  className="form-control"
                                                  id="address2"
                                                  name="address2"
                                                  maxLength="55"
                                                  value={
                                                    patientModel &&
                                                    patientModel.address2
                                                  }
                                                  onChange={(event) =>
                                                    this.handlePatChange(event)
                                                  }
                                                  type="text"
                                                />
                                              </div>
                                            </div>
                                            <div className="col-lg-4 col-md-12">
                                              <div className="form-group">
                                                <label htmlFor="city">
                                                  City:
                                                </label>
                                                <input
                                                  autoComplete="nope"
                                                  className="form-control"
                                                  id="city"
                                                  name="city"
                                                  maxLength="30"
                                                  value={
                                                    patientModel &&
                                                    patientModel.city
                                                  }
                                                  onChange={(event) =>
                                                    this.handlePatChange(event)
                                                  }
                                                  type="text"
                                                />
                                              </div>
                                            </div>
                                            <div className="col-lg-4 col-md-12">
                                              <div className="form-group">
                                                <label htmlFor="state">
                                                  State :
                                                </label>
                                                <select
                                                  aria-controls="DataTables_Table_0"
                                                  className="form-control"
                                                  name="state"
                                                  id="state"
                                                  value={
                                                    patientModel &&
                                                    patientModel.state
                                                  }
                                                  onChange={
                                                    this.handlePatChange
                                                  }
                                                >
                                                  {usStates.map((s) => (
                                                    <option
                                                      key={s.value}
                                                      value={s.value}
                                                    >
                                                      {s.display}
                                                    </option>
                                                  ))}
                                                </select>
                                              </div>
                                            </div>
                                            <div className="col-lg-4 col-md-12">
                                              <div className="form-group">
                                                <label htmlFor="zipCode">
                                                  Zip:
                                                </label>
                                                <input
                                                  autoComplete="nope"
                                                  type="text"
                                                  className="form-control"
                                                  name="zipCode"
                                                  id="zipCode"
                                                  maxLength="9"
                                                  value={
                                                    patientModel &&
                                                    patientModel.zipCode
                                                  }
                                                  onInput={this.onPasteZip}
                                                  onKeyPress={(event) =>
                                                    this.handleNumericCheck(
                                                      event
                                                    )
                                                  }
                                                />
                                                <div className="invalid-feedback">
                                                  {
                                                    validationModel.zipCodeValField
                                                  }
                                                </div>
                                              </div>
                                            </div>

                                            <div className="col-lg-4 col-md-12">
                                              <div className="form-group">
                                                <label htmlFor="email">
                                                  Home #:
                                                </label>
                                                <input
                                                  autoComplete="nope"
                                                  type="text"
                                                  className="form-control"
                                                  name="phoneNumber"
                                                  id="phoneNumber"
                                                  maxLength="10"
                                                  value={
                                                    patientModel &&
                                                    patientModel.phoneNumber
                                                  }
                                                  onChange={(event) =>
                                                    this.handlePatChange(event)
                                                  }
                                                  onKeyPress={(event) =>
                                                    this.handleNumericCheck(
                                                      event
                                                    )
                                                  }
                                                />
                                              </div>
                                            </div>
                                            <div className="col-lg-2 col-md-12">
                                              <div className="form-group">
                                                <label htmlFor="phoneNumberExt">
                                                  Ext #:
                                                </label>
                                                <input
                                                  autoComplete="nope"
                                                  type="text"
                                                  className="form-control"
                                                  name="phoneNumberExt"
                                                  id="phoneNumberExt"
                                                  maxLength="4"
                                                  value={
                                                    patientModel &&
                                                    patientModel.phoneNumberExt
                                                  }
                                                  onChange={(event) =>
                                                    this.handlePatChange(event)
                                                  }
                                                  onKeyPress={(event) =>
                                                    this.handleNumericCheck(
                                                      event
                                                    )
                                                  }
                                                />
                                              </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                              <div className="form-group">
                                                <label htmlFor="phoneNumberComments">
                                                  Comments :
                                                </label>
                                                <textarea
                                                  className="form-control"
                                                  name="phoneNumberComments"
                                                  id="phoneNumberComments"
                                                  value={
                                                    patientModel &&
                                                    patientModel.phoneNumberComments
                                                  }
                                                  onChange={(event) =>
                                                    this.handlePatChange(event)
                                                  }
                                                  rows={1}
                                                  col={1}
                                                />
                                              </div>
                                            </div>

                                            <div className="col-lg-4 col-md-12">
                                              <div className="form-group">
                                                <label htmlFor="workPhoneNumber">
                                                  Work #:
                                                </label>
                                                <input
                                                  autoComplete="nope"
                                                  type="text"
                                                  className="form-control"
                                                  name="workPhoneNumber"
                                                  id="workPhoneNumber"
                                                  maxLength="10"
                                                  value={
                                                    patientModel &&
                                                    patientModel.workPhoneNumber
                                                  }
                                                  onChange={(event) =>
                                                    this.handlePatChange(event)
                                                  }
                                                  onKeyPress={(event) =>
                                                    this.handleNumericCheck(
                                                      event
                                                    )
                                                  }
                                                />
                                              </div>
                                            </div>
                                            <div className="col-lg-2 col-md-12">
                                              <div className="form-group">
                                                <label htmlFor="workPhoneNumberExt">
                                                  Ext #:
                                                </label>
                                                <input
                                                  autoComplete="nope"
                                                  type="text"
                                                  className="form-control"
                                                  name="workPhoneNumberExt"
                                                  id="workPhoneNumberExt"
                                                  maxLength="4"
                                                  value={
                                                    patientModel &&
                                                    patientModel.workPhoneNumberExt
                                                  }
                                                  onChange={(event) =>
                                                    this.handlePatChange(event)
                                                  }
                                                  onKeyPress={(event) =>
                                                    this.handleNumericCheck(
                                                      event
                                                    )
                                                  }
                                                />
                                              </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                              <div className="form-group">
                                                <label htmlFor="workPhoneNumberComments">
                                                  Comments :
                                                </label>
                                                <textarea
                                                  className="form-control"
                                                  name="workPhoneNumberComments"
                                                  id="workPhoneNumberComments"
                                                  value={
                                                    patientModel &&
                                                    patientModel.workPhoneNumberComments
                                                  }
                                                  onChange={(event) =>
                                                    this.handlePatChange(event)
                                                  }
                                                  rows={1}
                                                  col={1}
                                                />
                                              </div>
                                            </div>
                                            <div className="col-lg-4 col-md-12">
                                              <div className="form-group">
                                                <label htmlFor="mobileNumber">
                                                  Mobile #:
                                                </label>
                                                <input
                                                  autoComplete="nope"
                                                  type="text"
                                                  className="form-control"
                                                  name="mobileNumber"
                                                  id="mobileNumber"
                                                  maxLength="10"
                                                  value={
                                                    patientModel &&
                                                    patientModel.mobileNumber
                                                  }
                                                  onChange={(event) =>
                                                    this.handlePatChange(event)
                                                  }
                                                  onKeyPress={(event) =>
                                                    this.handleNumericCheck(
                                                      event
                                                    )
                                                  }
                                                />
                                              </div>
                                            </div>
                                            <div className="col-lg-4 col-md-12">
                                              <div className="form-group">
                                                <label
                                                  htmlFor="email"
                                                  className={
                                                    patientModel.isPhrUser
                                                      ? "required"
                                                      : ""
                                                  }
                                                >
                                                  Email:
                                                </label>
                                                <input
                                                  autoComplete="nope"
                                                  className="form-control"
                                                  type="text"
                                                  name="email"
                                                  id="email"
                                                  maxLength="60"
                                                  value={
                                                    patientModel &&
                                                    patientModel.email
                                                  }
                                                  onChange={(event) =>
                                                    this.handlePatChange(event)
                                                  }
                                                />
                                                <div className="invalid-feedback">
                                                  {validationModel.emailVal}
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-lg-4 col-md-12">
                                              <div className="form-group">
                                                <label htmlFor="emailComments">
                                                  Comments :
                                                </label>
                                                <textarea
                                                  className="form-control"
                                                  name="emailComments"
                                                  id="emailComments"
                                                  value={
                                                    patientModel &&
                                                    patientModel.emailComments
                                                  }
                                                  onChange={(event) =>
                                                    this.handlePatChange(event)
                                                  }
                                                  rows={1}
                                                  col={1}
                                                />
                                              </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                              <div className="form-group">
                                                <label htmlFor="email">
                                                  Preferred method of
                                                  communication
                                                </label>
                                                <select
                                                  name="DataTables_Table_0_length"
                                                  aria-controls="DataTables_Table_0"
                                                  className="form-control"
                                                >
                                                  <option value="1">
                                                    Provider did not ask
                                                  </option>
                                                  <option value="2">
                                                    Email
                                                  </option>
                                                  <option value="3">
                                                    Home Phone
                                                  </option>
                                                  <option value="4" selected>
                                                    Mobile Phone{" "}
                                                  </option>
                                                  <option value="6">
                                                    Work Phone{" "}
                                                  </option>
                                                  <option value="5">
                                                    Mail
                                                  </option>
                                                  <option value="7">
                                                    Patient declined to specify
                                                  </option>
                                                </select>
                                              </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                              <div className="form-group">
                                                <label className="fancy-checkbox">
                                                  <input
                                                    autoComplete="nope"
                                                    type="checkbox"
                                                    checked=""
                                                  />
                                                  <span>Email Reminders</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                              <div className="form-group">
                                                <label className="fancy-checkbox">
                                                  <input
                                                    autoComplete="nope"
                                                    type="checkbox"
                                                    id="sendAppointmentSMS"
                                                    name="sendAppointmentSMS"
                                                    checked={
                                                      patientModel &&
                                                      patientModel.sendAppointmentSMS
                                                    }
                                                    onChange={
                                                      this.handleCheckBoxes
                                                    }
                                                  />
                                                  <span>SMS Reminders</span>
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="row margintop10">
                                          <div className="col-lg-12">
                                            <a
                                              data-toggle="tab"
                                              id="addprevadd"
                                              className="patienttabs btn btn-primary nav-link active"
                                              onClick={
                                                () => this.savePatient()
                                                // addOtherAdd
                                                //   ? () => this.savePatient()
                                                //   : () => this.addOtherAdd()
                                              }
                                              hidden="true"
                                            >
                                              <span
                                                className="addprevadd"
                                                onClick={
                                                  () => this.savePatient()
                                                  // addOtherAdd
                                                  //   ? () => this.savePatient()
                                                  //   : () => this.addOtherAdd()
                                                }
                                              >
                                                {/* {addOtherAdd
                                                  ? 'Save'
                                                  : 'Add Other Address'} */}
                                                Save
                                              </span>
                                              <span className="paddingleft10">
                                                <i
                                                  className="fa fa-plus-circle fontawesomehover"
                                                  aria-hidden="true"
                                                ></i>
                                              </span>
                                            </a>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-lg-6">
                                        <div className="row clearfix">
                                          <div className="float-left headingcolums">
                                            Legal Entities & Others
                                          </div>
                                          <div
                                            className="editiconround"
                                            id="legalentitiesinfo"
                                          >
                                            <i
                                              className={
                                                "fa fa-pencil editiconcollapse inputfilelableshow " +
                                                (legalEntitesLabelFlag
                                                  ? "displaynone"
                                                  : "")
                                              }
                                              onClick={() =>
                                                this.handleLableChange(
                                                  "legalEntitesLabelFlag",
                                                  444
                                                )
                                              }
                                              style={{ cursor: "pointer" }}
                                            ></i>
                                            <i
                                              className={
                                                "fa fa-check editiconcollapse displaynone inputfieldshow " +
                                                (legalEntitesLabelFlag
                                                  ? "displayblock"
                                                  : "")
                                              }
                                              onClick={() =>
                                                this.handleLableChange(
                                                  "legalEntitesLabelFlag",
                                                  444
                                                )
                                              }
                                              style={{ cursor: "pointer" }}
                                            ></i>
                                          </div>
                                          <div
                                            className={
                                              "legalentitiesview " +
                                              (legalEntitesLabelFlag
                                                ? "displaynone"
                                                : "")
                                            }
                                          >
                                            <div className="margintop10">
                                              <div className="row">
                                                <div className="col-lg-6 col-md-12">
                                                  <div className="formtitle">
                                                    Location:
                                                  </div>
                                                  <div className="formdiscription">
                                                    {patientModel &&
                                                      patientModel.location}
                                                  </div>
                                                </div>
                                                <div className="col-lg-6 col-md-12">
                                                  <div className="formtitle">
                                                    Default Provider
                                                  </div>
                                                  <div className="formdiscription">
                                                    {patientModel &&
                                                      patientModel.provider}
                                                  </div>
                                                </div>
                                                <div className="col-lg-6 col-md-12">
                                                  <div className="formtitle">
                                                    Ref. Provider
                                                  </div>
                                                  <div className="formdiscription">
                                                    {patientModel &&
                                                      patientModel.refProvider}
                                                  </div>
                                                </div>
                                                <div className="col-lg-6 col-md-12">
                                                  <div className="formtitle">
                                                    Hold Submission
                                                  </div>
                                                  <div className="formdiscription">
                                                    {patientModel &&
                                                    patientModel.holdSubmission ? (
                                                      <img
                                                        src={tickImage}
                                                        style={{
                                                          width: "11px",
                                                        }}
                                                      />
                                                    ) : null}
                                                    {patientModel &&
                                                    patientModel.holdSubmission
                                                      ? "Yes"
                                                      : "No"}
                                                  </div>
                                                </div>
                                                <div className="col-lg-6 col-md-12">
                                                  <div className="formtitle">
                                                    Activate Patient Portal
                                                  </div>
                                                  <div className="checkiconclick">
                                                    {patientModel &&
                                                    patientModel.isPhrUser ? (
                                                      <img
                                                        src={tickImage}
                                                        style={{
                                                          width: "11px",
                                                        }}
                                                      />
                                                    ) : null}
                                                    &nbsp;
                                                    {patientModel &&
                                                    patientModel.isPhrUser
                                                      ? "Yes"
                                                      : "No"}
                                                  </div>
                                                </div>

                                                <div className="col-lg-6 col-md-12">
                                                  <div className="formtitle">
                                                    API Access
                                                  </div>
                                                  <div className="checkiconclick">
                                                    {patientModel &&
                                                    patientModel.isApiAccess ? (
                                                      <img
                                                        src={tickImage}
                                                        style={{
                                                          width: "11px",
                                                        }}
                                                      />
                                                    ) : null}
                                                    &nbsp;
                                                    {patientModel &&
                                                    patientModel.isApiAccess
                                                      ? "Yes"
                                                      : "No"}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className={
                                              "legalentitiesedit col-lg-12 col-md-12 " +
                                              (legalEntitesLabelFlag
                                                ? "displayblock"
                                                : "")
                                            }
                                          >
                                            <div className="row">
                                              <div className="col-lg-4 col-md-12">
                                                <div className="form-group">
                                                  <label htmlFor="locationId">
                                                    Location:
                                                  </label>
                                                  <select
                                                    name="locationId"
                                                    id="locationId"
                                                    aria-controls="DataTables_Table_0"
                                                    className="form-control"
                                                    value={
                                                      patientModel &&
                                                      patientModel.locationId
                                                    }
                                                    onChange={(event) =>
                                                      this.handlePatChange(
                                                        event
                                                      )
                                                    }
                                                  >
                                                    {userLocations.map((s) => (
                                                      <option
                                                        key={s.id}
                                                        value={s.id}
                                                      >
                                                        {s.description}
                                                      </option>
                                                    ))}
                                                  </select>
                                                </div>
                                              </div>
                                              <div className="col-lg-4 col-md-12">
                                                <div className="form-group">
                                                  <label htmlFor="providerID">
                                                    Provider:
                                                  </label>
                                                  <select
                                                    name="providerID"
                                                    id="providerID"
                                                    aria-controls="DataTables_Table_0"
                                                    className="form-control"
                                                    value={
                                                      patientModel &&
                                                      patientModel.providerID
                                                    }
                                                    onChange={(event) =>
                                                      this.handlePatChange(
                                                        event
                                                      )
                                                    }
                                                  >
                                                    {userProviders &&
                                                      userProviders.map((s) => (
                                                        <option
                                                          key={s.id}
                                                          value={s.id}
                                                        >
                                                          {s.description}
                                                        </option>
                                                      ))}
                                                  </select>
                                                </div>
                                              </div>
                                              <div className="col-lg-4 col-md-12">
                                                <div className="form-group">
                                                  <label htmlFor="refProviderID">
                                                    Ref Provider:
                                                  </label>
                                                  <select
                                                    name="refProviderID"
                                                    id="refProviderID"
                                                    value={
                                                      patientModel &&
                                                      patientModel.refProviderID
                                                    }
                                                    onChange={(event) =>
                                                      this.handlePatChange(
                                                        event
                                                      )
                                                    }
                                                    aria-controls="DataTables_Table_0"
                                                    className="form-control"
                                                  >
                                                    {userRefProviders &&
                                                      userRefProviders.map(
                                                        (s) => (
                                                          <option
                                                            key={s.id}
                                                            value={s.id}
                                                          >
                                                            {s.description}
                                                          </option>
                                                        )
                                                      )}
                                                  </select>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-lg-4 col-md-12">
                                                <label className="fancy-checkbox">
                                                  <input
                                                    autoComplete="nope"
                                                    type="checkbox"
                                                    id="holdSubmission"
                                                    name="holdSubmission"
                                                    checked={
                                                      patientModel &&
                                                      patientModel.holdSubmission
                                                    }
                                                    onChange={
                                                      this.handleCheckBoxes
                                                    }
                                                  />
                                                  <span>Hold Submission</span>
                                                </label>
                                              </div>
                                              <div className="col-lg-4 col-md-12">
                                                <label className="fancy-checkbox">
                                                  <input
                                                    autoComplete="nope"
                                                    type="checkbox"
                                                    id="isPhrUser"
                                                    name="isPhrUser"
                                                    checked={
                                                      patientModel &&
                                                      patientModel.isPhrUser
                                                    }
                                                    onChange={
                                                      this.handleCheckBoxes
                                                    }
                                                  />
                                                  <span>
                                                    Activate Patient Portal
                                                  </span>
                                                </label>
                                              </div>
                                              <div className="col-lg-4 col-md-12">
                                                <label className="fancy-checkbox">
                                                  <input
                                                    autoComplete="nope"
                                                    type="checkbox"
                                                    id="isApiAccess"
                                                    name="isApiAccess"
                                                    checked={
                                                      patientModel &&
                                                      patientModel.isApiAccess
                                                    }
                                                    disabled={
                                                      !patientModel.isPhrUser
                                                    }
                                                    onChange={
                                                      this.handleCheckBoxes
                                                    }
                                                  />
                                                  <span>Is API Access</span>
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {careTeamSection}
                                      {alternatePatientInfoSection}
                                      {EmergencyContactSection}
                                      {MotherMaidenInfo}

                                      <div className="col-lg-6">
                                        <div className="float-left headingcolums">
                                          Immunization Registry
                                        </div>
                                        <div
                                          className="editiconround"
                                          id="Immunizationinfo"
                                        >
                                          <i
                                            className={
                                              "fa fa-pencil editiconcollapse inputfilelableshow " +
                                              (immunizationLabelFlag
                                                ? "displaynone"
                                                : "")
                                            }
                                            onClick={() =>
                                              this.handleLableChange(
                                                "immunizationLabelFlag",
                                                777
                                              )
                                            }
                                            style={{ cursor: "pointer" }}
                                          ></i>
                                          <i
                                            className={
                                              "fa fa-check editiconcollapse displaynone inputfieldshow " +
                                              (immunizationLabelFlag
                                                ? "displayblock"
                                                : "")
                                            }
                                            onClick={() =>
                                              this.handleLableChange(
                                                "immunizationLabelFlag",
                                                777
                                              )
                                            }
                                            style={{ cursor: "pointer" }}
                                          ></i>
                                        </div>

                                        <div className="row clearfix">
                                          <div
                                            className={
                                              "Immunizationview " +
                                              (immunizationLabelFlag
                                                ? "displaynone"
                                                : "")
                                            }
                                          >
                                            <div className="margintop10 col-lg-12 col-md-12">
                                              <div className="row">
                                                <div className="col-6">
                                                  <div className="formtitle">
                                                    Registry status:
                                                  </div>
                                                  <div className="formdiscription">
                                                    {
                                                      additionalInfo.registrystatus
                                                    }
                                                  </div>
                                                </div>
                                                <div className="col-6">
                                                  <div className="formtitle">
                                                    Effective Date:
                                                  </div>
                                                  <div className="formdiscription">
                                                    {isNull(
                                                      additionalInfo.registrystatuseffectivedate
                                                    )
                                                      ? ""
                                                      : Format(
                                                          additionalInfo.registrystatuseffectivedate,
                                                          "yyyy-mm-dd"
                                                        )}
                                                  </div>
                                                </div>
                                                <div className="col-6">
                                                  <div className="formtitle">
                                                    Publicity Code:
                                                  </div>
                                                  <div className="formdiscription">
                                                    {this.state.PtImmunization.map(
                                                      (row) => {
                                                        return row.code ==
                                                          additionalInfo.publicitycodeid
                                                          ? row.description
                                                          : "";
                                                      }
                                                    )}
                                                  </div>
                                                </div>
                                                <div className="col-6">
                                                  <div className="formtitle">
                                                    Effective Date:
                                                  </div>
                                                  <div className="formdiscription">
                                                    {isNull(
                                                      additionalInfo.publicitycodeeffectivedate
                                                    )
                                                      ? ""
                                                      : Format(
                                                          additionalInfo.publicitycodeeffectivedate,
                                                          "yyyy-mm-dd"
                                                        )}
                                                  </div>
                                                </div>
                                                <div className="col-6">
                                                  <div className="formtitle">
                                                    Stop Updates:
                                                  </div>
                                                  <div className="formdiscription">
                                                    {additionalInfo.protectionIndicator ===
                                                    "yes"
                                                      ? "Yes"
                                                      : additionalInfo.protectionIndicator ===
                                                        "no"
                                                      ? "No"
                                                      : ""}
                                                  </div>
                                                </div>
                                                <div className="col-6">
                                                  <div className="formtitle">
                                                    Effective Date:
                                                  </div>
                                                  <div className="formdiscription">
                                                    {isNull(
                                                      additionalInfo.protectionindicatoreffectivedate
                                                    )
                                                      ? ""
                                                      : Format(
                                                          additionalInfo.protectionindicatoreffectivedate,
                                                          "yyyy-mm-dd"
                                                        )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          <div
                                            className={
                                              "Immunizationedit width100 marginleft10 " +
                                              (immunizationLabelFlag
                                                ? "displayblock"
                                                : "")
                                            }
                                          >
                                            <div className="row">
                                              <div className="col-lg-6">
                                                <div className="form-group">
                                                  <label htmlFor="registrystatus">
                                                    Immunization Registry
                                                    Status:
                                                  </label>
                                                  <select
                                                    name="registrystatus"
                                                    aria-controls="DataTables_Table_0"
                                                    className="form-control"
                                                    id="registrystatus"
                                                    value={
                                                      additionalInfo.registrystatus
                                                    }
                                                    onChange={(e) =>
                                                      this.handleAddInfoChange(
                                                        e
                                                      )
                                                    }
                                                  >
                                                    {ActiveAndIn.map((row) => {
                                                      return (
                                                        <option
                                                          value={row.value}
                                                          key={row.value}
                                                        >
                                                          {row.display}
                                                        </option>
                                                      );
                                                    })}
                                                  </select>
                                                </div>
                                              </div>
                                              <div className="col-lg-6">
                                                <div className="form-group">
                                                  <label htmlFor="registrystatuseffectivedate">
                                                    Effective Date:
                                                  </label>
                                                  <input
                                                    // autoComplete="nope"
                                                    // data-provide="datepicker"
                                                    // data-date-autoclose="true"
                                                    className="form-control"
                                                    min="1900-01-01"
                                                    max="9999-12-31"
                                                    className="form-control"
                                                    id="registrystatuseffectivedate"
                                                    name="registrystatuseffectivedate"
                                                    type="date"
                                                    value={this.replace(
                                                      additionalInfo.registrystatuseffectivedate,
                                                      "T00:00:00",
                                                      ""
                                                    )}
                                                    onChange={(e) =>
                                                      this.handleAddInfoChange(
                                                        e
                                                      )
                                                    }
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-6 col-md-12">
                                                <div className="form-group">
                                                  <label htmlFor="publicitycodeid">
                                                    Publicity Code:
                                                  </label>
                                                  <select
                                                    name="publicitycodeid"
                                                    id="publicitycodeid"
                                                    aria-controls="DataTables_Table_0"
                                                    className="form-control"
                                                    value={
                                                      additionalInfo.publicitycodeid
                                                    }
                                                    onChange={(e) =>
                                                      this.handleAddInfoChange(
                                                        e
                                                      )
                                                    }
                                                  >
                                                    {this.state.PtImmunization.map(
                                                      (row) => {
                                                        return (
                                                          <option
                                                            value={row.code}
                                                            key={row.code}
                                                          >
                                                            {row.description}
                                                          </option>
                                                        );
                                                      }
                                                    )}
                                                  </select>
                                                </div>
                                              </div>
                                              <div className="col-lg-6">
                                                <div className="form-group">
                                                  <label htmlFor="publicitycodeeffectivedate">
                                                    Effective Date:
                                                  </label>
                                                  <input
                                                    autoComplete="nope"
                                                    data-provide="datepicker"
                                                    data-date-autoclose="true"
                                                    className="form-control"
                                                    min="1900-01-01"
                                                    max="9999-12-31"
                                                    type="date"
                                                    className="form-control"
                                                    id="publicitycodeeffectivedate"
                                                    name="publicitycodeeffectivedate"
                                                    value={this.replace(
                                                      additionalInfo.publicitycodeeffectivedate,
                                                      "T00:00:00",
                                                      ""
                                                    )}
                                                    onChange={(e) =>
                                                      this.handleAddInfoChange(
                                                        e
                                                      )
                                                    }
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-12 col-md-12">
                                                <div className="row">
                                                  <div className="col-lg-6">
                                                    <label className="fancy-radio custom-color-green whitespaceno">
                                                      <input
                                                        name="protectionIndicator"
                                                        type="radio"
                                                        checked={
                                                          additionalInfo.protectionIndicator ===
                                                          "yes"
                                                        }
                                                        value="yes"
                                                        onChange={(e) =>
                                                          this.handleAddInfoChange(
                                                            e
                                                          )
                                                        }
                                                      />
                                                      <span>
                                                        <i></i>Yes, protect the
                                                        data.Client (or
                                                        guardian) has indicated
                                                        that the information
                                                        shall be protected.
                                                      </span>{" "}
                                                    </label>
                                                  </div>
                                                </div>
                                                <div className="row">
                                                  <div className="col-lg-6">
                                                    <label className="fancy-radio custom-color-green whitespaceno">
                                                      <input
                                                        name="protectionIndicator"
                                                        type="radio"
                                                        value="no"
                                                        checked={
                                                          additionalInfo.protectionIndicator ===
                                                          "no"
                                                        }
                                                        onChange={(e) =>
                                                          this.handleAddInfoChange(
                                                            e
                                                          )
                                                        }
                                                      />
                                                      <span>
                                                        <i></i>No, it is not
                                                        necessary to protect
                                                        data from other
                                                        clinicians
                                                      </span>{" "}
                                                    </label>
                                                  </div>
                                                  <div className="col-lg-6">
                                                    <label htmlFor="protectionindicatoreffectivedate">
                                                      Effective Date:
                                                    </label>
                                                    <input
                                                      className="form-control"
                                                      min="1900-01-01"
                                                      max="9999-12-31"
                                                      type="date"
                                                      name="protectionindicatoreffectivedate"
                                                      className="form-control"
                                                      id="protectionindicatoreffectivedate"
                                                      value={this.replace(
                                                        additionalInfo.protectionindicatoreffectivedate,
                                                        "T00:00:00",
                                                        ""
                                                      )}
                                                      onChange={(e) =>
                                                        this.handleAddInfoChange(
                                                          e
                                                        )
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-lg-6  paddingleft20 paddingright20">
                                        <div className="float-left headingcolums">
                                          Notes
                                        </div>
                                        {/* <div className="editiconround">
                                          <i className="fa fa-pencil editiconcollapse inputfilelableshow"></i>{' '}
                                          <i className="fa fa-check editiconcollapse displaynone inputfieldshow"></i>{' '}
                                        </div> */}
                                        <div className="row clearfix">
                                          <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                              <label htmlFor="notes">
                                                Patient Notes:
                                              </label>
                                              <textarea
                                                rows={3}
                                                cols={3}
                                                maxLength="500"
                                                className="form-control no-resize "
                                                value={
                                                  patientModel &&
                                                  patientModel.notes
                                                }
                                                name="notes"
                                                id="notes"
                                                onChange={(event) =>
                                                  this.handlePatChange(event)
                                                }
                                              ></textarea>
                                              <div id="the-count">
                                                <span id="current">
                                                  {
                                                    this.state
                                                      .PatientNotesLength
                                                  }
                                                </span>
                                                <span id="maximum">/ 500</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {this.state.showPopup && (
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
                        onClick={() => this.setState({ showPopup: false })}
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
                              color: "white",
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
                          <table className="gridtbl border">
                            <tr className="border">
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
                                <strong>
                                  {patientModel.medicalRecordNumber}
                                </strong>
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
                                <strong>MRN</strong>
                              </td>
                              <td>27-jul-95</td>
                              <td width="2%">
                                <strong>T</strong>
                              </td>
                              <td width="31%">090078601 </td>
                              <td>
                                <strong>SEEN BY</strong>
                              </td>
                              <td> Provider MD </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Race</strong>
                              </td>
                              <td>23</td>
                              <td>
                                <strong>F</strong>
                              </td>
                              <td>08443584</td>
                              <td>
                                <strong>DATE</strong>
                              </td>
                              <td> 08/06/2021 </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>SEX</strong>
                              </td>
                              <td>Male</td>
                              <td colspan="2">address1</td>
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
                              <td colspan="2">adress2</td>
                              <td>Not Signed</td>
                              <td>&nbsp;</td>
                              <td width="1%">&nbsp;</td>
                            </tr>
                            <tr>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td colspan="2">adress3</td>
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
                                Thyroid issues, anxiety about drs (Appt time:
                                11:00 AM) (Arrival time: 10:11 AM)
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
                              <td>demo</td>
                              <td>
                                <strong>SEX</strong>
                              </td>
                              <td> Male</td>
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
                              <td>27-jul-95</td>
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
                              <td> demo</td>
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
                              <td>124124</td>
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {popup}
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    RaceandEthnicity: state.Patient.ptRaceandEthnicity.ptRaceandEthnicity,
    PreferredLanguage: state.Patient.preferredLanguages.preferredLanguages,
    Ability: state.Patient.languageAbility.languageAbility,
    LanguageProficiency: state.Patient.languageProficiency.languageProficiency,
    Religion: state.Patient.religion.religion,
    Relationship: state.Patient.relationship.relationship,
    patientInfo: state.Patient.selectPatient,
    PtImmunization: state.Patient.ptImmunization.ptImmunization,

    userLocations: state.userInfo
      ? state.userInfo.userLocations
        ? state.userInfo.userLocations
        : []
      : [],
    userProviders: state.userInfo
      ? state.userInfo.userProviders
        ? state.userInfo.userProviders
        : []
      : [],
    userRefProviders: state.userInfo
      ? state.userInfo.userRefProviders
        ? state.userInfo.userRefProviders
        : []
      : [],
    OpenDynamicTab: state.OPEN_TAB ? state.OPEN_TAB : [],
  };
}

const action = {
  TabAction,
};
export default connect(mapStateToProps, action)(Demographics);
