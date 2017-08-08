import React from "react";
import PropTypes from "prop-types";
import {Card, CardText, Col} from "reactstrap";
import Title from "../shared/title";
import ClippedTag from "../shared/clippedTag";
import {connect} from "react-redux";
import {loadCard} from "../../actions/card";
import {Link} from "react-router-dom";

class Preview extends React.Component {

    componentWillMount() {
        this.props.loadCard();
    }

    render() {
        const {card} = this.props;
        return (
            <Col xl="4" md="6" xs="12">
                <Card block className="mb-2 fade-in">
                    <h5>
                        <Title title={card.question}/>
                    </h5>
                    <CardText>
                        {
                            (card.tags || []).map((tag) =>
                                <span className="btn btn-outline-secondary mr-1 mb-1 btn-sm" key={tag}><ClippedTag
                                    tag={tag}/></span>
                            )
                        }
                    </CardText>
                    <Link to={`/register/${card.register}/card/${card.id}`}
                          className="btn btn-outline-primary">Ansehen</Link>
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
