import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, Form} from "reactstrap";
import InputField from "./fields/input";
import InputCheckField from "./fields/inputCheck";

const validate = values => {
    const errors = {};

    if (!values.displayName) {
        errors.displayName = 'Anzeigename wird benötigt.'
    }

    if (!values.acceptEULA) {
        errors.acceptEULA = 'Akzeptierung der EULA ist erforderlich.'
    }

    return errors
};

const InitialDialogForm = props => {
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
                name="displayName"
                type="text"
                component={InputField}
                label="Anzeigenamen"
            />

            <p>EULA PLACEHOLDER</p>

            <Field
                name="acceptEULA"
                type="checkbox"
                component={InputCheckField}
                label="Ich akzeptiere die EULA"
            />

            <Button outline block color="primary" type="submit" disabled={submitting}>
                Los geht's!
            </Button>
        </Form>
    )
};

export default reduxForm({
    form: 'initialDialog',
    validate
})(InitialDialogForm);