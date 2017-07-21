import React from "react";
import {Card, CardGroup, CardTitle, Col} from "reactstrap";
import Logo from "../../components/shared/logo";
import ResetForm from "../forms/Reset";
import {updatePassword} from "../../actions/user";

const Reset = ({match}) => {

    const handleSubmit = (values, dispatch) => {
        return dispatch(updatePassword(match.params.resetToken, values));
    };

    return (
        <Col sm="12" md={{size: 8, offset: 2}}>
            <div className="pb-2">
                <h1 className="display-4">Willkommen bei <Logo/></h1>
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
    )
};

export default Reset;
