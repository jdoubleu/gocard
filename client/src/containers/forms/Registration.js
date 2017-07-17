import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, CardText, Form} from "reactstrap";
import InputField from "./fields/input";
import {Link} from "react-router-dom";

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Eine E-Mail Adresse ist erforderlich.'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Ungültige E-Mail Adresse.'
    }

    if (!values.password) {
        errors.password = 'Ein Passwort ist erforderlich.'
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{8,}$/i.test(values.password)) {
        errors.password = 'Dein Passwort muss eine Ziffer, einen Kleinbuchstaben, einen Großbuchstaben und mindestens 8 Zeichen beinhalten'
    }

    if (!values.password_confirm) {
        errors.password_confirm = 'Passwort wiederholen.'
    } else if (values.password !== values.password_confirm) {
        errors.password_confirm = 'Passwörter stimmen nicht überein.'
    }


    return errors
};

const RegistrationForm = props => {
    const {error, handleSubmit, submitting, submitSucceeded} = props;
    return !submitSucceeded ? (
        <Form onSubmit={handleSubmit}>
            {
                error &&
                <Alert color="danger">
                    {error}
                </Alert>
            }
            <Field
                name="email"
                type="text"
                component={InputField}
                label="E-Mail Adresse"
                disableLabel
            />
            <Field
                name="password"
                type="password"
                component={InputField}
                label="Passwort"
                disableLabel
            />
            <Field
                name="password_confirm"
                type="password"
                component={InputField}
                label="Passwort wiederholen"
                disableLabel
            />

            <Button outline block color="primary" type="submit" disabled={submitting}>
                Registieren
            </Button>
        </Form>
    ) : (
        <div>
            <hr/>
            <CardText>
                Eine E-Mail mit einem Aktivierungslink für deinen Account, wurde an deine E-Mail Adresse versendet.
                Nach der Aktivierung kannst du dich mit deinem Account anmelden.
            </CardText>
            <Link to="/" className="btn btn-outline-success btn-block">Zurück zum Login</Link>
        </div>
    )
};

export default reduxForm({
    form: 'registrationForm',
    validate
})(RegistrationForm);