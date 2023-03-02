import React, { useState } from 'react'
import SuperSearch from '../components/SuperSearch/SuperSearch'

const SuperSearchPage = () => {
    const [superSearchValue, setsuperSearchValue] = useState("")

    const handleSelectedData = (selectedObj) => {
        console.log("selectedObj", selectedObj);
        if (selectedObj) {
            setsuperSearchValue(selectedObj.title)
        } else {
            setsuperSearchValue("")
        }
    }

    return (
        <div className='row justify-content-center'>
            <div className='col-md-6' style={{ border: "1px solid red" }}>
                <SuperSearch
                    variantType="variant1"
                    themeColor="#FF4200"
                    id="testing"
                    disabled={false}
                    placeholder="Search..."
                    searchIcon={<i className='fa fa-search' />}
                    crossIcon={<i className='fa fa-close' />}

                    ApiLink={"https://dummyjson.com/products/search?q="}
                    method="get"
                    postBody={{
                        // addedBy: '',
                        // addedDate: '2022-07-08',
                        // inActive: false,
                        // patientId: 1234567,
                        // id: 0,
                        // notes: '',
                    }}
                    responseStructure={"products"}
                    tableHeight="120"
                    // tableWidth="300px"
                    getSelectedData={handleSelectedData}
                    onChange={(value) => setsuperSearchValue(value)}
                    searchValue={superSearchValue}
                    tableData={[
                        { columName: 'Description', bindingValue: 'description', columnWidth: "70%" },
                        { columName: 'Ttile', bindingValue: 'title', columnWidth: "30%" },
                    ]}

                />
            </div>

        </div>
    )
}

export default SuperSearchPage