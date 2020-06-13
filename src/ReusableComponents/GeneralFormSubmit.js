import React, { Fragment } from 'react';

const GeneralFormButton = ({col, smallcol, text, onClick}) => {
    return(
        <Fragment>
            <div className={"col-md-"+col+" col-"+smallcol}>
                <button className="general-form-submit" onClick={onClick}>{text}</button>
            </div>
        </Fragment>
    )
}

export default GeneralFormButton