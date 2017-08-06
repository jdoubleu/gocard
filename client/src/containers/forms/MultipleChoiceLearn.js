import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, Form, CardTitle, CardText} from "reactstrap";
import LearnMultipleChoiceField from "./fields/learnMultipleChoiceField";


const validate = values => {
    const errors = {};
    if(values.userAnswer === undefined) {
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


            <h4 className="text-muted">Frage</h4>
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
                mode === "NORMAL_MODE"&&
                <Button color="link" disabled={submitting} onClick={handleSkip}>
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
