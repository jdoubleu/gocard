import React from "react";
import {Input} from "reactstrap";

const InputField = ({input, label, type, meta: {touched, error}}) => (
    <Input {...input} placeholder={label} type={type}/>
);

export default InputField;