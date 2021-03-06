import React from "react";
import {Alert, Card, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import Logo from "../shared/logo";
import LoginForm from "../forms/Login";
import {loginUser} from "../../actions/auth";
import {SubmissionError} from "redux-form";
import {RequestError} from "../../middleware/callAPI";
import queryString from "query-string";
/**
 * Form for Login. Dispatches loginUser if the User has an Account.
 */
const Login = ({location}) => {

    const handleSubmit = (values, dispatch) => {
        return dispatch(
            loginUser(values)
        ).catch(
            error => {
                if (error instanceof RequestError) {
                    if (error.statusCode === 400 || error.statusCode === 404) {
                        throw new SubmissionError({_error: 'Login fehlgeschlagen! Passwort/E-Mail falsch.'})
                    }
                    throw new SubmissionError({_error: error.message})
                }
            }
        );
    };

    const query = queryString.parse(location.search || '');
    const confirmation = query.confirmation || false;


    return (
        <Row className="mt-4">
            <Col sm="12" lg={{size: 5, offset: 1}}>
                <h1 className="display-4 hidden-xs-down">Willkommen bei <Logo/></h1>
                <h1 className="hidden-sm-up">Willkommen bei <Logo/></h1>
                <p className="lead">
                    Auf dieser Seite hast du die Möglichkeit, online mit Karteikarten zu lernen.
                    Du kannst deine Karteikarten in Registern verwalten und deine Register mit Freunden teilen.
                </p>
            </Col>

            <Col sm="12" lg={{size: 5}}>
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
                            confirmation &&
                            <Alert color="success">
                                E-Mail wurde verifiziert. <b>Du kannst dich jetzt anmelden!</b>
                            </Alert>
                        }
                        <LoginForm onSubmit={handleSubmit}/>
                    </div>
                </Card>
            </Col>
        </Row>
    )
};

export default Login;
