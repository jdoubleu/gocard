import React from "react";
import PropTypes from "prop-types";
import {Button, Card, CardTitle, Col} from "reactstrap";
import {connect} from "react-redux";
import {loadCard} from "../../actions/card";


class Preview extends React.Component {

    componentWillMount() {
        this.props.loadCard();
    }

    render() {
        const {card} = this.props;
        return (
            <Col xl="4" md="6" xs="12">
                <Card block className="mb-2">
                    <CardTitle>{card.question}</CardTitle>
                    <Button outline color="primary">Ansehen</Button>
                </Card>
            </Col>
        )
    };
}

Preview.propTypes = {
    cardId: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    card: state.entities.cards.byId[ownProps.cardId] || {},
});

const mapDispatchToProps = (dispatch, props) => ({
    loadCard: () => dispatch(loadCard(props.cardId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
