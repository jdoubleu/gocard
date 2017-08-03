import React from "react";
import {Field, reduxForm} from "redux-form";
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

            <Field
                name="members"
                component={InputMembers}
                label="Mitglieder"
            />

            <Row>
                <Col className="pr-1">
                    <Button outline block color="primary" type="submit" disabled={submitting}>
                        {submitLabel}
                    </Button>
                </Col>
                <Col className="pl-1">
                    <Link className="btn btn-outline-primary btn-block" to={cancelRoute}>{cancelLabel}</Link>
                </Col>
            </Row>
        </Form>
    )
};

export default reduxForm({
    form: 'registerForm',
    validate
})(RegisterForm);