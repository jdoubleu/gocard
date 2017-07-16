import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, Form} from "reactstrap";
import InputField from "./fields/input";
import InputMembers from "./fields/inputMembers";

const validate = values => {
    const errors = {};

    if (!values.title) {
        errors.title = 'Required'
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

            <Field
                name="members"
                component={InputMembers}
                label="Mitglieder"
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