import React, { Fragment } from 'react';

const GeneralFormInput = ({col, smallcol, lable, name, placeholder, onChange, value, error}) => {
    return(
        <Fragment>
            <div className={"col-md-"+col+" col-"+smallcol}>
                <lable className="general-form-label">{lable}</lable><br/>
                <input type="text" name={name} placeholder={placeholder} className={ error ? ("general-form-input-text-error") : ("general-form-input-text")} onChange={onChange} value={value}></input>
                {error ? (<span className="general-form-input-error">{error}</span>): (null)}
            </div>
        </Fragment>
    )
}

export default GeneralFormInput