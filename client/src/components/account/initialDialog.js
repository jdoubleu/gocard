import React from "react";
import {Button, Card, CardText, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";


const Dialog = () => {
    return (
        <div>
            <Col sm="12" md={{size: 8, offset: 2}}>
                <Card block>
                    <CardTitle>Fast geschafft!</CardTitle>
                    <CardText>
                        Bitte gib unten deinen Anzeigenamen ein und akzeptiere die EULA.<br/>
                    </CardText>

                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Input type="text" name="displayName" id="displayName" placeholder="Anzeigename"
                                   onBlur={this.validateEmail} required/>
                        </FormGroup>

                        <CardText>
                            EULA PLACEHOLDER
                        </CardText>
                        <Row>
                            <Col>
                                <Button outline block color="danger">Abbrechen</Button>
                            </Col>
                            <Col>
                                <Button outline block color="success">Ich akzeptiere die EULA</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Col>
        </div>
    )
};

export default Dialog;