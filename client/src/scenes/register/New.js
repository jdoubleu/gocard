import React from "react";
import Header from "../../modules/shared/header";
import {Button, Card, Col, Form, Row} from "reactstrap";
import RegisterForm from "../../modules/registers/form";

class New extends React.Component {

    render() {
        return (
            <div>
                <Col sm="12" md={{size: 8, offset: 2}}>
                    <Header
                        title="Neues Register"
                        lead="Hier kannst du ein neues Register für Deine Karteikarten erstellen."
                    />

                    <Card block>
                        <Form>
                            <RegisterForm />
                            <Row>
                                <Col>
                                    <Button outline block color="danger">Abbrechen</Button>
                                </Col>
                                <Col>
                                    <Button outline block color="primary">Erstellen</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </div>
        );
    }
}

export default New;
