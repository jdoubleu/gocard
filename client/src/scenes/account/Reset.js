import React from "react";
import {Button, Card, CardGroup, CardText, CardTitle, Col, Form, FormGroup, Input} from "reactstrap";
import Logo from "../../components/shared/logo/logo";

class Reset extends React.Component {

    validate(event) {
        let mail = event.target.value;
        if (mail.includes("@")) {
            //mail senden
        } else {

        }
    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Col sm="12" md={{size: 8, offset: 2}}>
                    <div className="pb-2">
                        <h1 className="display-4">Willkommen bei <Logo/></h1>
                        <p className="lead">Unserer digitalen Lernplattform. Lernen mit Karteikarten im Web war noch nie
                            so einfach.</p>
                    </div>

                    <CardGroup>
                        <Card block>
                            <CardTitle>Passwort zurücksetzen</CardTitle>
                            <CardText>
                                Um dein Passwort zurückzusetzen musst bitte deine Email Adresse angeben.
                            </CardText>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Input type="email" name="email" id="email" placeholder="E-Mail Adresse"
                                           onSubmit={this.validate} required/>
                                </FormGroup>
                                <Button outline block color="primary">Zurücksetzen</Button>
                            </Form>
                        </Card>
                    </CardGroup>
                </Col>
            </div>
        );
    }
}
export default Reset;
