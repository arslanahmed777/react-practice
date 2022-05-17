import isNull from './isNull'
import moment from 'moment'
import { enumUtil } from './enum'

const Validator = (data, type, name, length) => {
    try {
        ///////////////////////// For Date Validation Code Start/////////////////////
        if (
            data instanceof Array &&
            type === enumUtil.enumValidationType.SelectDate
        ) {
            if (isNull(data[0]) === true && isNull(data[1]) === false) {
                return <div className="invalid-feedback">Select From Date!</div>
            } else {
                return ''
            }
        } else if (
            data instanceof Array &&
            type === enumUtil.enumValidationType.DateFromLessAndEqualToDateTo
        ) {
            if (isNull(data[0]) === false && isNull(data[1]) === false) {
                if (
                    new Date(moment(data[0]).format().slice(0, 10)).getTime() >
                    new Date(moment(data[1]).format().slice(0, 10)).getTime()
                ) {
                    return (
                        <div className="invalid-feedback">
                            {' '}
                            'Date From must be less than or equals to Date To'!
                        </div>
                    )
                } else {
                    return ''
                }
            } else {
                return ''
            }
            ///////////////////////// For Date Validation Code END/////////////////////
        } else if (
            data instanceof Array &&
            type === enumUtil.enumValidationType.NullCheck
        ) {
            //if any value of Array is a Object then it will retrun true otherwise false

            if (!isNull(data)) {
                let arr = Object.values(data[0])
                let dummy = []
                for (let i = 0; i < arr.length; i++) {
                    dummy.push(arr[i])
                }
                let result = !dummy.every((VALUE) => !hasObject(VALUE))

                return result
            }
        } else if (
            data instanceof Array &&
            type === enumUtil.enumValidationType.EnterICD
        ) {
            let array = []
            var Obj = {}
            let arr = []

            for (let k = data.length - 1; k >= 0; k--) {
                if (!isNull(data[k])) {
                    for (let j = k - 1; j >= 0; j--) {
                        if (isNull(data[j])) {
                            let msg = j + 1
                            let index = k + 1
                            array.push({
                                index: 'D' + index,
                                msg: 'ICD' + msg,
                            })
                        }
                    }
                } else {
                    for (let j = k === 0 ? k : k - 1; j >= 0; j--) {
                        if (isNull(data[j])) {
                            let index = k + 1
                            array.push({
                                index: 'D' + index,
                                msg: '',
                            })
                        }
                    }
                }
            }

            if (!isNull(array)) {
                let temp = array[0].index

                for (let z in array) {
                    if (temp === array[z].index) {
                        arr.unshift(array[z].msg)

                        if (z === array.length - 1) {
                            if (!isNull(array[z].msg)) {
                                Obj[array[z].index] = (
                                    <div className="invalid-feedback text-center">
                                        First Enter {arr.toString()} !
                                    </div>
                                )
                            } else {
                                Obj[array[z].index] = ''
                            }
                        }
                        // Obj[array[z].index] = array[z].msg
                    } else if (temp !== array[z].index) {
                        if (!isNull(array[z - 1].msg)) {
                            Obj[array[z - 1].index] = (
                                <div className="invalid-feedback text-center">
                                    First Enter {arr.toString()} !
                                </div>
                            )
                        } else {
                            Obj[array[z - 1].index] = ''
                        }

                        arr = []
                        temp = array[z].index
                        if (temp === array[z].index) {
                            arr.unshift(array[z].msg)
                            if (!isNull(array[z].msg)) {
                                Obj[array[z].index] = (
                                    <div className="invalid-feedback text-center">
                                        First Enter {arr.toString()} !
                                    </div>
                                )
                            } else {
                                Obj[array[z].index] = ''
                            }
                        }
                        if (z === array.length - 1) {
                        }
                    } else {
                        Obj[array[z - 1].index] = (
                            <div className="invalid-feedback text-center">
                                First Enter {arr.toString()} !
                            </div>
                        )
                    }
                }
            }
            console.log('Object', Obj, array)
            return Obj
        } else if (
            data instanceof Array &&
            type === enumUtil.enumValidationType.Unique
        ) {
            var valuesSoFar = Object.create(null)

            for (var i = 0; i < data.length; ++i) {
                var value = data[i]
                if (!isNull(value)) {
                    if (value in valuesSoFar) {
                        return (
                            <div className="invalid-feedback text-center">
                                {capitalize(name)} Should be Unique !
                            </div>
                        )

                        // return true
                    }
                    valuesSoFar[value] = true
                }
            }

            return ''
        } else if (
            data instanceof Array &&
            type === enumUtil.enumValidationType.Sequence
        ) {
            if (!isNull(data)) {
                for (let i = 0; i <= data.length; i++) {
                    if (isNull(data[i]) && !isNull(data[i + 1])) {
                        return (
                            <div className="invalid-feedback text-center">
                                Enter {capitalize(name)} in Sequence !
                            </div>
                        )
                    }
                }
            }
            return ''
        } else {
            ///////////////////////// For Normal Validation Code Start/////////////////////
            if (type === enumUtil.enumValidationType.Checked) {
                if (data === false) {
                    return (
                        <div className="invalid-feedback">
                            {' '}
                            {capitalize(name)} must be Checked !
                        </div>
                    )
                } else {
                    return ''
                }
            } else if (type === enumUtil.enumValidationType.Required) {
                if (isNull(data)) {
                    return (
                        <div className="invalid-feedback">
                            {' '}
                            {capitalize(name)} Is Required !
                        </div>
                    )
                } else {
                    return ''
                }
            } else if (type === enumUtil.enumValidationType.Enter) {
                if (isNull(data)) {
                    return <div className="invalid-feedback"> Enter {capitalize(name)} !</div>
                } else {
                    return ''
                }
            } else if (type === enumUtil.enumValidationType.Length) {
                if (data.length < length && data.length > 0) {
                    return (
                        <div className="invalid-feedback">
                            {' '}
                            {capitalize(name)} length should be {length} !
                        </div>
                    )
                } else {
                    return ''
                }
                ///////////////////////// For Normal Validation Code END/////////////////////
            } else if (type === enumUtil.enumValidationType.NullCheck) {
                if (!isNull(data)) {
                    return true
                } else {
                    return false
                }
            } else if (type === enumUtil.enumValidationType.Selection) {
                if (isNull(data)) {
                    return (
                        <div className="invalid-feedback">
                            {' '}
                            Please Select a Valid {capitalize(name)} !
                        </div>
                    )
                } else {
                    return ''
                }
            } else if (type === enumUtil.enumValidationType.IsZero) {
                if (isNull(data)) {
                    return (
                        <div className="invalid-feedback">
                            {' '}
                            {capitalize(name)} ID Should be greater than 0 !
                        </div>
                    )
                } else {
                    return ''
                }
            }
            ///////////////////////// For Future Date Validation Code Start/////////////////////
            else if (type === enumUtil.enumValidationType.FutureData) {
                if (isNull(data) === false) {
                    if (
                        new Date(moment(data).format().slice(0, 10)).getTime() >
                        new Date(moment().format().slice(0, 10)).getTime()
                    ) {
                        return (
                            <div className="invalid-feedback">Future date can't be selected!</div>
                        )
                    } else {
                        return ''
                    }
                }
            }
            ///////////////////////// For Future Date Validation Code END/////////////////////
        }
    } catch (error) {
        console.log(error)
    }
}

const capitalize = (params) => {
    if (typeof params === 'string') {
        return params.charAt(0).toUpperCase() + params.slice(1)
    }
    return null
}
const hasObject = (value) => {
    if (value instanceof Object) {
        return true
    } else {
        return false
    }
}
export default Validator
