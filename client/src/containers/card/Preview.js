import React from "react";
import PropTypes from "prop-types";
import {Button, Card, CardTitle, Col} from "reactstrap";
import {connect} from "react-redux";

const Preview = ({card}) => {
    return (
        <Col xl="4" md="6" xs="12">
            <Card block className="mb-2">
                <CardTitle>{card.question}</CardTitle>
                <Button outline color="primary">Ansehen</Button>
            </Card>
        </Col>

    );
};

Preview.propTypes = {
    cardId: PropTypes.number.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        card: state.entities.cards.byId[ownProps.cardId] || {},
    }
}

export default connect(mapStateToProps)(Preview);
