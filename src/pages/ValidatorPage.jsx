import React, { useState } from 'react'
import Validator, { ValidationTypes as V_Type } from '../components/ValidatoorComponent/Validator'

const ValidatorPage = () => {
    const [formModel, setformModel] = useState({
        firstname: "",
        startDate: "",
        endDate: ""

    })
    const [MyvalidationModel, setMyvalidationModel] = useState({
        firstnameError: null,
        startDateError: null,
        endDateError: null,
        startEndDateError: null
    })
    const customHandler = (data) => {
        if (data[0].length > 5) {
            return true
        } else { return false }
    }
    const setValidation = () => {
        console.log("setValidation");
        let myvalidation_Obj = {
            ...MyvalidationModel,
            firstnameError: Validator(formModel.firstname, [V_Type.required, V_Type.capitalize, customHandler], ['name is required', 'name should be capital', "length should be"],),
            startDateError: Validator(formModel.startDate, V_Type.required, 'Start Date is required'),
            endDateError: Validator(formModel.endDate, V_Type.required, 'End Date is required'),
            startEndDateError: Validator([formModel.startDate, formModel.endDate], V_Type.startEndDate, 'Start date should be less then End date'),
        }
        setMyvalidationModel(myvalidation_Obj)
        return Validator(myvalidation_Obj, V_Type.NullCheck,)
    }
    const handleSave = async () => {
        let my_validation = setValidation()
        if (my_validation) {
            console.log("My validation", my_validation);
        } else {
            console.log("My validation", my_validation);
        }
    }

    const handleChange = (e) => {
        setformModel({ ...formModel, [e.target.name]: e.target.value })
        setValidation()
    }
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col">
                        <input type="text" name="firstname" value={formModel.firstname} onChange={handleChange} className='form-control' />
                        {MyvalidationModel.firstnameError}
                    </div>
                    <div className="col">
                        <input type="date" name="startDate" value={formModel.startDate} onChange={handleChange} className='form-control' />
                        {MyvalidationModel.startDateError}
                    </div>
                    <div className="col">
                        <input type="date" name="endDate" value={formModel.endDate} onChange={handleChange} className='form-control' />
                        {MyvalidationModel.endDateError}
                        {MyvalidationModel.startEndDateError}
                    </div>

                </div>
                <div className='mt-3'>
                    <button onClick={handleSave} className='btn btn-success'>Submit</button>
                </div>
            </div>
        </>

    )
}

export default ValidatorPage