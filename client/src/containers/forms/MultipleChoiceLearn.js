import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, CardText, CardTitle, Form} from "reactstrap";
import LearnMultipleChoiceField from "./fields/learnMultipleChoiceField";


const validate = values => {
    const errors = {};
    if (values.userAnswer === undefined) {
        errors.userAnswer = "Bitte kreuze eine Antwort an.";
    }
    return errors
};


const MultipleChoiceLearn = ({error, submitting, card, handleSubmit, mode, handleSkip}) => {

    return (
        <Form onSubmit={handleSubmit}>
            {
                error &&
                <Alert color="danger">
                    {error}
                </Alert>
            }
            <CardTitle className="text-center">
                Mutiple-Choice
            </CardTitle>

            <h6 className="text-muted">Frage</h6>
            <CardTitle>
                {card.question}
            </CardTitle>

            <CardText>
                <Field
                    name="userAnswer"
                    component={LearnMultipleChoiceField}
                    label="Antworten"
                    content={card.content}
                />
            </CardText>
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
    form: 'multipleChoiceLearn',
    validate
})(MultipleChoiceLearn);
