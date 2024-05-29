import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef(( props, refs ) => {
    // state for hidden or visbile
    const [ hidden, setHidden ] = useState(false)

    // two styles for hidden and visible
    const hiddenWhenVisible = { display: hidden ? 'none' : '' }
    const showWhenVisible = { display: hidden ? '' : 'none' }

    // function to toggle hidden state from 'true' to 'false'
    const toggleVisibility = () => {
        setHidden(oldState => !oldState)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <>
            <div style={hiddenWhenVisible}>
                <button onClick={toggleVisibility}>{props.btnLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel {props.btnLabel}</button>
            </div>
        </>
    )
})

export default Togglable