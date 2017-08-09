import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, Form} from "reactstrap";
import InputCheckField from "./fields/inputCheck";

/**
 * Redux form for leave Register.
 */
const validate = values => {
    const errors = {};

    if (!values.leaveRegister) {
        errors.leaveRegister = "Bitte bestätige, dass du das Register verlassen möchtest."
    }

    return errors
};

const LeaveRegister = props => {
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
                name="leaveRegister"
                type="checkbox"
                component={InputCheckField}
                label="Ich möchte das Register verlassen."
            />

            <Button color="link" className="text-danger p-0 m-0" type="submit" disabled={submitting}>
                Register verlassen
            </Button>
        </Form>
    )
};

export default reduxForm({
    form: 'leaveRegisterForm',
    validate
})(LeaveRegister);