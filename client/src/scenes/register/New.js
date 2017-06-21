import React from "react";
import Header from '../../components/shared/header';
import {Form, Card, Row, Col, Button} from "reactstrap";
import RegisterForm from '../../components/registers/form';

class New extends React.Component {

    render() {
        return (
            <div>
                <Header
                    title="Neues Register"
                    lead="Hier kannst du ein neues Register für deine Karteikarten erstellen."
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
            </div>
        );
    }
}

export default New;
