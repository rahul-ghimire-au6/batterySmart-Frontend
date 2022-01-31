import React, { Fragment } from 'react'
import { ErrorMessage, useField } from 'formik';

export default function Input1({ label, ...props }) {
    const [field, meta] = useField(props);
    let {idvalue} = props

    return (
        <Fragment>
       <select
        className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
        {...field} {...props}
        autoComplete="off">
        </select>
        <ErrorMessage component="div" name={field.name} id={idvalue} style={{whiteSpace: "pre-wrap"}} />
        </Fragment>
    )
}


