import React, { useState, useEffect } from 'react'
export default function Pagination(props) {
    const [pageSize, setPageSize] = useState(10)
    const [pageNoChange, setpageNoChange] = useState(1)
    const [rowCount1, setrowCount1] = useState(1)
    const [rowCount2, setrowCount2] = useState(10) // by default Equals to page size 
    const paginationindex = [10, 20, 30, 40, 50, 100, 500, 1000,]
    const totalCount = props.pagination.totalCount
    const handlePerRowChange = props.handlePerRowsChange
    const handlePageChange = props.handlePageChange
    const rows = props.totalRows
    let totalPage =
        totalCount === 0
            ? 1
            : (totalCount / pageSize) % 1 === 0
                ? totalCount / pageSize
                : parseInt(totalCount / pageSize) + 1
    useEffect(() => {
        if (props.pagination.perPage !== pageSize) {
            setPageSize(props.pagination.perPage)
        }
        if (props.pagination.totalCount === 0) {
            setrowCount1(1)
            setrowCount2(10)
        }
    }, [props.pagination.perPage, props.pagination.totalCount])

    const Pages = (e, status) => {
        e.preventDefault()
        if (status === 'previous') {
            // previousPage();
            if (rows < pageSize) {
                setrowCount2(rowCount2 - rows)
            }
            else {
                setrowCount2(rowCount2 - pageSize)
            }
            setrowCount1(rowCount1 - pageSize)
            setpageNoChange(pageNoChange - 1)
            if (handlePageChange) {
                handlePageChange(pageNoChange - 1)
            } else {
                alert('Please Contact BellMedex', '', 'info')
            }
        } else if (status === 'forward') {
            //nextPage();
            if (totalCount < (rowCount2 + pageSize)) {
                setrowCount2(totalCount)
            }
            else {
                setrowCount2(rowCount2 + pageSize)
            }
            setrowCount1(rowCount1 + pageSize)
            setpageNoChange(pageNoChange + 1)
            if (handlePageChange) {
                handlePageChange(pageNoChange + 1)
            } else {
                alert('Please Contact BellMedex', '', 'info')
            }
        } else {
        }
    }

    return (
        <div className="row mt-2">
            {/* <div className="col-md-6"></div> */}
            <div className="col-md-6 text-left">
                <span className="p-2">
                    Showing {rowCount1}-{totalCount < pageSize ? totalCount : rowCount2} of {totalCount}
                </span>
            </div>
            <div className="col-md-6 text-right">
                <ul className="pagination">
                    <li
                        className={
                            pageNoChange === 1
                                ? 'paginate_button page-item previous disabled'
                                : 'paginate_button page-item previous'
                        }
                        id="DataTables_Table_0_previous"
                    >
                        <a
                            href="#/"
                            aria-controls="DataTables_Table_0"
                            className="page-link"
                            onClick={(e) => Pages(e, 'previous')}
                        >
                            Previous
                        </a>
                    </li>
                    {props.listOfpages &&
                        props.listOfpages.slice(0, 10).map((info, index) => {
                            return (
                                <>
                                    <li className="paginate_button page-item ">
                                        <a
                                            aria-controls="DataTables_Table_0"
                                            className="page-link"
                                            onClick={(e) => handlePageChange(info)}
                                        >
                                            {info}
                                        </a>
                                    </li>
                                </>
                            )
                        })}

                    <li
                        className={
                            totalCount === 0
                                ? 'paginate_button page-item next disabled'
                                : pageNoChange === totalPage
                                    ? 'paginate_button page-item next disabled'
                                    :
                                    'paginate_button page-item next '
                        }
                        id="DataTables_Table_0_next"
                    >
                        <a
                            aria-controls="DataTables_Table_0"
                            className="page-link"
                            onClick={(e) => Pages(e, 'forward')}
                        >
                            Next
                        </a>
                    </li>
                    <li className="paginate_button page-item next">
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value))
                                setrowCount1(1)
                                if (totalCount < (Number(e.target.value))) {
                                    setrowCount2(totalCount)
                                }
                                else {
                                    setrowCount2(Number(e.target.value))
                                }
                                if (handlePerRowChange) {
                                    handlePerRowChange(Number(e.target.value), 1)
                                } else {
                                    alert('Please Contact BellMedex', '', 'info')
                                }
                                setpageNoChange(1)
                            }}
                            className="tablePaginationDropDown"
                            style={{ maxHeight: '34px' }}
                        >
                            {paginationindex.map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </li>
                </ul>
            </div>
        </div>
    )
}
