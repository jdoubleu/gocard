import React from "react";
import {Card, CardGroup, CardText, CardTitle, Col, Row} from "reactstrap";
import Logo from "../../components/shared/logo";
import ForgottenForm from "../forms/Forgotten";
import {requestPasswordReset} from "../../actions/user";
import {SubmissionError} from "redux-form";

const Forgotten = () => {

    const handleSubmit = (values, dispatch) => {
        return dispatch(requestPasswordReset(values)).catch(error => {
            if (error instanceof SubmissionError) {
                throw error;
            }
        });
    };

    return (
        <Row>
            <Col sm="12" md={{size: 8, offset: 2}}>
                <div className="pb-2">
                    <h1 className="display-4 hidden-xs-down">Willkommen bei <Logo/></h1>
                    <h1 className="hidden-sm-up">Willkommen bei <Logo/></h1>
                    <p className="lead">
                        Unserer digitalen Lernplattform. Lernen mit Karteikarten im Web war noch nie so einfach.
                    </p>
                </div>

                <CardGroup>
                    <Card block>
                        <CardTitle>Passwort zurücksetzen</CardTitle>
                        <CardText>
                            Um dein Passwort zurückzusetzen musst bitte deine Email Adresse angeben.
                        </CardText>
                        <ForgottenForm onSubmit={handleSubmit}/>
                    </Card>
                </CardGroup>
            </Col>
        </Row>
    )
};

export default Forgotten;
