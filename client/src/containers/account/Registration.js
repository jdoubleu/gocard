import React from "react";
import {Card, CardText, CardTitle, Col, Row} from "reactstrap";
import Logo from "../shared/logo/index";
import RegistrationForm from "../../containers/forms/Registration";
import {addUser} from "../../actions/user";
import {SubmissionError} from "redux-form";
import {RequestError} from "../../middleware/callAPI";
/**
 * Form for Registration. In this form the User can Create a new Account. If the values are corrects the user will be added.
 */
const Registration = () => {

    const handleSubmit = (values, dispatch) => {
        return dispatch(addUser({
            ...values,
            displayName: ''
        })).catch(error => {
            if (error instanceof RequestError) {
                if (error.statusCode === 409) {
                    throw new SubmissionError({_error: 'Registrierung fehlgeschlagen! E-Mail Adresse bereits vorhanden.'})
                }
                throw new SubmissionError({_error: error.message})
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
                    <CardTitle>Registrieren</CardTitle>
                    <CardText>
                        Registriere dich jetzt mit deiner Email Adresse und einem von dir gewählten Passwort, um
                        einen eigenen Account zu erstellen.
                    </CardText>
                    <RegistrationForm onSubmit={handleSubmit}/>
                </Card>
            </Col>
        </Row>
    )
};

export default Registration;

