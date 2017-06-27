import React from "react";
import {Link} from "react-router-dom";
import {Button, Card, CardGroup, CardText, CardTitle, Col, Form, FormGroup, Input} from "reactstrap";


import PropTypes from "prop-types";

class Login extends React.Component {

    handleClick(event) {
        const email = this.refs.email;
        const password = this.refs.password;
        const creds = {email: email.value.trim(), password: password.value.trim()};
        this.props.onLocalLoginClick(creds);
    }

    render() {
        return (
            <div>
                <Col sm="12" md={{size: 8, offset: 2}}>
                    <div className="pb-2">
                        <h1 className="display-4">Willkommen bei </h1>
                        <p className="lead">Auf dieser Seite hast du die Möglichkeit, online mit Karteikarten zu lernen.
                            Du kannst
                            deine Karteikarten in Registern verwalten und deine Register mit Freunden teilen.</p>
                    </div>

                    <CardGroup>
                        <Card block>
                            <CardTitle><span className="text-muted">Anmelden</span> HSD-Account</CardTitle>
                            <CardText>
                                Studierende der Hochschule Düsseldorf haben die Möglichkeit, sich mit ihrem
                                Hochschul-Account anzumelden.
                            </CardText>

                            <CardText>
                                <a href="http://passport.hs-duesseldorf.de/default.aspx">Passwort vergessen?</a>
                            </CardText>

                            <Button outline color="primary">Anmelden mit HSD-Account</Button>
                        </Card>
                        <Card block>
                            <CardTitle><span className="text-muted">Anmelden</span> GoCard-Account</CardTitle>
                            <CardText>
                                Hast du bereits einen GoCard-Account? <br/>
                                <Link to="/registration">GoCard-Account erstellen</Link>
                            </CardText>

                            <Form onSubmit={(event) => this.handleClick(event)}>
                                <FormGroup>
                                    <Input type="email" name="email" id="email" ref="email"
                                           placeholder="E-Mail Adresse"/>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="password" name="password" id="password" ref="password"
                                           placeholder="Passwort"/>
                                </FormGroup>
                                <CardText>
                                    <Link to="/reset">Passwort vergessen?</Link>
                                </CardText>

                                <Button outline block color="primary">Anmelden mit GoCard-Account</Button>
                            </Form>
                        </Card>
                    </CardGroup>
                </Col>
            </div>
        );
    }
}


Login.propTypes = {
    onLocalLoginClick: PropTypes.func.isRequired,
};

export default Login;
