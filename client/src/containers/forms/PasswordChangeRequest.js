import React from "react";
import {reduxForm} from "redux-form";
import {Alert, Button, CardText, Form} from "reactstrap";

const ForgottenForm = props => {
    const {error, handleSubmit, submitting, submitSucceeded} = props;
    return !submitSucceeded ? (
        <Form onSubmit={handleSubmit}>
            {
                error &&
                <Alert color="danger">
                    {error}
                </Alert>
            }

            <Button outline block color="primary" type="submit" disabled={submitting}>
                Zurücksetzen
            </Button>
        </Form>
    ) : (
        <div>
            <hr/>
            <CardText>
                Eine E-Mail mit Anweisungen zum zurücksetzen des Passwortes wurden an deine E-Mail Adresse versendet.
            </CardText>
        </div>
    )
};

export default reduxForm({
    form: 'passwordChangeRequest',
})(ForgottenForm);