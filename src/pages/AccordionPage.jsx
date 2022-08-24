import React, { useState } from 'react'
import Accordion from "../components/Accordion/Accordion"

import { FaAngleDoubleDown, FaAngleDoubleRight } from "react-icons/fa";

export const Html1 = () => {
    return (
        <>
            <div className="border p-1">
                <h4>Boiling water is the cheapest and safest method of water purification. Water sources and or channels of distribution may render your water unsafe. For example, parasites and germs are things you may not see by bare eyes, but their effects can be life threatening.</h4>
            </div>
        </>
    )
}

const mystyle = {
    background: "#ba80cd",
    borderRadius: "7px",
    padding: "10px",
    color: "#fff",
}
const myActiveStyle = {
    background: "#a539c9",
    borderRadius: "7px",
    padding: "10px",
    color: "#fff",
}

const myActiveIconStyle = {
    color: "red",
    fontSize: "20px"
}
const mynotActiveIconStyle = {
    color: "red",
    fontSize: "20px"
}

const AccordionPage = () => {
    const [clicked, setClicked] = useState("0")

    const handleToggle = (index) => {

        if (clicked === index) return setClicked('0');
        setClicked(index)
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-6">
                    <Accordion
                        gap="8px"
                        styling={mystyle}
                        activeStyling={myActiveStyle}
                        onToggle={() => handleToggle(0)}
                        active={clicked === 0}
                        header="How to purify water"
                        activeIcon={<FaAngleDoubleDown />}
                        notActiveIcon={<FaAngleDoubleRight />}
                        activeIconStyling={myActiveIconStyle}
                        notActiveIconStyling={mynotActiveIconStyle}
                    >
                        <Html1 />
                    </Accordion>

                    <Accordion
                        gap="8px"
                        styling={mystyle}
                        activeStyling={myActiveStyle}
                        onToggle={() => handleToggle(1)}
                        active={clicked === 1}
                        header="What is the quickest way to freeze water?"
                        activeIcon={<FaAngleDoubleDown />}
                        notActiveIcon={<FaAngleDoubleRight />}
                        activeIconStyling={myActiveIconStyle}
                        notActiveIconStyling={mynotActiveIconStyle}
                    >
                        <h4>Stick a thermometer into the bowl of ice and wait for the temperature of the ice water in the bowl to drop to 17º-20º F. Gently pull one of the bottles out of the bowl and pour it into a clear glass cup or jar. Grab an ice cube and place it in the glass of very cold water to watch the water instantly freeze into ice!</h4>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default AccordionPage
