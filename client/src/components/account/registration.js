import React from "react";
import {Alert, Button, Card, CardGroup, CardText, CardTitle, Col, Form, FormGroup, Input} from "reactstrap";
import Logo from "../../components/shared/logo/index";
import PropTypes from "prop-types";


const Registration = ({
                          isRegistrationFetching, message, handleSubmit, updatePasswordRepeat,
                          validateEmail, updatePassword, email, password, passwordRepeat, validPassword, validEmail
                      }) => {

    /*const validateEmail = (event) => {
     let email = event.target.value;
     if (email.includes("@")) {
     console.log("@ gefunden ");
     } else {
     //Show error
     }
     };

     const update = (event) => {
     this.setState({
     password: event.target.value
     });
     };


     const validatePassword = (event) => {
     let confirmPw = event.target.value;
     this.setState()
     if (confirmPw === this.state.password) {
     console.log("Passwoerter sind gleich");
     this.setState({
     validatePassword: true
     });
     } else {
     console.log("Passwoerter sind nicht mehr gleich");
     this.setState({
     validatePassword: false
     });
     }
     };

     const handleSubmit = (event) => {
     event.preventDefault();
     };*/

    return (
        <div>
            <Col sm="12" md={{size: 8, offset: 2}}>
                <div className="pb-2">
                    <h1 className="display-4">Willkommen bei <Logo/></h1>
                    <p className="lead">Auf dieser Seite hast du die Möglichkeit, online mit Karteikarten zu lernen.
                        Du kannst
                        deine Karteikarten in Registern verwalten und deine Register mit Freunden teilen.</p>
                </div>

                <CardGroup>
                    <Card block>
                        <CardTitle>Registrieren</CardTitle>
                        <CardText>
                            Registriere dich jetzt mit deiner Email Adresse und einem von dir gewählten Passwort
                            ,um
                            einen eigenen Account zu erstellen.<br/>
                        </CardText>

                        <Form onSubmit={handleSubmit}>
                            {!validEmail &&
                            <Alert color="danger">
                                <strong>E-Mail ungültig!</strong>
                            </Alert>
                            }
                            <FormGroup>
                                <Input type="email" name="email" id="email" placeholder="E-Mail Adresse"
                                       onChange={validateEmail} value={email} required/>
                            </FormGroup>
                            {!validPassword &&
                            <Alert color="danger">
                                <strong>Passwörter sind nicht gleich!</strong>
                            </Alert>
                            }
                            <FormGroup>
                                <Input type="password" name="password" id="password" placeholder="Passwort"
                                       value={password} onChange={updatePassword} required/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" name="confirmPassword" id="confirmPassword"
                                       placeholder="Passwort wiederholen" value={passwordRepeat}
                                       onChange={updatePasswordRepeat} required/>
                            </FormGroup>
                            <Button outline block color="primary"
                                    disabled={!(validPassword && validEmail)}>Erstellen</Button>
                        </Form>
                    </Card>
                </CardGroup>
            </Col>
        </div>
    )
};

Registration.propTypes = {
    validateEmail: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired,
    updatePasswordRepeat: PropTypes.func.isRequired,
    isRegistrationFetching: PropTypes.bool.isRequired,
    email: PropTypes.string,
    password: PropTypes.string,
    passwordRepeat: PropTypes.string,
    message: PropTypes.string,
    validPassword: PropTypes.bool,
    validEmail: PropTypes.bool,
};
export default Registration;
