import React from "react";
import {Card, CardTitle, Col, Row} from "reactstrap";
import Logo from "../shared/logo";
import ResetForm from "../forms/Reset";
import {updatePassword} from "../../actions/user";
import queryString from "query-string";
import {RequestError} from "../../middleware/callAPI";
import {SubmissionError} from "redux-form";

const Reset = ({location}) => {

    const handleSubmit = (values, dispatch) => {
        const query = queryString.parse(location.search || '');
        return dispatch(
            updatePassword(query.token, query.identifier, values)
        ).catch(
            error => {
                if (error instanceof RequestError) {
                    throw new SubmissionError({_error: error.message})
                }
            }
        );
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
                    <CardTitle>Passwort ändern</CardTitle>
                    <ResetForm onSubmit={handleSubmit}/>
                </Card>
            </Col>
        </Row>
    )
};

export default Reset;
