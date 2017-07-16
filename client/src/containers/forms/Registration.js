import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, Form} from "reactstrap";
import InputField from "./fields/input";

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Du musst eine E-Mail Adresse eingeben'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Du hast eine unglütige E-Mail Adresse eingegeben'
    }

    if (!values.password) {
        errors.password = 'Du musst ein Passwort eingeben'
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{8,}$/i.test(values.password)) {
        errors.password = 'Dein Passwort muss eine Ziffer, einen Kleinbuchstaben, einen Großbuchstaben und mindestens 8 Zeichen beinhalten'
    }

    if (!values.password_confirm) {
        errors.password_confirm = 'Du musst das selbe Passwort hier noch einmal eingeben'
    } else if (values.password !== values.password_confirm) {
        errors.password_confirm = 'Deine Passwörter müssen gleich sein'
    }


    return errors
};

const RegistrationForm = props => {
    const {error, handleSubmit, submitting} = props;
    return (
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
    )
};

export default reduxForm({
    form: 'registrationForm',
    validate
})(RegistrationForm);