import React from 'react';

const GeneralFormTitle = ({title}) => {
    return(
        <div className="row general-form-title-row">
            <div className="col-md-12">
                <h1 className="general-form-title">{title}</h1>
            </div>
        </div>
    )
}

export default GeneralFormTitle