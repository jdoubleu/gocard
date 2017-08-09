import React from "react";
import {Card, CardTitle, Col, Row} from "reactstrap";
import Logo from "../shared/logo";
import ResetForm from "../forms/ResetForgotten";
import {updatePassword} from "../../actions/user";

const Reset = ({match}) => {

    const handleSubmit = (values, dispatch) => {
        return dispatch(updatePassword(match.params.resetToken, values));
    };

    return (
        <Row className="mt-4">
            <Col sm="12" lg={{size: 5, offset: 1}}>
                <h1 className="display-4 hidden-xs-down">Willkommen bei <Logo/></h1>
                <h1 className="hidden-sm-up">Willkommen bei <Logo/></h1>
                <p className="lead">

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
