import React from 'react'
import styles from "./InputVariants.module.css"
const InputVariant1 = (props) => {
    return (
        <div>InputVariant1
            <input
                style={{ color: props.variantThemeColor }}
                onKeyDown={props.handleOnKeyDown}
                disabled={props.variantDisabled}
                onChange={props.handleChange}
                value={props.searchValue}
                id={`superSearchInputField_${props.variantID}`}
                type="text"
                autoComplete="off"
                className="col yellowsearch"
                placeholder={props.variantPlaceholder}
            />
            {props.variantSearchIcon}

        </div>
    )
}

export default InputVariant1