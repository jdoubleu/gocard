import React from "react";
import {Card, Col, CardGroup, CardTitle, CardText, Row, CardDeck} from "reactstrap";
import {connect} from "react-redux";
import _ from "lodash";
import FeedbackCard from "./FeedbackPreviewCard";
import {makeGetCardsForResults} from "../../selectors";
import {Field, getFormValues, reduxForm} from "redux-form";
import SelectButton from "../forms/fields/selectButton";
import {
    makeGetCorrectCardsForResults, makeGetSkippedCardsForResults, makeGetValueArrayByAnsweredCardIds,
    makeGetWrongCardsForResults
} from "../../selectors/index";
import ProgressBar from "../register/statistic/ProgressBar";

const validate = values => {
    const errors = {};

    return errors
};

const Feedback = ({register, tags, mode, valuesArray, results, resultCards, valuesFeedback, correctCards, wrongCards, skippedCards}) => {

    const CalcCardStatistic = (correct) => {
        //Load stats for current card
        //Calculate new Stats
        //return new stats object
    };
    const bug = () => {
        console.log("feedback", valuesFeedback);
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
        if (valuesFeedback === undefined || valuesFeedback.cards === "ALL_CARDS") {
            return resultCards;
        } else if (valuesFeedback.cards === "CORRECT_CARDS") {
            return correctCards;
        } else if (valuesFeedback.cards === "WRONG_CARDS") {
            return wrongCards;
        } else if (valuesFeedback.cards === "SKIPPED_CARDS") {
            return skippedCards;
        }
    };

    const calcCardCount = () => {
        if (valuesFeedback === undefined || valuesFeedback.cards === "ALL_CARDS") {
            return resultCards.length;
        } else if (valuesFeedback.cards === "CORRECT_CARDS") {
            return _.isEmpty(correctCards.length) ? 0 : correctCards.length;
        } else if (valuesFeedback.cards === "WRONG_CARDS") {
            return _.isEmpty(wrongCards.length) ? 0 : wrongCards.length;
        } else if (valuesFeedback.cards === "SKIPPED_CARDS") {
            return _.isEmpty(skippedCards) ? 0 : skippedCards.length;
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
                            <span>Es wurde mit allen Karten gelernt.</span>
                        }
                    </CardText>
                </Card>
                <Card block>
                    <CardTitle>Statistik</CardTitle>
                    <CardText>
                        <ProgressBar good={(valuesArray.good || []).length} middle={(valuesArray.middle || []).length}
                                      bad={(valuesArray.bad || []).length || 0}/>
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
                            label={`${calcCardCount()} von ${resultCards.length} Karten`}
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
                            <FeedbackCard card={card} userAnswer={results[card.id].answer}/>
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
    const getValueArrayByAnsweredCardIds = makeGetValueArrayByAnsweredCardIds();
    const mapStateToProps = (state, props) => {
        return {
            cardIds: state.ui.learning.allIds || [],
            tags: state.ui.learning.misc.tags || [],
            results: state.ui.learning.byId || {},
            resultCards: getCardsForResults(state, props) || {},
            correctCards: getCorrectCardsForResults(state, props) || {},
            wrongCards: getWrongCorrectCardsForResults(state, props) || {},
            skippedCards: getSkippedCardsForResults(state, props) || {},
            valuesFeedback: getFormValues('feedback')(state),
            valuesArray: getValueArrayByAnsweredCardIds(state, props),
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