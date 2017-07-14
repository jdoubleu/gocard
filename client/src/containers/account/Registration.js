import React from "react";
import {Card, CardGroup, CardText, CardTitle, Col} from "reactstrap";
import Logo from "../../components/shared/logo/index";
import RegistrationForm from "../../containers/forms/Registration";
import {addUser} from "../../actions/user";

const Registration = () => {
    return (
        <Col sm="12" md={{size: 8, offset: 2}}>
            <div className="pb-2">
                <h1 className="display-4">Willkommen bei <Logo/></h1>
                <p className="lead">
                    Auf dieser Seite hast du die Möglichkeit, online mit Karteikarten zu lernen. Du kannst deine
                    Karteikarten in Registern verwalten und deine Register mit Freunden teilen.
                </p>
            </div>

            <CardGroup>
                <Card block>
                    <CardTitle>Registrieren</CardTitle>
                    <CardText>
                        Registriere dich jetzt mit deiner Email Adresse und einem von dir gewählten Passwort, um
                        einen eigenen Account zu erstellen.
                    </CardText>
                    <RegistrationForm onSubmit={handleSubmit}/>
                </Card>
            </CardGroup>
        </Col>
    )
};

const handleSubmit = (values, dispatch) => {
    return dispatch(addUser(values));
};

export default Registration;

