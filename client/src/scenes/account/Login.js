import React from "react";
import {Link} from "react-router-dom";
import {Button, Card, CardGroup, CardText, CardTitle, Col, Form, FormGroup, Input} from "reactstrap";
import Logo from "../../components/shared/logo/logo";
import Api from "../../lib/ApiClient";

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.loginGoCard = this.loginGoCard.bind(this);
        this.loginHSD = this.loginHSD.bind(this);
        this.api = new Api.ApiClient("http://localhost/api/v1");
    }

    loginGoCard(event) {

        this.api.loginUser({email: event.target.email.value, password: event.target.password.value}).then(res => {
            console.log(res.body);
        });

        event.preventDefault();
    };

    loginHSD(event) {

    };

    render() {
        return (
            <div>
                <Col>
                    <Col sm={{size: '10', offset: 1}} md="10" className="lead">
                        <h1 className="display-4"> Willkommen bei <Logo/></h1>
                        <hr/>
                        Auf dieser Webseite hast du die Möglichkeit, online mit Karteikarten zu lernen. Du kannst deine
                        Karteikarten in Registern verwalten und deine Register mit Freunden teilen.
                    </Col>

                    <br/>

                    <CardGroup>
                        <Card block>
                            <CardTitle>
                                <span className="text-muted">Anmelden</span> HSD-Account</CardTitle>

                            <Col sm={{offset: 0.5}} md="11">
                                <CardText className="text-left">

                                    Studierende der Hochschule Düsseldorf haben die Möglichkeit, sich mit ihrem
                                    Hochschul-Account anzumelden.

                                </CardText>

                                <CardText>
                                    <a href="http://passport.hs-duesseldorf.de/default.aspx"> Passwort vergessen?</a>
                                </CardText>
                                <div className="text-left">
                                    <Button outline color="primary"><a
                                        href="https://idp.fh-duesseldorf.de/idp/Authn/UserPassword">Anmelden mit
                                        HSD-Account</a></Button>


                                </div>
                            </Col>
                        </Card>
                        <Col sm="1">

                        </Col>

                        <Card block>
                            <CardTitle>
                                <span className="text-muted">Anmelden</span> GoCard-Account</CardTitle>
                            <CardText>
                                <Col sm={{offset: 0.5}} md="11">
                                    Du hast noch keinen GoCard-Account?
                                    <br/>
                                    <Link to="/registration">GoCard-Account erstellen</Link>
                                </Col>
                            </CardText>

                            <Form onSubmit={this.loginGoCard}>
                                <Col>
                                    <FormGroup>
                                        <Input type="email" name="email" id="email" placeholder="E-Mail Adresse"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="password" name="password" id="password" placeholder="Passwort"/>
                                    </FormGroup>
                                    <CardText>
                                        <Link to="/reset">Passwort vergessen?</Link>
                                    </CardText>
                                    <div className="text-left">
                                        <Button outline color="primary">Anmelden mit GoCard-Account</Button>
                                    </div>
                                </Col>
                            </Form>
                        </Card>
                    </CardGroup>
                </Col>
            </div>
        );
    }
}
export default Login;
