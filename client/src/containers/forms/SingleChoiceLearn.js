import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, CardTitle, Form} from "reactstrap";
import LearnSingleChoiceField from "./fields/learnSingleChoiceField";

/**
 * Redux form for singleChoice card.
 */
const validate = values => {
    const errors = {};
    if (values.userAnswer === undefined) {
        errors.userAnswer = "Bitte kreuze eine Antwort an.";
    }
    return errors
};


const SingleChoiceLearn = ({error, submitting, card, handleSubmit, mode, handleSkip}) => {

    return (
        <Form onSubmit={handleSubmit}>
            {
                error &&
                <Alert color="danger">
                    {error}
                </Alert>
            }

            <CardTitle className="text-center">
                Single-Choice
            </CardTitle>

            <h6 className="text-muted">Frage</h6>
            <CardTitle>
                {card.question}
            </CardTitle>

            <Field
                name="userAnswer"
                component={LearnSingleChoiceField}
                label="Antworten"
                content={card.content}
            />

            {
                mode === "NORMAL_MODE" &&
                <Button color="link" disabled={submitting} onClick={handleSkip} className="mb-1">
                    Überspringen
                </Button>
            }
            <Button outline block color="primary" type="submit" disabled={submitting}>
                Jetzt prüfen
            </Button>
        </Form>
    )
};

export default reduxForm({
    form: 'singleChoiceLearn',
    validate
})(SingleChoiceLearn);
