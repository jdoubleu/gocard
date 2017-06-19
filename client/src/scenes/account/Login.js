import React from "react";
import {Link} from "react-router-dom";
import {Button, Card, CardGroup, CardText, CardTitle, Form, FormGroup, Input} from "reactstrap";

class Login extends React.Component {
    render() {
        return (
            <div>
                <h1>Login</h1>
                <p>Willkommen bei GoCard!</p>
                <CardGroup>
                    <Card block>
                        <CardTitle>HSD-Account</CardTitle>
                        <CardText>
                            Studierende der Hochschule Düsseldorf haben die Möglichkeit, sich mit ihrem Hochschule
                            Account anzumelden.<br/>
                            <Link to="http://passport.hs-duesseldorf.de/default.aspx">Passwort vergessen?</Link>
                        </CardText>

                        <Button outline color="primary">Anmelden mit HSD-Account</Button>
                    </Card>
                    <Card block>
                        <CardTitle>GoCard Account</CardTitle>
                        <CardText>
                            Möchtest du einen GoCard Account erstellen? <br/>
                            <Link to="/registration">GoCard Account erstellen</Link>
                        </CardText>

                        <Form>
                            <FormGroup>
                                <Input type="email" name="email" id="email" placeholder="E-Mail Adresse"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" name="password" id="password" placeholder="Passwort"/>
                            </FormGroup>
                            <Link to="/reset">Passwort vergessen?</Link>
                            <Button outline block color="primary">Anmelden mit GoCard-Account</Button>
                        </Form>
                    </Card>
                </CardGroup>
            </div>
        );
    }
}
export default Login;
