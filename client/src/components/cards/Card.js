import React from "react";
import PropTypes from "prop-types";
import {Button, Card as CardStrap, CardText, CardTitle, Col, Row} from "reactstrap";

class Card extends React.Component {
    render() {
        return (
            <Col xl="4" md="6" xs="12">
                <CardStrap block className="mb-2">
                    <CardTitle>{this.props.question}</CardTitle>
                    <Button outline color="primary">Ansehen</Button>
                </CardStrap>

            </Col>

        );
    }
}

Card.propTypes = {
    question: PropTypes.string.isRequired,
};

export default Card;
