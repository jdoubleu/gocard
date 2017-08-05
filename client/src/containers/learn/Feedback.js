import React from "react";
import {Card, Col, CardGroup, CardTitle, CardText, Row, CardDeck, Button} from "reactstrap";
import {connect} from "react-redux";
import _ from "lodash";
import StatisticBar from "../../components/shared/statistics/statisticBar";
import FeedbackCard from "./FeedbackCard";
import {makeGetCardsForResults} from "../../selectors";


const Feedback = ({register, tags, mode, cardIds, cards, results, resultCards}) => {

    const CalcCardStatistic = (correct) => {
        //Load stats for current card
        //Calculate new Stats
        //return new stats object
    };

    const matchTitle = () => {
        if (mode === "NORMAL_MODE") {
            return "Normaler Modus";
        } else if (mode === "POWER_MODE") {
            return "Power Modus";
        } else if ("TEST_MODE") {
            return "Klausur Modus";
        }
    };

    return (
        <div>
            <CardGroup>
                <Card block>
                    <CardTitle>{register.title}</CardTitle>
                    <CardText>
                        {
                            tags.map((tag) => {
                                    return (
                                        <div className="btn btn-outline-primary p-1 ml-1">{tag}</div>
                                    )
                                }
                            )
                        }
                    </CardText>
                </Card>
                <Card block>
                    <CardTitle>Statistik</CardTitle>
                    <CardText>
                        <StatisticBar/>
                    </CardText>
                </Card>
            </CardGroup>

            <Row className="mt-4 ml-3">
                <Col>
                    <h4>Gelernte Karten</h4>
                </Col>
            </Row>
            <CardDeck>
                {
                    resultCards &&
                    _.values(resultCards).map((card) =>
                        <Card>
                            <FeedbackCard card={card} userAnswer={results[card.id].answer} />
                        </Card>
                    )
                }
            </CardDeck>
        </div>
    );
};

const makeMapStateToProps = () => {
    const getCardsForResults = makeGetCardsForResults();
    const mapStateToProps = (state, props) => {
        return {
            cardIds: state.ui.learning.allIds || [],
            tags: state.ui.learning.misc.tags || [],
            results: state.ui.learning.byId ||{},
            resultCards: getCardsForResults(state, props) || {},
        }
    };
    return mapStateToProps
};

function mapDispatchToProps(dispatch) {
    return ({
        handleFeedbackClick: (cardId, answer, correct) => {

        }
    })
}

export default connect(makeMapStateToProps, mapDispatchToProps)(Feedback);