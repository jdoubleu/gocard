import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, Form, ListGroup, ListGroupItem, Input, CardTitle, CardText} from "reactstrap";
import InputField from "./fields/input";
import InputMembers from "./fields/inputMembers";
import {SelectRadio} from "./fields/selectRadio";


const validate = values => {
    const errors = {};

    if (!values.title) {
        errors.title = 'Ein Titel ist erforderlich.'
    }

    return errors
};


const SingleChoiceLearn = ({error, submitting, card, values})=> {

    const handleSubmit= (values) => {
        console.log("values", values.answer);
    };



    return (
        <Form>
            {
                error &&
                <Alert color="danger">
                    {error}
                </Alert>
            }


                <CardTitle>Frage:
            {card.question}
                </CardTitle>

            <ListGroup>
            {
                card &&
                    card.content.options.map((answer) =>
                        <ListGroupItem>
                                {/*<Input type="radio" name="radio"/>
                                    {answer}*/}
                            <label>
                                <Field name="answer" component="input" type="radio" value={answer} onClick={handleSubmit} />
                                {' '}
                                {answer}
                            </label>
                        </ListGroupItem>
                    )
            }
            </ListGroup>
            <Button outline block color="primary" type="submit" disabled={submitting}>
                Jetzt prüfen
            </Button>
        </Form>
    )
};

export default reduxForm({
    form: 'registerForm',
    validate
})(SingleChoiceLearn);
