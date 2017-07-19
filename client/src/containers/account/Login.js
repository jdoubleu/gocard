import React from "react";
import {Button, Card, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import Logo from "../../components/shared/logo";
import LoginForm from "../forms/Login";
import {loginUser} from "../../actions/auth";
import {SubmissionError} from "redux-form";
import {RequestError} from "../../middleware/callAPI";

const Login = () => {

    const handleSubmit = (values, dispatch) => {
        return dispatch(
            loginUser(values)
        ).catch(
            error => {
                if (error instanceof RequestError) {
                    if (error.statusCode === 400) {
                        throw new SubmissionError({_error: 'Login fehlgeschlagen! Passwort/E-Mail falsch.'})
                    }
                    throw new SubmissionError({_error: error.message})
                }
            }
        );
    };

    return (
        <Row>
            <Col sm={12} lg={{size: 10, offset: 1}} className="pb-2">
                <h1 className="display-4">Willkommen bei <Logo/></h1>
                <p className="lead">
                    Auf dieser Seite hast du die Möglichkeit, online mit Karteikarten zu lernen.
                    Du kannst deine Karteikarten in Registern verwalten und deine Register mit Freunden teilen.
                </p>
            </Col>

            <Col sm={12} lg={{size: 5, offset: 1}} className="mb-2">
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

            <Col sm={12} lg={{size: 5, offset: 0}} className="mb-2">
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
                        <LoginForm onSubmit={handleSubmit}/>
                    </div>
                </Card>
            </Col>
        </Row>
    )
};

export default Login;
