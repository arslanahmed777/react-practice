import React, { useState } from 'react'
import SuperPopup from '../components/SuperPopup/SuperPopup'

const ExampleComponent1 = () => {
    return (
        <div>
            I am child componenet
        </div>
    )
}
const SuperPopupPage = () => {
    const [openPopup, setopenPopup] = useState(false)
    return (
        <div>
            <button onClick={(() => setopenPopup(true))} className='btn btn-success'>Open popup</button>
            <button onClick={(() => setopenPopup(false))} className='btn btn-danger'>Close popup</button>
            {openPopup ? (<SuperPopup zIndex={44} size={"xs"} position="center_center">
                <ExampleComponent1 />
            </SuperPopup>) : null}
        </div>
    )
}

export default SuperPopupPage