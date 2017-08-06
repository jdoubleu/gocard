import React from "react";
import {Card, Col, CardGroup, CardTitle, CardText, Row, CardDeck, Button} from "reactstrap";
import {connect} from "react-redux";
import _ from "lodash";
import StatisticBar from "../../components/shared/statistics/statisticBar";
import FeedbackCard from "./FeedbackCard";
import {makeGetCardsForResults} from "../../selectors";
import {Field, getFormValues, reduxForm} from "redux-form";
import SelectButton from "../forms/fields/selectButton";
import {
    makeGetCorrectCardsForResults, makeGetSkippedCardsForResults,
    makeGetWrongCardsForResults
} from "../../selectors/index";

const validate = values => {
    const errors = {};

    return errors
};

const Feedback = ({register, tags, mode, cardIds, cards, results, resultCards, valuesFeedback, correctCards, wrongCards, skippedCards}) => {

    const CalcCardStatistic = (correct) => {
        //Load stats for current card
        //Calculate new Stats
        //return new stats object
    };
    const bug = () => {
        console.log("feedback",valuesFeedback);
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

    const calcCards = () => {
        if(valuesFeedback=== undefined || valuesFeedback.cards === "ALL_CARDS") {
            console.log("allCards", resultCards);
            return resultCards;
        } else if(valuesFeedback.cards === "CORRECT_CARDS") {
            return correctCards;
        } else if(valuesFeedback.cards === "WRONG_CARDS") {
            return wrongCards;
        } else if(valuesFeedback.cards === "SKIPPED_CARDS") {
            return skippedCards;
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
                        {
                            tags.length === 0 &&
                                <span>
                                    Es wurde mit allen Karten gelernt.
                                </span>
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
                <Col>
                    {
                        mode === "NORMAL_MODE" &&
                        <Field
                            name="cards"
                            component={SelectButton}
                            label="Karten"
                            toolTip="Du kannst die Karteikarten nach den Ergebnissen filtern."
                            options={[
                                {
                                    name: "Alle",
                                    value: "ALL_CARDS"
                                },
                                {
                                    name: "Richtig",
                                    value: "CORRECT_CARDS"
                                },
                                {
                                    name: "Falsch",
                                    value: "WRONG_CARDS"
                                },
                                {
                                    name: "Übersprungen",
                                    value: "SKIPPED_CARDS"
                                }
                            ]}
                        />

                    }
                    {
                        mode !== "NORMAL_MODE" &&
                        <Field
                            name="cards"
                            component={SelectButton}
                            label="Karten"
                            toolTip="Du kannst die Karteikarten nach den Ergebnissen filtern."
                            options={[
                                {
                                    name: "Alle",
                                    value: "ALL_CARDS"
                                },
                                {
                                    name: "Richtig",
                                    value: "CORRECT_CARDS"
                                },
                                {
                                    name: "Falsch",
                                    value: "WRONG_CARDS"
                                }
                            ]}
                        />
                    }
                    {
                        bug()
                    }
                </Col>
            </Row>
            <CardDeck>
                {
                    resultCards &&
                    _.values(calcCards()).map((card) =>
                        <Card block>
                            <FeedbackCard card={card} userAnswer={results[card.id].answer} />
                        </Card>
                    )
                }
            </CardDeck>
        </div>
    );
};

const makeMapStateToProps = () => {
    /*_.values(calcCards).map((card) =>
        <Card block>
            <FeedbackCard card={card} userAnswer={results[card.id].answer} />
        </Card>
    )*/
    const getCardsForResults = makeGetCardsForResults();
    const getCorrectCardsForResults = makeGetCorrectCardsForResults();
    const getWrongCorrectCardsForResults = makeGetWrongCardsForResults();
    const getSkippedCardsForResults = makeGetSkippedCardsForResults();
    const mapStateToProps = (state, props) => {
        return {
            cardIds: state.ui.learning.allIds || [],
            tags: state.ui.learning.misc.tags || [],
            results: state.ui.learning.byId ||{},
            resultCards: getCardsForResults(state, props) || {},
            correctCards: getCorrectCardsForResults(state, props) || {},
            wrongCards: getWrongCorrectCardsForResults(state, props) || {},
            skippedCards: getSkippedCardsForResults(state, props) || {},
            valuesFeedback: getFormValues('feedback')(state),
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

export default connect(makeMapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'feedback',
    validate
})(Feedback));