import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, Form} from "reactstrap";
import InputCheckField from "./fields/inputCheck";

/**
 * Redux from for delete Card.
 */
const validate = values => {
    const errors = {};

    if (!values.deleteCard) {
        errors.deleteCard = "Bitte bestätige, dass du die Karteikarte löschen willst."
    }

    return errors
};

const DeleteCardForm = props => {
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
                name="deleteCard"
                type="checkbox"
                component={InputCheckField}
                label="Ich möchte diese Karteikarte permanent löschen."
            />

            <Button outline block color="danger" type="submit" disabled={submitting}>
                Löschen
            </Button>
        </Form>
    )
};

export default reduxForm({
    form: 'deleteCardForm',
    validate
})(DeleteCardForm);