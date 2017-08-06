import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, Form} from "reactstrap";
import InputCheckField from "./fields/inputCheck";

const validate = values => {
    const errors = {};

    if (!values.deleteUser) {
        errors.deleteUser = "Bitte bestätige, dass du das Register löschen willst."
    }

    return errors
};

const DeleteRegisterForm = props => {
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
                name="deleteUser"
                type="checkbox"
                component={InputCheckField}
                label="Ich möchte dieses Register permanent löschen."
            />

            <Button outline block color="danger" type="submit" disabled={submitting}>
                Löschen
            </Button>
        </Form>
    )
};

export default reduxForm({
    form: 'deleteRegisterForm',
    validate
})(DeleteRegisterForm);