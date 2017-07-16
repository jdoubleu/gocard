import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, Form} from "reactstrap";
import InputField from "./fields/input";

const validate = values => {
    const errors = {};

    if (!values.displayName) {
        errors.displayName = 'Du musst einen Anzeigenamen eingeben'
    }

    if (!values.acceptEULA) {
        errors.acceptEULA = 'Du musst die EULA bestätigen um diese Seite nutzen zu können'
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
                component={InputField}
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