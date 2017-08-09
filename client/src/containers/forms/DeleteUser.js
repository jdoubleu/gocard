import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, Form} from "reactstrap";
import InputCheckField from "./fields/inputCheck";

/**
 * Redux from for delete User.
 */
const validate = values => {
    const errors = {};

    if (!values.deleteUser) {
        errors.deleteUser = "Bitte bestätige, dass du deinen Account löschen willst."
    }

    return errors
};

const DeleteUserForm = props => {
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
                label="Ich möchte meinen Account permanent löschen."
            />

            <Button outline block color="danger" type="submit" disabled={submitting}>
                Löschen
            </Button>
        </Form>
    )
};

export default reduxForm({
    form: 'deleteUserForm',
    validate
})(DeleteUserForm);