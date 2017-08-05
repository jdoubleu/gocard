import React from "react";
import {Field, formValueSelector, reduxForm} from "redux-form";
import {Alert, Button, Form, CardTitle, CardText} from "reactstrap";
import LearnSelfValidateField from "./fields/learnSelfValidateButtonField";
import {connect} from "react-redux";


const validate = values => {
    const errors = {};
    if (values.correct === undefined || values.correct === "changed") {
        errors.correct = "Bitte kreuze eine Antwort an.";
    }
    return errors
};


const SelfValidateLearn = ({error, submitting, card, handleSubmit}) => {
    return (
        <Form onSubmit={handleSubmit}>
            {
                error &&
                <Alert color="danger">
                    {error}
                </Alert>
            }


            <h4 className="text-muted">Frage</h4>
            <CardTitle>
                {card.question}
            </CardTitle>

            <Field
                name="correct"
                component={LearnSelfValidateField}
                content={card.content}
            />

            <Button outline block color="primary" type="submit" disabled={submitting}>
                Weiter
            </Button>
        </Form>
    )
};

export default reduxForm({
    form: 'selfValidateLearn',
    validate
})(SelfValidateLearn);
