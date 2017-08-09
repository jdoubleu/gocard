import React from "react";
import {Card, CardTitle, Col, Row} from "reactstrap";
import Logo from "../shared/logo";
import ResetForm from "../forms/Reset";
import {updatePassword} from "../../actions/user";
import queryString from "query-string";

const Reset = ({location}) => {

    const handleSubmit = (values, dispatch) => {
        const query = queryString.parse(location.search || '');
        return dispatch(updatePassword(query.token, query.identifier, values));
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
