import React from "react";
import Header from "../../components/shared/headline";
import {Button, Card, Col, Form, Row} from "reactstrap";
import RegisterForm from "../../modules/registers/form";

class Edit extends React.Component {
    render() {
        return (
            <div>
                <Col sm="12" md={{size: 8, offset: 2}}>
                    <Header
                        title="Register bearbeiten"
                        lead="Hier kannst dein Register bearbeiten."
                    />

                    <Card block>
                        <Form>
                            <RegisterForm />
                            <Row>
                                <Col>
                                    <Button outline block color="danger">Abbrechen</Button>
                                </Col>
                                <Col>
                                    <Button outline block color="primary">Speichern</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </div>
        );
    }
}

export default Edit;
