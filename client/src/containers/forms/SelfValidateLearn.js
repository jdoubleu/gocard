import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, CardTitle, Form} from "reactstrap";
import LearnSelfValidateField from "./fields/learnSelfValidateButtonField";


const validate = values => {
    const errors = {};
    if (values.correct === undefined || values.correct === "changed") {
        errors.correct = "Bitte kreuze eine Antwort an.";
    }
    return errors
};


const SelfValidateLearn = ({error, submitting, card, handleSubmit, mode, handleSkip}) => {
    return (
        <Form onSubmit={handleSubmit}>
            {
                error &&
                <Alert color="danger">
                    {error}
                </Alert>
            }

            <CardTitle className="text-center">
                Selbstkontrolle
            </CardTitle>
            <h4 className="text-muted">Frage</h4>
            <CardTitle>
                {card.question}
            </CardTitle>

            <Field
                name="correct"
                component={LearnSelfValidateField}
                content={card.content}
            />
            {
                mode === "NORMAL_MODE" &&
                <Button color="link" disabled={submitting} onClick={handleSkip} className="mb-1">
                    Überspringen
                </Button>
            }
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
