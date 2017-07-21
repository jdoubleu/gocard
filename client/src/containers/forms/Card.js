import React from "react";
import {Field, formValueSelector, reduxForm} from "redux-form";
import {Alert, Button, Form} from "reactstrap";
import InputField from "./fields/input";
import SelectButton from "./fields/selectButton";
import InputSingleChoice from "./fields/inputSingleChoice";
import InputMultipleChoice from "./fields/inputMultipleChoice";
import {connect} from "react-redux";

const validate = values => {
    const errors = {};
    if (!values.question) {
        errors.question = 'Eine Fragestellung wird benötigt.'
    }

    if (!values.type) {
        errors.type = 'Wähle einen Fragetypen.'
    }

    if((values.type === "self-validate" || values.type === "text-input")
        && (values.content === undefined || values.content.answer === undefined)) {
        errors.content ={answer:"Bitte gib eine Antwort ein."}
    }

    if(!(values.type === "self-validate" || values.type === "text-input") && values.content === undefined) {
        errors.content ="Bitte erstelle zuerst eine gültige Antwort."
    }

    if(values.type === "single-choice" && values.content !== undefined && values.content.correct === undefined) {
        errors.content = 'Bitte makiere die richtige Antwort.'
    }

    if(values.type === "multiple-choice" && values.content !== undefined
        && (values.content.corrects === undefined || values.content.corrects.length === 0)) {
        errors.content = "Bitte makiere mindestens eine richtige Antwort."
    }

    return errors
};

const CardForm = props => {
    const {error, handleSubmit, submitting, submitLabel, type} = props;
    return (
        <Form onSubmit={handleSubmit}>
            {
                error &&
                <Alert color="danger">
                    {error}
                </Alert>
            }

            <Field
                name="question"
                type="text"
                component={InputField}
                label="Frage"
            />

            <Field
                name="type"
                component={SelectButton}
                label="Fragetyp"
                options={[
                    {
                        name: "Single Choice",
                        value: "single-choice"
                    },
                    {
                        name: "Multiple Choice",
                        value: "multiple-choice"
                    },
                    {
                        name: "Selbstkontrolle",
                        value: "self-validate"
                    },
                    {
                        name: "Texteingabe",
                        value: "text-input"
                    }
                ]}
            />

            {
                type === 'single-choice' &&
                <Field
                    name="content"
                    type="text"
                    component={InputSingleChoice}
                    label="Antwort"
                />
            }

            {
                type === 'multiple-choice' &&
                <Field
                    name="content"
                    type="text"
                    component={InputMultipleChoice}
                    label="Antwort"
                />
            }

            {
                type === 'self-validate' &&
                <Field
                    name="content.answer"
                    type="textarea"
                    component={InputField}
                    label="Antwort"
                />
            }

            {
                type === 'text-input' &&
                <Field
                    name="content.answer"
                    type="text"
                    component={InputField}
                    label="Antwort"
                />
            }

            <Field
                name="tags"
                type="text"
                component={InputField}
                label="Tags"
            />

            <Button outline block color="primary" type="submit" disabled={submitting}>
                {submitLabel}
            </Button>
        </Form>
    )
};

const selector = formValueSelector('cardForm');
function mapStateToProps(state) {
    return {
        type: selector(state, 'type')
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'cardForm',
    validate
})(CardForm));