import React from "react";
import {FormFeedback, FormGroup, Input, UncontrolledTooltip} from "reactstrap";

const learnTextInputField = ({input, content, label, disableLabel, toolTip, meta: {touched, error}}) => (
    <FormGroup color={touched && error && 'danger'}>
        {
            !disableLabel &&
            <h6 className="text-muted" id={`label-${input.name}`}>
                {label}
            </h6>
        }

        <h4 className="text-muted">Antwort</h4>
        <Input {...input} name={input.name} type="text" placeholder="Gib deine Antwort ein."/>

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

export default learnTextInputField;