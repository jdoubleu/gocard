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

/**
 * Form that allows you to change content of your Card.
 */
const Edit = ({card}) => {
    const handleSubmit = (values, dispatch) => {
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
                              cancelRoute={`/card/${card.id}`} cancelLabel="Abbrechen"/>
                </Card>

                <Card block>
                    <DeleteCardForm onSubmit={handleDeleteSubmit}/>
                </Card>
            </Col>
        </Row>
    )
};

Edit.propTypes = {
    card: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => {
    return {
        card: state.entities.cards.byId[props.match.params.cardId] || {},
    }
};

export default connect(mapStateToProps)(Edit);