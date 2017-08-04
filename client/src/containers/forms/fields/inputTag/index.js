import React from "react";
import {
    Button,
    FormFeedback,
    FormGroup,
    InputGroup,
    InputGroupButton,
    Label,
    ListGroup,
    ListGroupItem,
    UncontrolledTooltip
} from "reactstrap";
import {connect} from "react-redux";
import {makeGetTagsByRegisterByKeyword} from "../../../../selectors/index";
import {withRouter} from "react-router-dom";
import {change, Field} from "redux-form";
import InputField from "./input";

const inputTag = ({fields, label, disableLabel, toolTip, meta: {touched, error}, keyword, tags, dispatch}) => (
        <FormGroup color={touched && error && 'danger'}>
            {
                !disableLabel &&
                <Label id={`label-${fields.name}`}>
                    {label}
                </Label>
            }

            <div>
                {
                    fields.map((tag, index) =>
                        <span className="btn btn-sm btn-outline-primary m-1">
                            <span className="mr-1">{fields.get(index)}</span>
                            <Button color="link" className="m-0 p-0" onClick={() => fields.remove(index)}>&#10008;</Button>
                        </span>
                    )
                }
            </div>

            <InputGroup>
                <Field
                    name="keyword"
                    type="text"
                    label="Tag hinzufügen"
                    component={InputField}
                />
                <InputGroupButton>
                    <Button outline color="secondary" onClick={() => fields.push(keyword)}>+</Button>
                </InputGroupButton>
            </InputGroup>

            <ListGroup>
                {
                    tags.map((tag, index) =>
                        <ListGroupItem className="p-0 pl-3 justify-content-between">
                            {tag}
                            <Button outline color="primary" className="m-1" onClick={() => {
                                fields.push(tag);
                                dispatch(change('cardForm', 'keyword', ''));
                            }}>+</Button>
                        </ListGroupItem>
                    )
                }
            </ListGroup>

            {
                touched && error &&
                <FormFeedback>{error}</FormFeedback>
            }
            {
                toolTip &&
                <UncontrolledTooltip placement="right" target={`label-${fields.name}`}>
                    {toolTip}
                </UncontrolledTooltip>
            }
        </FormGroup>
    )
;

const makeMapStateToProps = () => {
    const getTagsByRegisterByKeyword = makeGetTagsByRegisterByKeyword();
    return (state, props) => {
        return {
            tags: getTagsByRegisterByKeyword(state, props)
        }
    }
};

export default withRouter(connect(makeMapStateToProps)(inputTag));