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

    return errors
};

const ResetForm = props => {
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

            <Button outline block color="primary" type="submit" disabled={submitting}>
                Zurücksetzen
            </Button>
        </Form>
    ) : (
        <div>
            <hr/>
            <CardText>
                Eine E-Mail mit Anweisungen zum zurücksetzen des Passwortes wurden an deine E-Mail Adresse versendet.
            </CardText>
            <Link to="/" className="btn btn-outline-success btn-block">Zurück zum Login</Link>
        </div>
    )
};

export default reduxForm({
    form: 'resetForm',
    validate
})(ResetForm);