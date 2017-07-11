import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Alert, Button, Card, CardText, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";
import Logo from "../shared/logo/index";

const Login = ({onLocalLoginClick, isLocalLoginFetching, message}) => {

    const handleClick = (event) => {
        event.preventDefault();
        const creds = {
            email: event.target.email.value.trim(),
            password: event.target.password.value.trim()
        };
        onLocalLoginClick(creds.email, creds.password);
    };

    return (
        <Row>
            <Col sm={12} md={{size: 10, offset: 1}} className="pb-2">
                <h1 className="display-4">Willkommen bei <Logo/></h1>
                <p className="lead">
                    Auf dieser Seite hast du die Möglichkeit, online mit Karteikarten zu lernen.
                    Du kannst deine Karteikarten in Registern verwalten und deine Register mit Freunden teilen.
                </p>
            </Col>

            <Col sm={12} md={{size: 5, offset: 1}} className="mb-2">
                <Card block className="h-100">
                    <CardTitle>
                        <span className="text-muted">Anmelden</span> HSD-Account
                    </CardTitle>

                    <div className="text-left pl-2">
                        <CardText>
                            Studierende der Hochschule Düsseldorf haben die Möglichkeit, sich mit ihrem
                            Hochschul-Account anzumelden.
                        </CardText>

                        <CardText>
                            <a href="http://passport.hs-duesseldorf.de/default.aspx"> Passwort vergessen?</a>
                        </CardText>
                        <Button outline block color="primary">
                            <a href="https://idp.fh-duesseldorf.de/idp/Authn/UserPassword">
                                Anmelden mit HSD-Account
                            </a>
                        </Button>
                    </div>
                </Card>
            </Col>

            <Col sm={12} md={{size: 5, offset: 0}} className="mb-2">
                <Card block className="h-100">
                    <CardTitle>
                        <span className="text-muted">Anmelden</span> GoCard-Account
                    </CardTitle>
                    <div className="text-left pl-2">
                        <CardText>
                            Du hast noch keinen GoCard-Account?
                            <br/>
                            <Link to="/registration">GoCard-Account erstellen</Link>
                        </CardText>
                        {
                            message &&
                            <Alert color="danger">
                                <strong>{message}</strong>
                            </Alert>
                        }
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
                            <Button disabled={isLocalLoginFetching} outline block color="primary">
                                Anmelden mit GoCard-Account
                            </Button>
                        </Form>
                    </div>
                </Card>
            </Col>
        </Row>
    );
};

Login.propTypes = {
    onLocalLoginClick: PropTypes.func.isRequired,
    isLocalLoginFetching: PropTypes.bool.isRequired,
    message: PropTypes.string
};

export default Login;
