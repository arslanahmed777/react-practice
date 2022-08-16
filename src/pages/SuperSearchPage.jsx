import React, { useState } from 'react'
import SuperSearch from '../components/SuperSearch/SuperSearch'

const SuperSearchPage = () => {
    const [superSearchValue, setsuperSearchValue] = useState("")
    return (
        <div className='row justify-content-center'>
            <div className='col-md-6'>
                <SuperSearch
                    ApiLink={'https://jsonplaceholder.typicode.com/posts'}
                    method="get"
                    postBody={{
                        param_list: [
                            {
                                key: 'ICDCODE',
                                value: superSearchValue,
                            },
                        ],
                    }}
                    // tableHeight="120px"
                    // tableWidth="350px"
                    getSelectedData={() => { }}
                    onChange={(value) => setsuperSearchValue(value)}
                    searchValue={superSearchValue}
                    tableData={[
                        {
                            columName: 'ID',
                            bindingValue: 'id',
                        },
                        {
                            columName: 'Title',
                            bindingValue: 'title',
                        },
                        {
                            columName: 'Body',
                            bindingValue: 'body',
                        },
                    ]}
                    id="ICDFormInNEWICD"


                />
            </div>

        </div>
    )
}

export default SuperSearchPage