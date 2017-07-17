import React from "react";
import {Alert, Button, Form} from "reactstrap";
import SelectTag from "./fields/selectTag";
import SelectButton from "./fields/selectButton";
import {Field, reduxForm} from "redux-form";

const validate = values => {
    const errors = {};

    if (!values.mode) {
        errors.mode = 'Wähle einen Lernmodus'
    }

    return errors
};

const Learn = props => {
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
                name="tags"
                component={SelectTag}
                label="Tags"
                toolTip="Die Tags können ausgewählt werden, um themenbezogene Lernkarten zu erhalten. Sie können einen oder mehrere Tags auswählen. Wenn Tags nicht ausgewählt sind, werden Karteikarten mit diesen Tags nicht im Lernmodus berücksichtigt. Sind keine Tags ausgewählt sind alle Karteikarten ausgewählt."
                options={["XYZZXY", "sadasd", "asdasd", "4h23b4hj23"]}
            />

            <Field
                name="mode"
                component={SelectButton}
                label="Modus"
                toolTip="Der Lernmodus muss ausgwählt werden, um die Variante des Lernens anzugeben."
                options={[
                    {
                        name: "Normal",
                        value: "NORMAL_MODE"
                    },
                    {
                        name: "Power",
                        value: "POWER_MODE"
                    },
                    {
                        name: "Klausur",
                        value: "TEST_MODE"
                    }
                ]}
            />

            <Button outline block color="primary" type="submit" disabled={submitting}>
                Lernen starten
            </Button>
        </Form>
    )
};

export default reduxForm({
    form: 'learnForm',
    validate
})(Learn);