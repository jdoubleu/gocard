import React from "react";
import {Button, ButtonGroup, FormFeedback, FormGroup, Label, UncontrolledTooltip} from "reactstrap";

const selectButton = ({input, options, label, disableLabel, toolTip, type, meta: {touched, error}}) => (
    <FormGroup color={touched && error && 'danger'}>
        {
            !disableLabel &&
            <Label id={`label-${input.name}`}>
                {label}
            </Label>
        }
        <ButtonGroup className="form-control border-0 p-0">
            {
                options.map((option) =>
                    <Button outline color={input.value === option.value ? 'primary' : 'secondary'}
                            onClick={() => input.onChange(option.value)} active={input.value === option.value}>
                        {option.name}
                    </Button>
                )
            }
        </ButtonGroup>
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