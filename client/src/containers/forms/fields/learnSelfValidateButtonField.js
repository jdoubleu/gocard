import React from "react";
import {Button, CardTitle, Col, FormFeedback, FormGroup, Input, Label, Row, UncontrolledTooltip} from "reactstrap";


const learnSelfValidateButtonField = ({input, content, label, disableLabel, toolTip, meta: {touched, error}}) => {
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
                <div>
                    <Button outline block color="primary" type="submit" onClick={() => input.onChange("changed")}>
                        Antwort anzeigen
                    </Button>
                </div>

            }

            {
                !!input.value &&
                <span>

                    <h4 className="text-muted">Antwort</h4>
                    <CardTitle>
                        {content.answer}
                    </CardTitle>
                    <Row check>
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