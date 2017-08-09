import React from "react";
import {Button, CardTitle, FormFeedback, FormGroup, Input, Label, UncontrolledTooltip} from "reactstrap";


const learnSelfValidateButtonField = ({input, content, label, disableLabel, toolTip, meta: {touched, error}}) => {
    return (
        <FormGroup color={touched && error && 'danger'}>
            {
                !disableLabel &&
                <h6 className="text-muted" id={`label-${input.name}`}>
                    {label}
                </h6>
            }

            {
                !input.value &&
                <div>
                    <Button outline block color="primary" type="submit" onClick={() => input.onChange("changed")}>
                        Antwort anzeigen
                    </Button>
                </div>

            }

            {
                !!input.value &&
                <span>
                    <h6 className="text-muted">Antwort</h6>
                    <CardTitle>
                        {content.answer}
                    </CardTitle>
                    <Label check>
                        <Input {...input} type="radio" value={"true"} className="ml-1"/>{' '}Richtig
                    </Label>
                    <Label check>
                        <Input {...input} type="radio" value={"false"} className="ml-1"/>{' '}Falsch
                    </Label>
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

export default learnSelfValidateButtonField;