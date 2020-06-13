import React, { Fragment } from 'react';

const GeneralFormTextarea = ({col, smallcol, lable, name, onChange, value, error}) => {
    return(
        <Fragment>
            <div className={"col-md-"+col+" col-"+smallcol}>
                <lable className="general-form-label">{lable}</lable><br/>
                <textarea name={name} className={ error ? ("general-form-input-text-error") : ("general-form-input-text")} onChange={onChange} value={value}></textarea>
                {error ? (<span className="general-form-input-error">{error}</span>): (null)}
            </div>
        </Fragment>
    )
}

export default GeneralFormTextarea