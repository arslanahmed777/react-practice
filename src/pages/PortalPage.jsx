import React, { useState } from 'react'
import PortalModal from '../components/PortalComponent/Modal/PortalModal';
import ReactPortal from '../components/PortalComponent/ReactPortal'

const PortalPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>PortalPage
            <button className='btn btn-primary' onClick={() => setIsOpen(true)}>    Click to Open Modal   </button>

            <PortalModal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
                This is Modal Content!
            </PortalModal>
        </div>
    )
}

export default PortalPage