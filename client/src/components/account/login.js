import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Button, Card, CardGroup, CardText, CardTitle, Col, Form, FormGroup, Input} from "reactstrap";
import Logo from "../shared/logo/index";

const Login = ({onLocalLoginClick}) => {

    const handleClick = (event) => {
        event.preventDefault();
        const creds = {
            email: event.target.email.value.trim(),
            password: event.target.password.value.trim()
        };
        onLocalLoginClick(creds);
    };

    return (
        <Col sm="12" md={{size: 8, offset: 2}}>
            <div className="pb-2">
                <h1 className="display-4">Willkommen bei <Logo/></h1>
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

                    <Form onSubmit={handleClick}>
                        <FormGroup>
                            <Input type="email" name="email" id="email" placeholder="E-Mail Adresse"/>
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" name="password" id="password" placeholder="Passwort"/>
                        </FormGroup>
                        <CardText>
                            <Link to="/reset">Passwort vergessen?</Link>
                        </CardText>

                        <Button outline block color="primary">Anmelden mit GoCard-Account</Button>
                    </Form>
                </Card>
            </CardGroup>
        </Col>
    );
};

Login.propTypes = {
    onLocalLoginClick: PropTypes.func.isRequired,
};

export default Login;
