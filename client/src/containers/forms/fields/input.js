import React from "react";
import {FormFeedback, FormGroup, Input, Label, UncontrolledTooltip} from "reactstrap";

const InputField = ({input, label, disableLabel, toolTip, type, meta: {touched, error}}) => (
    <FormGroup color={touched && error && 'danger'}>
        {
            !disableLabel &&
            <Label id={`label-${input.name}`}>
                {label}
            </Label>
        }
        <Input {...input} placeholder={label} type={type}/>
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

export default InputField;