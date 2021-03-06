import React from "react";
import {FormFeedback, FormGroup, Input, UncontrolledTooltip} from "reactstrap";
import _ from "lodash";

const learnMultipleChoiceField = ({input, content, label, disableLabel, toolTip, meta: {touched, error}}) => {
    const answer = _.get(input.value, 'answer', []);
    return (
        <FormGroup color={touched && error && 'danger'}>
            {
                !disableLabel &&
                <h6 className="text-muted" id={`label-${input.name}`}>
                    {label}
                </h6>
            }

            {
                content.options.map((option, index) =>
                    <div key={index}>
                        <Input addon type="checkbox"
                               onChange={(event) => input.onChange({
                                   ...input.value,
                                   answer: event.target.checked ? _.union(answer, [index]) : _.without(answer, index)
                               })
                               }
                               checked={answer.indexOf(index) >= 0}
                               name={input.name} value={index}
                        />{' '}
                        {option}
                    </div>
                )
            }

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
    );
};

export default learnMultipleChoiceField;