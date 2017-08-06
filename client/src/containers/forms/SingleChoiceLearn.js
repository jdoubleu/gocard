import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, Form, CardTitle, CardText} from "reactstrap";
import LearnSingleChoiceField from "./fields/learnSingleChoiceField";


const validate = values => {
    const errors = {};
    if(values.userAnswer === undefined) {
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


            <h4 className="text-muted">Frage</h4>
            <CardTitle>
                {card.question}
            </CardTitle>

            <CardText>
                <Field
                    name="userAnswer"
                    component={LearnSingleChoiceField}
                    label="Antworten"
                    content={card.content}
                />
            </CardText>
            {
                mode === "NORMAL_MODE"&&
                <Button outline block color="danger" disabled={submitting} onClick={handleSkip}>
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
