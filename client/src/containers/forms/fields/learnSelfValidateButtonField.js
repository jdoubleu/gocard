import React from "react";
import {
    Button, ButtonGroup, CardText, CardTitle, FormFeedback, FormGroup, Input, Label,
    UncontrolledTooltip
} from "reactstrap";


const selectButton = ({input, content, label, disableLabel, toolTip, type, meta: {touched, error}}) => {
    return (
        <FormGroup color={touched && error && 'danger'}>
            {
                !disableLabel &&
                <h4 className="text-muted" id={`label-${input.name}`}>
                    {label}
                </h4>
            }

            {
                !input.value &&
                <FormGroup>
                    <Button outline block color="primary" type="submit" onClick={() => input.onChange("changed")}>
                        Antwort anzeigen
                    </Button>
                </FormGroup>

            }

            {
                !!input.value &&
                <span>
                <FormGroup check>
                    <h4 className="text-muted">Antwort</h4>
                    <CardTitle>
                        {content.answer}
                    </CardTitle>
                    <Label>
                        <Input {...input} type="radio" value={"true"}/>{' '}
                        Richtig
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label>
                        <Input {...input} type="radio" value={"false"}/>{' '}
                        Falsch
                    </Label>
                </FormGroup>
            </span>
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
        </FormGroup>);
};

export default selectButton;