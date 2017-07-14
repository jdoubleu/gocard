import React from "react";
import Headline from "../shared/headline";
import {Button, Card, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";

const Edit = ({handleSubmit, title, description, handleInputChange}) => {
    return (
        <Col sm="12" md={{size: 8, offset: 2}}>
            <Headline title="Register bearbeiten">
                Hier kannst dein Register bearbeiten.
            </Headline>

            <Card block>
                <Form>
                    <FormGroup>
                        <Label for="title">Titel</Label>
                        <Input type="text" name="title" id="title" placeholder="Titel des Registers"
                               value={title} onChange={handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Beschreibung</Label>
                        <Input type="textarea" name="description" id="description"
                               placeholder="Beschreibung des Registers" value={description}
                               onChange={handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="members">Mitglieder</Label>
                    </FormGroup>

                    <Row>
                        <Col>
                            <Button outline block color="danger">Abbrechen</Button>
                        </Col>
                        <Col>
                            <Button outline block color="primary" onClick={handleSubmit}>Erstellen</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Col>
    )
};

export default Edit;
