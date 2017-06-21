import React from "react";
import Header from '../../components/shared/header';
import {Card, Form, FormGroup, Input, Button, Label, Row, Col} from "reactstrap";
import UserIcon from "../../components/shared/user/icon";

class Profile extends React.Component {

      render() {
        return (
            <div>
                <Header
                    title="Profil Einstellungen"
                />

                <Card block>
                  <div className="text-center">
                    <UserIcon name={this.props.name} diameter={200}/>
                  </div>
                  <Form onSubmit={this.handleSubmit}>
                      <FormGroup>
                          <Label for="name">Anzeigename</Label>
                          <Input type="name" name="name" id="name" placeholder="Anzeigename"  required/>
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
                          <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Passwort wiederholen" required/>
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
            </div>
        );
    }
}



Profile.defaultProps = {
   name: "Frank N Stein",

}

export default Profile;
