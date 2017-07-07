import React from "react";
import Headline from "../../components/shared/headline";
import {Button, Card, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import UserIcon from "../../components/shared/user/icon";

class Profile extends React.Component {

    render() {
        return (
            <div>
                <Col sm="12" md={{size: 8, offset: 2}}>
                    <Headline title="Profil Einstellungen"/>

                    <Card block>
                        <div className="text-center">
                            <UserIcon diameter={200}>
                                {this.props.name}
                            </UserIcon>
                        </div>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="name">Anzeigename</Label>
                                <Input type="name" name="name" id="name" placeholder="Anzeigename" required/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">E-Mail Adresse</Label>
                                <Input type="email" name="email" id="email" placeholder="E-Mail Adresse" required/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Passwort</Label>
                                <Input type="password" name="password" id="password" placeholder="Passwort" required/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="confirmPassword">Passwort wiederholen</Label>
                                <Input type="password" name="confirmPassword" id="confirmPassword"
                                       placeholder="Passwort wiederholen" required/>
                            </FormGroup>
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

export default Profile;
