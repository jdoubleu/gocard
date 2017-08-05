import React from "react";
import {Button, ButtonGroup, FormFeedback, FormGroup, Input, Label, UncontrolledTooltip} from "reactstrap";

const selectButton = ({input, content, label, disableLabel, toolTip, type, meta: {touched, error}}) => (
    <FormGroup color={touched && error && 'danger'} tag="fieldset">
        {
            !disableLabel &&
            <h4 className="text-muted" id={`label-${input.name}`}>
                {label}
            </h4>
        }

        {
            content.options.map((option, index) =>
                <FormGroup>
                    <Label>
                        <Input {...input} name={input.name} type="radio" value={index}/>{' '}
                        {option}
                    </Label>
                </FormGroup>
            )
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

export default selectButton;