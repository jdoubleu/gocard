/*
import React from "react";
import PropTypes from "prop-types";
import Headline from "../../components/shared/headline";
import {Button, Card, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";

const NewCard = ({}) => {

    return (
        <Col sm="12" md={{size: 8, offset: 2}}>
            <Headline title="Neues Karteikarte">
                Hier kannst du ein neues Register für Deine Karteikarten erstellen.
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
    );

}

NewCard.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default NewCard;




*/
