import React from "react";
import {Card, CardGroup, CardText, CardTitle, Col} from "reactstrap";
import Logo from "../../components/shared/logo";
import ResetForm from "../forms/Reset";
import {requestPasswordReset} from "../../actions/user";

const Reset = () => {

    const handleSubmit = (values, dispatch) => {
        return dispatch(requestPasswordReset(values));
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
                    <CardTitle>Passwort zurücksetzen</CardTitle>
                    <CardText>
                        Um dein Passwort zurückzusetzen musst bitte deine Email Adresse angeben.
                    </CardText>
                    <ResetForm onSubmit={handleSubmit}/>
                </Card>
            </CardGroup>
        </Col>
    )
};

export default Reset;
