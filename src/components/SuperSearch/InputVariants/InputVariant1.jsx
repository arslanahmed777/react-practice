import React from 'react'
import styles from "./InputVariants.module.css"
const InputVariant1 = (props) => {
    return (
        <div className={styles.varriant1}>
            <input
                style={{ color: props.variantThemeColor }}
                onKeyDown={props.handleOnKeyDown}
                disabled={props.variantDisabled}
                onChange={props.handleChange}
                value={props.searchValue}
                id={`superSearchInputField_${props.variantID}`}
                type="text"
                autoComplete="off"
                className={styles.varriant1_input}
                placeholder={props.variantPlaceholder}
            />
            {!props.variantDisabled ? (
                props.searchValue ? (
                    <button className={styles.varriant1_icon} onClick={props.resetComponent}>
                        {props.variantCrossIcon}
                    </button>
                ) : (
                    <button className={styles.varriant1_icon}>
                        {props.variantSearchIcon}
                    </button>
                )
            ) : null}

        </div>
    )
}

export default InputVariant1