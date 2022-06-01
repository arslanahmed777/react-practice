import React from 'react'
import styles from "./SuperPopup.module.css"
const SuperPopup = ({ children, zIndex, size, position }) => {
    return (
        <div className={styles.Main_Wrapper} style={{ zIndex: zIndex ? zIndex : 3 }}>
            <div className={styles.Mini_Wrapper}>
                <div className={`${styles.body} ${styles.animate} ${position === "center_center" ? styles.center_center : ""}`}>
                    {children}
                </div>

            </div>

        </div >
    )
}

export default SuperPopup