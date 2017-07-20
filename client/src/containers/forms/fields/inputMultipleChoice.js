import React from "react";
import {
    Button,
    FormFeedback,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    Label,
    UncontrolledTooltip
} from "reactstrap";
import _ from "lodash";

const fillAt = (array, value, index) => {
    let copy = [].concat(array);
    copy[index] = value;
    return copy;
};

const removeAt = (array, index) => {
    let copy = [].concat(array);
    copy.splice(index, 1);
    return copy;
};

const inputSingleChoice = ({input, label, disableLabel, toolTip, type, meta: {touched, error}}) => {
    let options = _.get(input.value, 'options', []);
    const corrects = _.get(input.value, 'corrects', []);
    return (
        <FormGroup color={touched && error && 'danger'}>
            {
                !disableLabel &&
                <Label id={`label-${input.name}`}>
                    {label}
                </Label>
            }
            <FormGroup>
                {

                    options.map((option, index) =>
                        <InputGroup className="mb-1" key={index}>
                            <InputGroupAddon>
                                <Input addon type="checkbox"
                                       onChange={(event) => input.onChange({
                                           ...input.value,
                                           corrects: fillAt(corrects, event.target.checked, index)
                                       })}
                                       checked={corrects[index]}
                                />
                            </InputGroupAddon>
                            <Input type={type} name="answer"
                                   onChange={(event) => input.onChange({
                                       ...input.value,
                                       options: fillAt(options, event.target.value, index)
                                   })}
                                   value={option}
                            />
                            <InputGroupButton>
                                <Button outline color="secondary"
                                        onClick={() => input.onChange({
                                            ...input.value,
                                            corrects: removeAt(corrects, index),
                                            options: removeAt(options, index)
                                        })}>
                                    &#10008;
                                </Button>
                            </InputGroupButton>
                        </InputGroup>
                    )
                }
                <Button color="primary" outline
                        onClick={() => input.onChange({...input.value, options: [...options, '']})}>
                    Antwortmöglichkeit hinzufügen
                </Button>
            </FormGroup>
            {
                touched && error &&
                <FormFeedback>{error}</FormFeedback>
            }
            {
                toolTip &&
                <UncontrolledTooltip placement="right" target={`label-${input.name}`}>
                    {toolTip}
                </UncontrolledTooltip>
            }
        </FormGroup>
    )
};

export default inputSingleChoice;