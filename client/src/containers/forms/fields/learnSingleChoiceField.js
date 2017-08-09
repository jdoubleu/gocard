import React from "react";
import {FormFeedback, FormGroup, Input, UncontrolledTooltip} from "reactstrap";

const learnSingleChoiceField = ({input, content, label, disableLabel, toolTip, meta: {touched, error}}) => (
    <FormGroup color={touched && error && 'danger'}>
        {
            !disableLabel &&
            <h6 className="text-muted" id={`label-${input.name}`}>
                {label}
            </h6>
        }

        {
            content.options.map((option, index) =>
                <div key={index}>
                    <Input {...input} name={input.name} type="radio" value={index} className="ml-2"/>{' '}
                    {option}
                </div>
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

export default learnSingleChoiceField;