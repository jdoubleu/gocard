/**
 * Form that allows you to change content of your Card.
 */
import React from "react";
import PropTypes from "prop-types";
import {Card, Col, Row} from "reactstrap";
import Headline from "../shared/headline";
import CardForm from "../forms/Card";
import DeleteCardForm from "../forms/DeleteCard";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {deleteCard, updateCard} from "../../actions/card";
import {RequestError} from "../../middleware/callAPI";
import {SubmissionError} from "redux-form";
import _ from "lodash";


const Edit = ({card, match}) => {
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

        return dispatch(
            updateCard(card.id, values)
        ).then(
            response =>
                dispatch(push(`/register/${card.register}/card/${card.id}`))
        ).catch(
            error => {
                if (error instanceof RequestError) {
                    throw new SubmissionError({_error: error.message})
                }
            }
        );
    };

    const handleDeleteSubmit = (values, dispatch) => {
        const registerId = card.register;
        return dispatch(
            deleteCard(card.id)
        ).then(
            response =>
                dispatch(push(`/register/${registerId}`))
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
                <Headline title="Karteikarte bearbeiten">
                    Hier kannst du deine Karteikarte für Dein Register bearbeiten.
                </Headline>

                <Card block className="mb-3">
                    <CardForm onSubmit={handleSubmit} initialValues={card} submitLabel="Speichern"
                              cancelRoute={`/register/${match.params.registerId}/card/${card.id}`} cancelLabel="Abbrechen"/>
                </Card>

                <Card block>
                    <DeleteCardForm onSubmit={handleDeleteSubmit}/>
                </Card>
            </Col>
        </Row>
    )
};

const mapStateToProps = (state, props) => {
    return {
        card: state.entities.cards.byId[props.match.params.cardId] || {}
    }
};

export default connect(mapStateToProps)(Edit);