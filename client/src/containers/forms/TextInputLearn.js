import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, CardTitle, Form} from "reactstrap";
import LearnTextInputField from "./fields/learnTextInputField";


const validate = values => {
    const errors = {};
    if (values.userAnswer === undefined) {
        errors.userAnswer = "Bitte gib eine Antwort ein.";
    }
    return errors
};


const TextInputLearn = ({error, submitting, card, handleSubmit, mode, handleSkip}) => {
    return (
        <Form onSubmit={handleSubmit}>
            {
                error &&
                <Alert color="danger">
                    {error}
                </Alert>
            }
            <CardTitle className="text-center">
                Karteikarte Texteingabe
            </CardTitle>

            <h4 className="text-muted">Frage</h4>
            <CardTitle>
                {card.question}
            </CardTitle>

            <Field
                name="userAnswer"
                component={LearnTextInputField}
                content={card.content}
            />
            {
                mode === "NORMAL_MODE" &&
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
    form: 'textInputLearn',
    validate
})(TextInputLearn);
