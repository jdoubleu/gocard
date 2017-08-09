import React from "react";
import {Card, CardText, CardTitle, Col, Row} from "reactstrap";
import Logo from "../shared/logo";
import ForgottenForm from "../forms/Forgotten";
import {requestPasswordReset} from "../../actions/user";
import {SubmissionError} from "redux-form";
/**
 * Form for Password reset. And dispatch for Password reset request.
 */
const Forgotten = () => {

    const handleSubmit = (values, dispatch) => {
        return dispatch(requestPasswordReset(values.email)).catch(error => {
            if (error instanceof SubmissionError) {
                throw error;
            }
        });
    };

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
                <Card block>
                    <CardTitle>Passwort zurücksetzen</CardTitle>
                    <CardText>
                        Um dein Passwort zurückzusetzen musst bitte deine Email Adresse angeben.
                    </CardText>
                    <ForgottenForm onSubmit={handleSubmit}/>
                </Card>
            </Col>
        </Row>
    )
};

export default Forgotten;
