import React from "react";
import {FormFeedback, FormGroup, Input, Label, UncontrolledTooltip} from "reactstrap";

const learnTextInputField = ({input, content, label, disableLabel, toolTip, type, meta: {touched, error}}) => (
    <FormGroup color={touched && error && 'danger'} tag="fieldset">
        {
            !disableLabel &&
            <h4 className="text-muted" id={`label-${input.name}`}>
                {label}
            </h4>
        }

        {
            <FormGroup>
                <Label>
                    <Input {...input} name={input.name} type="text" placeholder="Gib deine Antwort ein."/>{' '}
                </Label>
            </FormGroup>
        }

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