import React from "react";
import {FormFeedback, FormGroup, Input, Label, UncontrolledTooltip} from "reactstrap";

const InputCheck = ({input, label, toolTip, type, meta: {touched, error}}) => (
    <FormGroup color={touched && error && 'danger'}>
        <Label className="form-check-label" id={`label-${input.name}`}>
            <Input {...input} placeholder={label} type={type}/>
            {label}
        </Label>
        {
            touched && error &&
            <FormFeedback>{error}</FormFeedback>
        }
        {
            toolTip &&
            <UncontrolledTooltip placement="right" target={`label-${input.name}`}>
                {toolTip}
            </UncontrolledTooltip>
        }
    </FormGroup>
);

export default InputCheck;