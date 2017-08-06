import React from "react";
import {
    Button, CardTitle, FormFeedback, FormGroup, Input, Label,Row, Col,
    UncontrolledTooltip
} from "reactstrap";


const learnSelfValidateButtonField = ({input, content, label, disableLabel, toolTip, type, meta: {touched, error}}) => {
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

                    <h4 className="text-muted">Antwort</h4>
                    <CardTitle>
                        {content.answer}
                    </CardTitle>
                    <Row check >
                        <Col>
                        <Label>
                        <Input {...input} type="radio" value={"true"} className="ml-1"/>
                        Richtig
                        </Label>
                        </Col>


                <Col check>
                    <Label>
                        <Input {...input} type="radio" value={"false"} className="ml-1"/>
                        Falsch
                    </Label>
                </Col>
                        </Row>
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