import React from "react";
import PropTypes from "prop-types";
import {Button, Card, CardTitle, Col, CardText} from "reactstrap";
import {connect} from "react-redux";
import {loadCard} from "../../actions/card";


const FeedbackPreviewCard = ({cardId, card, result}) => {
    console.log("card", card);
    console.log("result", result);
    return (
        <Col xl="4" md="6" xs="12">
            <Card block className="mb-2">
                <CardTitle>{card.question}</CardTitle>
                <CardText>{card.answer}</CardText>
                <CardText>{result.answer}</CardText>
            </Card>
        </Col>
    );
};

const mapStateToProps = (state, ownProps) => (
    {
        card: state.entities.cards.byId[ownProps.cardId] || {},
        result: state.ui.learning.byId[ownProps.cardId] || {}
    }
);

const mapDispatchToProps = (dispatch, props) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackPreviewCard);
