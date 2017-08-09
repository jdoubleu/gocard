import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, Col, Form, Row} from "reactstrap";
import InputField from "./fields/input";
import {Link} from "react-router-dom";

/**
 * Redux form for User settings.
 */
const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Eine E-Mail Adresse ist erforderlich.'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Ungültige E-Mail Adresse.'
    }

    if (!values.displayName) {
        errors.displayName = 'Ein Anzeigenamen ist erforderlich.'
    }

    return errors
};

const SettingsForm = props => {
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

            <Field
                name="email"
                type="text"
                component={InputField}
                label="E-Mail Adresse"
            />

            <Row>
                <Col>
                    <Link className="btn btn-outline-secondary btn-block" to="/">Abbrechen</Link>
                </Col>
                <Col>
                    <Button outline block color="primary" type="submit" disabled={submitting}>
                        Speichern
                    </Button>
                </Col>
            </Row>
        </Form>
    )
};

export default reduxForm({
    form: 'settingsForm',
    validate
})(SettingsForm);