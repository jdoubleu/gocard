import React from "react";
import {Card, Form, Button, Row, Col} from "reactstrap";
import RegisterForm from '../../components/registers/form';

class Edit extends React.Component {
    render() {
        return (
            <div>
                <h1>Register bearbeiten</h1>
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
            </div>
        );
    }
}

export default Edit;
