import React, { useState } from 'react'
import Pagination from '../components/Pagination/Pagintaion'

const PaginationPage = () => {
    const [pagination, setpagination] = useState({
        pageNo: 1,
        perPage: 10,
        totalCount: 40,
    })
    const handlePerRowsChangeChargeGrid = async (rowPerPage, pageno) => {
        setpagination((prevState) => ({
            ...prevState,
            pageNo: pageno,
            perPage: rowPerPage,
        }));
    };
    const handlePageChangeChargeGrid = async (pageno) => {
        setpagination((prevState) => ({
            ...prevState,
            pageNo: pageno,
        }));
    };
    return (
        <div className='container'>
            <div className='col-12'>
                <Pagination
                    pagination={pagination}
                    handlePerRowsChange={handlePerRowsChangeChargeGrid}
                    handlePageChange={handlePageChangeChargeGrid}

                />
            </div>
        </div>
    )
}

export default PaginationPage