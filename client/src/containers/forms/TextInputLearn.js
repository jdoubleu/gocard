import React from "react";
import {Field, formValueSelector, reduxForm} from "redux-form";
import {Alert, Button, Form, CardTitle, CardText} from "reactstrap";
import LearnTextInputField from "./fields/learnTextInputField";
import {connect} from "react-redux";


const validate = values => {
    const errors = {};
    if (values.userAnswer === undefined ) {
        errors.userAnswer = "Bitte gib eine Antwort ein.";
    }
    return errors
};


const TextInputLearn = ({error, submitting, card, handleSubmit}) => {
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
                name="userAnswer"
                component={LearnTextInputField}
                content={card.content}
            />

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
