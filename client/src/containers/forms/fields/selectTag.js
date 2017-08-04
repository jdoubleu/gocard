import React from "react";
import {Button, FormFeedback, FormGroup, Label, UncontrolledTooltip} from "reactstrap";
import _ from "lodash";

const toggleTags = (values, value) => {
    const array = _.isArray(values) ?  values : [];
    if (_.includes(values, value)) {
        return _.without(array, value);
    } else {
        return _.concat(array, value);
    }
};

const selectTag = ({input, options, label, disableLabel, toolTip, type, meta: {touched, error}}) => (
    <FormGroup color={touched && error && 'danger'}>
        {
            !disableLabel &&
            <Label id={`label-${input.name}`}>
                {label}
            </Label>
        }

        <div className="form-control border-0 p-0">
            {
                options.map((option) =>
                    <Button outline size="sm" className="mr-1 mb-1" key={option}
                            onClick={() => input.onChange(toggleTags(input.value, option))}
                            color={_.includes(input.value, option) ? 'primary' : 'secondary'}>
                        {option} {_.includes(input.value, option) ? '\u2714' : ''}
                    </Button>
                )
            }
            {
                options.length <= 0 &&
                <span className="text-muted">Es wurden noch keine Tags hinzugefügt.</span>
            }
        </div>
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

export default selectTag;