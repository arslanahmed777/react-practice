import React from 'react'
import axios from "axios";
import styles from "./SuperSearch.module.css"
const SuperSearch = (props) => {
    return (
        <div id={`superSearchParentDiv_${props.id}`} className='position-relative'>
            <div className="input-group">
                <input id={`superSearchInputField_${props.id}`} type="text" autoComplete="off" className="col yellowsearch borderzero" placeholder="Search..." />
                <div className="input-group-append">
                    {props.searchValue ? (
                        <button  ><i className="fa fa-close" style={{ position: 'relative', }} /></button>
                    ) : (
                        <button> <i className="fa fa-search" style={{ position: 'relative', }} /></button>
                    )}

                </div>
            </div>

            <div className={`position-absolute ${styles.tableWrapper}`} style={{ minHeight: props.tableHeight ? props.tableHeight : "100px", width: props.tableWidth ? props.tableWidth : "100%" }}>
                <div className={styles.row}>
                    <div className={`border`} style={{ width: `${100 / props.tableData.length}%` }}>32</div>
                    <div className={`border`} style={{ width: `${100 / props.tableData.length}%` }}>32</div>
                    <div className={`border`} style={{ width: `${100 / props.tableData.length}%` }}>32</div>
                </div>
            </div>
        </div>
    )
}

export default SuperSearch