import React from "react";
import {Button, FormFeedback, FormGroup, Label, ListGroup, ListGroupItem, UncontrolledTooltip} from "reactstrap";
import {connect} from "react-redux";
import {makeGetTagsByRegisterByKeyword} from "../../../selectors/index";
import {withRouter} from "react-router-dom";

const inputTag = ({fields, label, disableLabel, toolTip, meta: {touched, error}, keyword, tags}) => (
    <FormGroup color={touched && error && 'danger'}>
        {
            !disableLabel &&
            <Label id={`label-${fields.name}`}>
                {label}
            </Label>
        }

        <ListGroup>
            {
                tags.map((tag, index) =>
                    <ListGroupItem className="p-1 px-3 justify-content-between">{tag}</ListGroupItem>
                )
            }
        </ListGroup>

        <ListGroup>
            <ListGroupItem className="p-1 px-3 justify-content-between">
                {keyword}
                <Button outline color="secondary" onClick={() => fields.push(keyword)}>+</Button>
            </ListGroupItem>
            {
                fields.map((tag, index) =>
                    <ListGroupItem className="p-1 px-3 justify-content-between">{tag}</ListGroupItem>
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
);

const makeMapStateToProps = () => {
    const getTagsByRegisterByKeyword = makeGetTagsByRegisterByKeyword();
    const mapStateToProps = (state, props) => {
        return {
            tags: getTagsByRegisterByKeyword(state, props)
        }
    };
    return mapStateToProps
};

export default withRouter(connect(makeMapStateToProps)(inputTag));