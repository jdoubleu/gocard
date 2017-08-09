import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, Form, FormGroup} from "reactstrap";
import InputField from "./fields/input";
import {Link} from "react-router-dom";

/**
 * Redux from for Login.
 */
const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Eine E-Mail Adresse ist erforderlich.'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Ungültige E-Mail Adresse.'
    }

    if (!values.password) {
        errors.password = 'Ein Passwort ist erforderlich.'
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

            <FormGroup>
                <Link to="/forgotten" className="mb-4">Passwort vergessen?</Link>
            </FormGroup>

            <Button outline block color="primary" type="submit" disabled={submitting}>
                {
                    submitting &&
                    <span>...Funkkontakt wird aufgenommen</span>
                }
                {
                    !submitting &&
                    <span>Anmelden mit GoCard-Account</span>
                }
            </Button>
        </Form>
    )
};

export default reduxForm({
    form: 'loginForm',
    validate
})(LoginForm);