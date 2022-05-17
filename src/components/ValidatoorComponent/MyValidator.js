import ValidationTypes from "./ValidationTypes";
import isNull from "./isNull";
const MyValidator = (data, type, Error, validationType) => {
    if (type === ValidationTypes.NullCheck) {
        console.log(data);
        if (Object.values(data).some((val) => !isNull(val))) {
            return true
        } else {
            return false
        }
    }
    if (validationType === "custom") {

    }
    else {
        if (data instanceof Array) {

        }
        else {
            let error = ""
            for (let i = 0; i < type.length; i++) {
                if (type.includes(ValidationTypes.required) && data === "") {
                    error = (<div className='invalid-feedback'>{Error[type.indexOf(ValidationTypes.required)]}</div>);
                    break;
                }
                if (type.includes(ValidationTypes.capitalize) && data !== data.toUpperCase()) {
                    error = (<div className='invalid-feedback'>{Error[type.indexOf(ValidationTypes.capitalize)]}</div>);
                    break;
                }
            }
            return error
        }

    }

}

export default MyValidator