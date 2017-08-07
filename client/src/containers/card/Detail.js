import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadCard} from "../../actions/card";
import Headline from "../shared/headline";
import {Badge, Card, Col, ListGroup, ListGroupItem, Row} from "reactstrap";
import {Link} from "react-router-dom";
import {makeGetRoleByRegister} from "../../selectors";
import _ from "lodash";

class Detail extends React.Component {

    componentWillMount() {
        const {dispatch, match} = this.props;
        dispatch(loadCard(match.params.cardId));
    }

    render() {
        const {card, role} = this.props;
        const mapCardType = () => {
            if (card.type === "single-choice") {
                return "Singlechoice"
            } else if (card.type === "multiple-choice") {
                return "Multiplechoice"
            } else if (card.type === "self-validate") {
                return "Selbstkontrolle"
            } else if (card.type === "text-input") {
                return "Texteingabe"
            }
        };

        return (
            <Row>
                <Col sm="12" md={{size: 8, offset: 2}}>
                    <Headline title={card.question}/>

                    <Card block>
                        <h4 className="text-muted">Fragetyp</h4>
                        <p>{mapCardType()}</p>
                        
                        <h4 className="text-muted">Frage</h4>
                        <p>{card.question}</p>

                        {
                            (card.type === "self-validate" || card.type === "text-input") &&
                            <div>
                                <h4 className="text-muted">Antwort</h4>
                                <ListGroup className="mb-2">
                                    <ListGroupItem className="justify-content-between">
                                        {card.content.answer}<Badge pill>{'\u2714'}</Badge>
                                    </ListGroupItem>
                                </ListGroup>
                            </div>
                        }

                        {
                            (card.type === "multiple-choice") &&
                                <div>
                                    <h4 className="text-muted">Antworten</h4>
                                    <ListGroup className="mb-2">
                                    {card.content.options.map((option, index) => {
                                        if (_.includes(card.content.corrects, index)) {
                                            return (
                                                <ListGroupItem className="justify-content-between">
                                                    {index+1}. {option}
                                                    <Badge pill>{'\u2714'}</Badge></ListGroupItem>
                                            );
                                        } else {
                                            return (
                                                <ListGroupItem>
                                                    {index+1}. {option}
                                                </ListGroupItem>
                                            );
                                        }
                                    })}
                                    </ListGroup>
                                </div>
                        }

                        {
                            (card.type === "single-choice") &&
                            <div>
                                <h4 className="text-muted">Antworten</h4>
                                <ListGroup className="mb-2">
                                {card.content.options.map((option, index) => {
                                    if (card.content.correct === index) {
                                        return (
                                            <ListGroupItem className="justify-content-between">
                                                {index+1}. {option}
                                                <Badge pill>{'\u2714'}</Badge></ListGroupItem>
                                        );
                                    } else {
                                        return (
                                            <ListGroupItem>
                                                {index+1}. {option}
                                            </ListGroupItem>
                                        );
                                    }
                                })}
                                </ListGroup>
                            </div>
                        }

                        <h4 className="text-muted">Tags</h4>
                        <p>
                            {
                                (card.tags || []).map((tag) =>
                                    <span className="btn btn-outline-secondary mr-1 mb-1 btn-sm" key={tag}>{tag}</span>
                                )
                            }
                            {
                                card.tags.length === 0 &&
                                <div>Es sind keine Tags vorhanden.</div>
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