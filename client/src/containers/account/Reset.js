import React from "react";
import {Card, CardGroup, CardTitle, Col, Row} from "reactstrap";
import Logo from "../../components/shared/logo";
import ResetForm from "../forms/Reset";
import {updatePassword} from "../../actions/user";

const Reset = ({match}) => {

    const handleSubmit = (values, dispatch) => {
        return dispatch(updatePassword(match.params.resetToken, values));
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
                        <CardTitle>Passwort ändern</CardTitle>
                        <ResetForm onSubmit={handleSubmit}/>
                    </Card>
                </CardGroup>
            </Col>
        </Row>
    )
};

export default Reset;
