import React from "react";
import {Field, FieldArray, reduxForm} from "redux-form";
import {Alert, Button, Col, Form, Row} from "reactstrap";
import InputField from "./fields/input";
import InputMembers from "./fields/inputMembers";
import {Link} from "react-router-dom";

const validate = values => {
    const errors = {};

    if (!values.title) {
        errors.title = 'Ein Titel ist erforderlich.'
    }

    return errors
};

const RegisterForm = props => {
    const {error, handleSubmit, submitting, submitLabel, cancelRoute, cancelLabel} = props;
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

            <FieldArray
                name="members"
                component={InputMembers}
                label="Mitglieder"
            />

            <Row>
                <Col>
                    <Link className="btn btn-outline-secondary btn-block" to={cancelRoute}>{cancelLabel}</Link>
                </Col>
                <Col>
                    <Button outline block color="primary" type="submit" disabled={submitting}>
                        {submitLabel}
                    </Button>
                </Col>
            </Row>
        </Form>
    )
};

export default reduxForm({
    form: 'registerForm',
    validate
})(RegisterForm);