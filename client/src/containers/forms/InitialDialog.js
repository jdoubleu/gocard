import React from "react";
import {Field, reduxForm} from "redux-form";
import {Alert, Button, Card, CardText, CardTitle, Form} from "reactstrap";
import InputField from "./fields/input";
import InputCheckField from "./fields/inputCheck";

const validate = values => {
    const errors = {};

    if (!values.displayName) {
        errors.displayName = 'Anzeigename wird benötigt.'
    }

    if (!values.acceptEULA) {
        errors.acceptEULA = 'Akzeptierung der EULA ist erforderlich.'
    }

    return errors
};

const InitialDialogForm = props => {
    const {error, handleSubmit, submitting} = props;
    return (
        <Form onSubmit={handleSubmit}>
            {
                error &&
                <Alert color="danger">
                    {error}
                </Alert>
            }
            <Field
                name="displayName"
                type="text"
                component={InputField}
                label="Anzeigenamen"
            />

            <CardTitle>EULA</CardTitle>
            <Card block>
                <CardTitle>Nutzung</CardTitle>

                <CardText className="px-2 text-justify">
                    Die Nutzung dieser Webseite ist absolut freiwillig. Es werden keine Kosten von unser Seite
                    für die Nutzung dieser Webseite erhoben. Wir haften nicht für eventuelle unerreichbarkeit
                    der Webseite. Falls wir mitbekommen, dass sie rechtswiedrige Daten hochladen, behalten wir uns
                    vor ihren
                    Account zusammen mit all ihren Daten zu löschen. Wir führen aber keine generelle Überprüfung der
                    Daten durch.
                </CardText>

                <span><hr/></span>

                <CardTitle>Daten</CardTitle>
                <CardText className="px-2 text-justify">
                    Wir haften nicht für ihre Daten, sowie den Inhalt den sie auf dieser Seite erstellen. Wir
                    behalten uns vor ihren Account zu löschen falls wir mitbekommen, dass sie rechtswiedrige Daten
                    über diese Seite verbreiten. Für den Verlust von Daten haften wir nicht, und kommen für keinen
                    dadurch erstandenen Schaden auf. Wir probieren unserer möglichstes
                    um den Verlust von Daten zu verhindern.
                    Weiters zum Thema Datenschutz in dem Bereich Datenschutz.
                </CardText>

                <span><hr/></span>

                <CardTitle>Eigentumsrecht</CardTitle>
                <CardText className="px-2 text-justify">
                    Es ist ihnen nicht erlaubt die Software ganz oder teilweise zu verändern oder abgeleitete Werke
                    zu schaffen,
                    die ganz oder teilweise auf der Software basieren.
                </CardText>

                <span><hr/></span>

                <CardTitle>Technischer Support</CardTitle>
                <CardText className="px-2 text-justify">
                    GoCard bietet keinen technischen Support. Bei Fragen oder Problemen können sie aber dennoch eine
                    Mail an die
                    im Impressum hinterlegte E-Mail Adresse senden. Für die Bearbeitung oder Beantwortung ihres
                    Problems gibt es jedoch keine
                    Garantie.
                </CardText>
            </Card>

            <Field
                name="acceptEULA"
                type="checkbox"
                component={InputCheckField}
                label="Ich akzeptiere die EULA"
            />

            <Button outline block color="primary" type="submit" disabled={submitting}>
                Los geht's!
            </Button>
        </Form>
    )
};

export default reduxForm({
    form: 'initialDialog',
    validate
})(InitialDialogForm);