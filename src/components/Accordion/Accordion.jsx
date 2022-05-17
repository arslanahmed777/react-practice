import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Accordioncss from "./Accordion.module.css";

const Accordion = ({ active, onToggle, header, styling, activeStyling, gap, activeIcon, notActiveIcon, activeIconStyling, notActiveIconStyling, children }) => {
    const contentEl = useRef();
    return (
        <div style={{ marginBottom: gap }} className={Accordioncss.accordion_item}>
            <button className={Accordioncss.accordion_button} style={active ? activeStyling : styling} onClick={onToggle}>
                {header}
                <span style={active ? activeIconStyling : notActiveIconStyling}>{active ? activeIcon : notActiveIcon} </span>
            </button>
            <div ref={contentEl} className={Accordioncss.accordion_wrapper} style={active ? { height: contentEl.current.scrollHeight } : { height: '0px' }}>
                {children}
            </div>
        </div>
    );
};

// Specifies the default values for props:
Accordion.defaultProps = {
    header: '',
    gap: "0px",
    activeIcon: "—",
    notActiveIcon: "+",
    styling: {},
    activeStyling: {
        backgroundColor: "#105057",
        color: "white"
    },
    activeIconStyling: { fontSize: "10px" },
    notActiveIconStyling: { fontSize: "10px" }
};
Accordion.propTypes = {
    active: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
};

export default Accordion;