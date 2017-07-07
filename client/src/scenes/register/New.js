import React from "react";
import Headline from "../../components/shared/headline";
import {Button, Card, Col, Form, Row} from "reactstrap";
import RegisterForm from "../../modules/registers/form";

class New extends React.Component {

    render() {
        return (
            <div>
                <Col sm="12" md={{size: 8, offset: 2}}>
                    <Headline title="Neues Register">
                        Hier kannst du ein neues Register für Deine Karteikarten erstellen.
                    </Headline>

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
