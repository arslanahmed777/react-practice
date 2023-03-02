import React, { useState, useEffect } from 'react'
import styles from "./SuperSearch.module.css"
import useDebounce from './useDebounce'
import axios from 'axios'
import InputVariant1 from './InputVariants/InputVariant1'
// =============================== CUSTOM HELPER FUNCTIONS ==========================
const getupdateArray = (cols, rows) => {
    const updatedarr = rows.map((row) => {
        let obj = {}
        cols.forEach((ele) => {
            // const ddd = ele.replace(/\s/g, '').toLowerCase()
            obj[ele.bindingValue] = row[ele.bindingValue]
        })
        return obj
    })
    return updatedarr
}

function getValue(obj, path) {
    if (!path) return obj;
    const properties = path.split('.');
    return getValue(obj[properties.shift()], properties.join('.'));
}




const SuperSearch = (props) => {
    const [tableData, settableData] = useState([])
    const [selectedRowNumber, setselectedRowNumber] = useState(0)
    const [showTable, setshowTable] = useState(false)
    const [searchStatus, setsearchStatus] = useState(false)
    const [s_Value, sets_Value] = useState('')

    const debouncedSearchTerm = useDebounce(props.searchValue, 500);


    // ========================= ON KEY DOWN PRESSED INPUT FIELD======================
    const onKeyDownPressed = async (e) => {
        if (e.keyCode === 13) {
            // User pressed the ENTER key
            if (tableData.length > 0) {
                await props.getSelectedData(tableData[selectedRowNumber], e.keyCode)
                setshowTable(false)
                //setselectedRowNumber(0)
                setsearchStatus(false)
                sets_Value('')
            }
        } else if (e.keyCode === 38) {
            // if user presses the UP
            if (selectedRowNumber > 0) {
                setselectedRowNumber((prevSelectedRow) => prevSelectedRow - 1)
                var elem = document.getElementById(selectedRowNumber - 1)
                elem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'start',
                })
            }
        } else if (e.keyCode === 40) {
            // IF USER PRESSES DOWN KEY
            if (selectedRowNumber < tableData.length - 1) {
                setselectedRowNumber((prevSelectedRow) => prevSelectedRow + 1)
                var elem = document.getElementById(selectedRowNumber + 1)
                elem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'start',
                })
            }
        } else if (e.keyCode === 27) {
            // IF USER PRESSES ESC KEY THEN RESET THE COMPONENT TO ITS ORIGINAL STATE
            props.getSelectedData(null)
            settableData([])
            setshowTable(false)
            setselectedRowNumber(0)
        } else if (e.keyCode === 9) {
            // IF USER PRESSES THE TAB BUTTON
            if (tableData.length > 0) {
                props.getSelectedData(tableData[selectedRowNumber])
                setshowTable(false)
            }
        }
    }

    // ====================== ON CLICKING SINGLE ROW OF TABLE ================
    const handleSingleRow = (singlerow, index) => {
        setselectedRowNumber(index)
        props.getSelectedData(singlerow)
        setshowTable(false)
        setsearchStatus(false)
        sets_Value('')
        setselectedRowNumber(0)
    }

    // =========================== ON CHANGE HANDLER OF THE INPUT FIELD =============================
    const onHandleChange = async (e) => {
        let eventValue = e.target.value
        props.onChange(eventValue)
        sets_Value(eventValue)
        if (eventValue === '') {
            setsearchStatus(false)
            setselectedRowNumber(0)
        } else {
            setsearchStatus(true)
        }
    }

    // ====================== RESETING THE COMPONENT TO ITS ORIGINAL STATE================
    const resetComponent = () => {
        props.getSelectedData(null)
        settableData([])
        setselectedRowNumber(0)
        setshowTable(false)
        setsearchStatus(false)
        sets_Value('')
    }


    useEffect(() => {
        if (searchStatus) {
            if (debouncedSearchTerm.length >= 2) {
                (async () => {
                    try {
                        let response = null
                        if (props.customData?.length > 0) {
                            response = props.customData.filter((cdata) => cdata.label.includes(debouncedSearchTerm),)
                            settableData(response)
                            if (response.length > 0) {
                                setshowTable(true)
                            } else {
                                setshowTable(false)
                            }
                        } else {
                            if (props.method === 'post') {
                                if (!props.postBody) { throw 'Post Body prop is not defined' } // if postBody prop is not defined
                                else {
                                    response = await axios(props.ApiLink, props.method, props.postBody,)
                                }
                            } else if (props.method === 'get') {
                                // response = await axios({ method: props.method, url: `${props.ApiLink}${debouncedSearchTerm}` })


                                response = await fetch(`${props.ApiLink}${debouncedSearchTerm}`, {
                                    Method: props.method,
                                    Headers: {
                                        Accept: 'application.json',
                                        'Content-Type': 'application/json'
                                    },

                                })
                                response = await response.json()
                                response = getValue(response, props.responseStructure)


                            } else {
                                throw 'Method not allowed'
                            }


                            settableData(response)
                            if (response.length > 0) {
                                setshowTable(true)
                            } else {
                                setshowTable(false)
                            }

                        }
                    } catch (error) {
                        console.log('ERROR', error)
                        // toaster(error, enumUtil.enumtoaster.warning)
                    }
                })()
            }
        }
    }, [
        props.ApiLink,
        props.method,
        // props.postBody,
        props.customData,
        props.responseStructure,
        debouncedSearchTerm
    ])


    const inputVariants = {
        variant1: <InputVariant1 variantSearchIcon={props.searchIcon} variantCrossIcon={props.crossIcon} variantThemeColor={props.themeColor} searchValue={props.searchValue} variantPlaceholder={props.placeholder} variantDisabled={props.disabled} variantID={props.id} handleChange={onHandleChange} handleOnKeyDown={onKeyDownPressed} resetComponent={resetComponent} />,
        variant2: "asd",
    }

    return (
        <div className={styles.mainWrapper}>
            {inputVariants[props.variantType]}

            {showTable && searchStatus && s_Value === props.searchValue ? (
                <div className={`position-absolute ${styles.tableWrapper} tablepadding5 highZ`}
                    style={{ minHeight: `${tableData.length * 30 > props.tableHeight ? props.tableHeight : tableData.length * 30 + 45}px`, width: props.tableWidth ? props.tableWidth : '100%', }}
                >
                    <table className={styles.table} style={{ height: 'inherit' }}   >
                        <thead className={styles.table_head} >
                            <tr style={{ display: "flex" }} >
                                {props.tableData.map((data, i) => <th className={data.columnWidth ? '' : styles.flexGrow} style={{ width: data.columnWidth ? data.columnWidth : 'auto', }} key={i}> {data.columName} </th>)}
                            </tr>
                        </thead>
                        <tbody className={styles.table_body}>
                            {props.customData?.length > 0
                                ? tableData.map((tdata, index) => {
                                    let row_selected = false
                                    if (index === selectedRowNumber) { row_selected = true }
                                    return (
                                        <tr id={index} key={index} className={row_selected ? 'row-is-selected' : ''} onClick={() => handleSingleRow(props.customData[index], index)} >
                                            <td style={{ width: '100%' }}>{tdata.label}</td>
                                        </tr>
                                    )
                                })
                                : getupdateArray(props.tableData, tableData).map(
                                    (trows, index) => {
                                        let selected = false
                                        if (index === selectedRowNumber) { selected = true }
                                        return (
                                            <tr id={index} key={index} className={selected ? styles.selected_row : ''} onClick={() => handleSingleRow(tableData[index], index)}>
                                                {props.tableData.map((tcols, i) => {
                                                    if (i === 0) {
                                                        const sentence = trows[tcols.bindingValue].toString()
                                                        const word = props.searchValue
                                                        const case_insensitiveWord = new RegExp(word.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'i',) // for caseinsensitive
                                                        var start = sentence.search(case_insensitiveWord)
                                                        let findword = sentence.substr(start, word.length)
                                                        findword = `<b>${findword}</b>`
                                                        const new_Sentence = sentence.replace(case_insensitiveWord, findword,)
                                                        return (
                                                            <td
                                                                className={tcols.columnWidth ? '' : styles.flexGrow}
                                                                style={{ width: tcols.columnWidth ? tcols.columnWidth : 'auto', color: '#0392cf', fontSize: '12px', }}
                                                                key={i}
                                                                dangerouslySetInnerHTML={{ __html: new_Sentence, }}
                                                            />
                                                        )
                                                    } else {
                                                        return (
                                                            <td className={tcols.columnWidth ? '' : styles.flexGrow}
                                                                style={{ width: tcols.columnWidth ? tcols.columnWidth : 'auto', color: '#626569' }}
                                                                key={i} >
                                                                {trows[tcols.bindingValue]}
                                                            </td>
                                                        )
                                                    }
                                                })}
                                            </tr>
                                        )
                                    },
                                )}
                        </tbody>
                    </table>
                </div>) : null}
        </div>
    )
}

export default SuperSearch