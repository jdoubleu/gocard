import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadCard} from "../../actions/card";
import Headline from "../shared/headline";
import {Card, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import {makeGetRoleByRegister} from "../../selectors";

class Detail extends React.Component {

    componentWillMount() {
        const {dispatch, match} = this.props;
        dispatch(loadCard(match.params.cardId));
    }

    render() {
        const {card, role} = this.props;

        return (
            <Row>
                <Col sm="12" md={{size: 8, offset: 2}}>
                    <Headline title={card.question}/>

                    <Card block>
                        <h5>Fragetyp</h5>
                        <p>{card.type}</p>

                        <h5>Frage</h5>
                        <p> </p>

                        <h5>Tags</h5>
                        <p>
                            {
                                (card.tags || []).map((tag) =>
                                        <span className="btn btn-outline-secondary mr-1 mb-1 btn-sm" key={tag}>{tag}</span>
                                )
                            }
                        </p>

                        {
                            (role === 'owner' || role === 'editor') &&
                            <p>
                                <hr/>
                                <Link to={`/register/${card.register}/card/${card.id}/edit`}>Bearbeiten</Link>
                            </p>
                        }
                    </Card>
                </Col>
            </Row>
        );
    }
}

Detail.propTypes = {
    card: PropTypes.object.isRequired
};

const makeMapStateToProps = () => {
    const getRoleByRegister = makeGetRoleByRegister();
    return (state, props) => {
        const cardId = props.match.params.cardId;
        return {
            card: state.entities.cards.byId[cardId] || {},
            role: getRoleByRegister(state, props) || '',
        }
    };
};

export default connect(makeMapStateToProps)(Detail);
