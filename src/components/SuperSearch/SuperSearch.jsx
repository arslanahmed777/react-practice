import React from 'react'
import styles from "./SuperSearch.module.css"

// ==================== Importing all Input Variants ==========
import InputVariant1 from './InputVariants/InputVariant1'
import InputVariant2 from './InputVariants/InputVariant2'

const SuperSearch = (props) => {
    const onKeyDownPressed = () => {

    }
    const onHandleChange = (e) => {
        let eventValue = e.target.value
        props.onChange(eventValue)
    }
    const inputVariants = {
        variant1: <InputVariant1 variantIconPosition={props.iconPosition} variantSearchIcon={props.searchIcon} variantThemeColor={props.themeColor} value={props.searchValue} variantPlaceholder={props.placeholder} variantDisabled={props.disabled} variantID={props.id} themeColor={props.themeColor} handleChange={onHandleChange} handleOnKeyDown={onKeyDownPressed} />,
        variant2: <InputVariant2 />,

    }
    return (
        <div>
            {inputVariants[props.variantType]}
        </div>
    )
}

export default SuperSearch