import React from 'react';

const Input = (props) => {
    let inputClass = 'form-control';

    if (props.type === 'file') {
        inputClass += '-file';
    }

    if (props.hasError !== undefined) {
        inputClass += props.hasError ? ' is-invalid' : ' is-valid';
    }
    return <div>
        {props.label && <label>{props.label}</label>}
        <input
            className={inputClass}
            type={props.type || 'text'}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        />
        {props.hasError && <span className='invalid-feedback'>
            {props.error}
        </span>}
    </div>;
}

Input.defaultProps = {
    onChange: () => { }
}

export default Input;