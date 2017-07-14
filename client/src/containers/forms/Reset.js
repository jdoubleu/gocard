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

    return errors
};

const ResetForm = props => {
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

            <Button outline block color="primary" type="submit" disabled={submitting}>
                Zurücksetzen
            </Button>
        </Form>
    )
};

export default reduxForm({
    form: 'resetForm',
    validate
})(ResetForm);