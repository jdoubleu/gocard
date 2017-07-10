import React from "react";
import Headline from "../../components/shared/headline";
import {Button, Card, Col, Form, Row} from "reactstrap";
import RegisterForm from "../../components/register/modules/form";

class Edit extends React.Component {
    render() {
        return (
            <div>
                <Col sm="12" md={{size: 8, offset: 2}}>
                    <Headline title="Register bearbeiten">
                        Hier kannst dein Register bearbeiten.
                    </Headline>

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
