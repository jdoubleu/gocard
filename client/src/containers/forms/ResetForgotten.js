import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, Form} from "reactstrap";
import InputField from "./fields/input";

const validate = values => {
    const errors = {};

    if (!values.oldPassword) {
        errors.oldPassword = 'Dein altes Passwort ist erforderlich.'
    }

    if (!values.newPassword) {
        errors.newPassword = 'Ein Passwort ist erforderlich.'
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{8,}$/i.test(values.password)) {
        errors.newPassword = 'Dein Passwort muss eine Ziffer, einen Kleinbuchstaben, einen Großbuchstaben und mindestens 8 Zeichen beinhalten'
    }

    if (!values.newPasswordRepeated) {
        errors.newPasswordRepeated = 'Passwort wiederholen.'
    } else if (values.newPassword !== values.newPasswordRepeated) {
        errors.newPasswordRepeated = 'Passwörter stimmen nicht überein.'
    }

    return errors
};

const ResetForgottenForm = props => {
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
                name="newPassword"
                type="password"
                component={InputField}
                label="Neues Passwort"
                disableLabel
            />

            <Field
                name="newPasswordRepeated"
                type="password"
                component={InputField}
                label="Neues Passwort wiederholen"
                disableLabel
            />

            <Button outline block color="primary" type="submit" disabled={submitting}>
                Passwort ändern
            </Button>
        </Form>
    )
};

export default reduxForm({
    form: 'resetForgottenForm',
    validate
})(ResetForgottenForm);