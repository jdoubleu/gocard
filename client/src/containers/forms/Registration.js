import React from "react";
import {Field, reduxForm} from "redux-form";
import {loginUser} from "../../actions/auth";
import {connect} from "react-redux";
import {Alert, Button, Form} from "reactstrap";
import InputField from "./fields/input";

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password !== values.password_confirm) {
        errors.password = ' '
    }

    if (!values.password_confirm) {
        errors.password_confirm = 'Required'
    } else if (values.password !== values.password_confirm) {
        errors.password_confirm = 'Passwort muss gleich seien'
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