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
    }

    return errors
};

const LoginForm = props => {
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

            <Button outline block color="primary" type="submit" disabled={submitting}>
                Anmelden mit GoCard-Account
            </Button>
        </Form>
    )
};

export default reduxForm({
    form: 'loginForm',
    validate
})(LoginForm);