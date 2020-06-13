import React, { Fragment } from 'react';

const GeneralFormSelect = ({col, smallcol, lable, name, disabledText, options, onChange, error}) => {
    return(
        <Fragment>
            <div className={"col-md-"+col+" col-"+smallcol}>
                <lable className="general-form-label">{lable}</lable><br/>
                <select className={ error ? ("general-form-input-text-error") : ("general-form-input-text")} name={name} onChange={onChange}>
                    {disabledText ? (<option selected disabled>{disabledText}</option>) : (null)}
                    {options.map((o, key) => <option key={key}>{o}</option>)}
                </select>
                {error ? (<span className="general-form-input-error">{error}</span>): (null)}
            </div>
        </Fragment>
    )
}

export default GeneralFormSelect