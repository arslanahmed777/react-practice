import ValidationTypes from "./ValidationTypes";
import isNull from "./isNull";
const MyValidator = (data, type, Error) => {
    if (type === ValidationTypes.NullCheck) {
        console.log(data);
        if (Object.values(data).some((val) => !isNull(val))) {
            return true
        } else {
            return false
        }
    }


    if (data instanceof Array) {
        console.log(data);
        const type_arr_ = pushInArray(type)
        const error_arr_ = pushInArray(Error)
        let error = ""

        for (let i = 0; i < type_arr_.length; i++) {
            if (type_arr_.includes(ValidationTypes.startEndDate)) {
                if (data[0] === "" || data[1] === "") break
                if (Date.parse(data[0]) > Date.parse(data[1])) {
                    error = (<div className='invalid-feedback'>{error_arr_[type_arr_.indexOf(ValidationTypes.startEndDate)]}</div>);
                    break;
                }
            }
        }
        return error
    }
    else {
        const type_arr = pushInArray(type)
        const error_arr = pushInArray(Error)
        let error = ""
        for (let i = 0; i < type_arr.length; i++) {

            if (typeof type_arr[i] === "function") {

                error = type_arr[i](data) ? (<div className='invalid-feedback'>length should be less then 5</div>) : "";

            }
            else {
                if (type_arr.includes(ValidationTypes.required) && data === "") {
                    error = (<div className='invalid-feedback'>{error_arr[type_arr.indexOf(ValidationTypes.required)]}</div>);
                    break;
                }
                if (type_arr.includes(ValidationTypes.capitalize) && data !== data.toUpperCase()) {
                    error = (<div className='invalid-feedback'>{error_arr[type_arr.indexOf(ValidationTypes.capitalize)]}</div>);
                    break;
                }
            }
        }
        return error
    }

}

export const pushInArray = (data) => {
    let new_arr = []
    if (data instanceof Array) {
        new_arr = [...data]
    } else {
        new_arr = [data]
    }
    return new_arr
}



export default MyValidator