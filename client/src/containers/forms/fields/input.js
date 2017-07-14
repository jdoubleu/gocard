import React from "react";
import {FormFeedback, FormGroup, Input, Label} from "reactstrap";

const InputField = ({input, label, disableLabel, type, meta: {touched, error}}) => (
    <FormGroup color={touched && error && 'danger'}>
        {
            !disableLabel &&
            <Label>
                {label}
            </Label>
        }
        <Input {...input} placeholder={label} type={type}/>
        {
            touched && error &&
            <FormFeedback>{error}</FormFeedback>
        }
    </FormGroup>
);

export default InputField;