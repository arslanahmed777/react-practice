import React, { useState } from 'react'
import SuperSearch from '../components/SuperSearch/SuperSearch'

const SuperSearchPage = () => {
    const [superSearchValue, setsuperSearchValue] = useState("")
    return (
        <div className='row justify-content-center'>
            <div className='col-md-6'>
                <SuperSearch
                    variantType="variant1"
                    themeColor="#FF4200"
                    searchValue={superSearchValue}
                    onChange={(value) => setsuperSearchValue(value)}
                    id="testing"
                    disabled={false}
                    placeholder="Search..."
                    searchIcon={<i className='fa fa-user' />}
                    iconPosition="left"

                />
            </div>

        </div>
    )
}

export default SuperSearchPage