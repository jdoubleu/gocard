import React from "react";
import {Form, Card, Row, Col, Button} from "reactstrap";
import RegisterForm from '../../components/registers/form';

class New extends React.Component {

    render() {
        return (
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
        );
    }
}

export default New;
