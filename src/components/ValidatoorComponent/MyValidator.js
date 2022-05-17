export const ValidationTypes = {
    required: "required",
    capitalize: "capitalize",
    length12: "length12",
    NullCheck: "NullCheck",
    startEndDate: "startEndDate"
}
const MyValidator = (data, type, Error) => {
    if (type === ValidationTypes.NullCheck) {
        if (Object.values(data).some((val) => !isNull(val))) {
            return true
        } else {
            return false
        }
    }
    const type_arr = pushInArray(type)
    const error_arr = pushInArray(Error)
    const data_arr = pushInArray(data)
    let error = ""
    for (let i = 0; i < type_arr.length; i++) {
        if (typeof type_arr[i] === "function") {
            error = type_arr[i](data_arr) ? (<div className='invalid-feedback'>{error_arr[i]}</div>) : "";
        }
        else {
            if (type_arr.includes(ValidationTypes.required) && data_arr[0] === "") {
                error = (<div className='invalid-feedback'>{error_arr[type_arr.indexOf(ValidationTypes.required)]}</div>);
                break;
            }
            if (type_arr.includes(ValidationTypes.capitalize) && data_arr[0] !== data_arr[0].toUpperCase()) {
                error = (<div className='invalid-feedback'>{error_arr[type_arr.indexOf(ValidationTypes.capitalize)]}</div>);
                break;
            }
            if (type_arr.includes(ValidationTypes.startEndDate)) {
                if (data[0] === "" || data[1] === "") break
                if (Date.parse(data[0]) > Date.parse(data[1])) {
                    error = (<div className='invalid-feedback'>{error_arr[type_arr.indexOf(ValidationTypes.startEndDate)]}</div>);
                    break;
                }
            }
        }
    }
    return error
}

const pushInArray = (data) => {
    let new_arr = []
    if (data instanceof Array) {
        new_arr = [...data]
    } else {
        new_arr = [data]
    }
    return new_arr
}
const isNull = (value) => {
    if (
        value === '' ||
        value === 0 ||
        value === 'Null' ||
        value === null ||
        value === undefined ||
        value === 'Please Select' ||
        value.length === 0 ||
        value === -1 ||
        value === 'Please Coverage' ||
        value === 'Please Relationship'
    ) {
        return true
    } else {
        return false
    }
}




export default MyValidator