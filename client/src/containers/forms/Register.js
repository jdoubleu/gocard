import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, Form} from "reactstrap";
import InputField from "./fields/input";

const validate = values => {
    const errors = {};

    if (!values.title) {
        errors.title = 'Du musst deinem Register einen Titel geben'
    }

    return errors
};

const RegisterForm = props => {
    const {error, handleSubmit, submitting, submitLabel} = props;
    return (
        <Form onSubmit={handleSubmit}>
            {
                error &&
                <Alert color="danger">
                    {error}
                </Alert>
            }

            <Field
                name="title"
                type="text"
                component={InputField}
                label="Title"
            />

            <Field
                name="description"
                type="textarea"
                component={InputField}
                label="Beschreibung"
            />

            <Button outline block color="primary" type="submit" disabled={submitting}>
                {submitLabel}
            </Button>
        </Form>
    )
};

export default reduxForm({
    form: 'registerForm',
    validate
})(RegisterForm);