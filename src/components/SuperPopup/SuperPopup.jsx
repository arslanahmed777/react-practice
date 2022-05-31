import React from 'react'
import styles from "./SuperPopup.module.css"
const SuperPopup = ({ children, zIndex }) => {
    return (
        <div className={styles.Main_Wrapper} style={{ zIndex: zIndex ? zIndex : 3 }}>
            <div className={styles.Mini_Wrapper}>
                <div className={styles.body}>
                    {children}
                </div>

            </div>

        </div>
    )
}

export default SuperPopup