import React, { Fragment } from 'react';

const GeneralComponentMsg = ({msg, success=false, fail=false, warn=false}) => {
    return(
        <Fragment>
            <p className={success ? ("general-component-msg general-component-msg-succ") : (fail ? ("general-component-msg general-component-msg-fail") : (warn ? ("general-component-msg general-component-msg-warn") : (null)))}>{msg}</p>
        </Fragment>
    )
}

export default GeneralComponentMsg