import React, { useState } from 'react'
import Accordion from "react-accordian"
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
const AccordionpkgPage = () => {

    const [clicked, setClicked] = useState("0")

    const handleToggle = (index) => {

        if (clicked === index) return setClicked('0');
        setClicked(index)
    };

    return (
        <div>
            <Accordion activeIcon={"asdf"} styling={mystyle} activeStyling={myActiveStyle} active={clicked === 0} header="How to purify water" onToggle={() => handleToggle(0)} >
                aasdfasdfsdf
            </Accordion>
        </div>
    )
}

export default AccordionpkgPage
