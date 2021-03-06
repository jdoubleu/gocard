/**
 * In this form you can create a new Card.
 */
import React from "react";
import {Card, Col, Row} from "reactstrap";
import Headline from "../shared/headline";
import CardForm from "../forms/Card";
import {addCard} from "../../actions/card";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import {push} from "react-router-redux";
import {RequestError} from "../../middleware/callAPI";
import {SubmissionError} from "redux-form";
import _ from "lodash";

const New = ({match, userId}) => {

    const handleSubmit = (values, dispatch) => {
        if(values.type === 'single-choice'){
            values = _.omit(values, ['content.answer', 'content.corrects']);
        }
        if(values.type === 'multiple-choice'){
            values = _.omit(values, ['content.answer', 'content.correct']);
        }
        if(values.type === 'self-validate'){
            values = _.omit(values, ['content.corrects', 'content.correct', 'content.options']);
        }
        if(values.type === 'text-input'){
            values = _.omit(values, ['content.corrects', 'content.correct', 'content.options']);
        }

        return dispatch(addCard(match.params.registerId, {
            ...values,
            author: userId,
            crdate: moment().format()
        })).then(
            success =>
                dispatch(push(`/register/${match.params.registerId}`))
        ).catch(
            error => {
                if (error instanceof RequestError) {
                    throw new SubmissionError({_error: error.message})
                }
            }
        );
    };

    return (
        <Row>
            <Col sm="12" md={{size: 8, offset: 2}}>
                <Headline title="Neue Karteikarte">
                    Hier kannst du eine neue Karteikarte für Dein Register erstellen.
                </Headline>

                <Card block>
                    <CardForm onSubmit={handleSubmit} submitLabel="Erstellen" cancelRoute={`/register/${match.params.registerId}`} cancelLabel="Abbrechen"/>
                </Card>
            </Col>
        </Row>
    )
};

New.propTypes = {
    userId: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(New);
