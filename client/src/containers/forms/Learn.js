import React from "react";
import {Alert, Button, Form} from "reactstrap";
import SelectTag from "./fields/selectTag";
import SelectButton from "./fields/selectButton";
import {Field, reduxForm} from "redux-form";
import {Link} from "react-router-dom";

const validate = values => {
    const errors = {};

    if (!values.mode) {
        errors.mode = 'Wähle einen Lernmodus'
    }

    return errors
};

const Learn = props => {
    const {error, handleSubmit, registerId, disabled, tags} = props;
    return (
        <Form onSubmit={handleSubmit}>
            {
                error &&
                <Alert color="danger">
                    {error}
                </Alert>
            }

            {
                tags &&
                <Field
                    name="tags"
                    component={SelectTag}
                    label="Tags"
                    toolTip="Die Tags können ausgewählt werden, um themenbezogene Lernkarten zu erhalten. Sie können einen oder mehrere Tags auswählen. Wenn Tags nicht ausgewählt sind, werden Karteikarten mit diesen Tags nicht im Lernmodus berücksichtigt. Sind keine Tags ausgewählt sind alle Karteikarten ausgewählt."
                    options={tags}
                />
            }


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

            {disabled === true &&
                <Link className="btn btn-block btn-outline-primary disabled" to={`/`}>Lernen starten</Link>
            }
            {disabled === false &&
                <Link className="btn btn-block btn-outline-primary" to={`/register/${registerId}/learn`}>Lernen starten</Link>
            }
        </Form>
    )
};

export default reduxForm({
    form: 'learnForm',
    validate
})(Learn);