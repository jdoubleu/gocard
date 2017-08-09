import React from "react";
import {Card, CardGroup, CardTitle, Row} from "reactstrap";
import {connect} from "react-redux";
import _ from "lodash";
import FeedbackCard from "./FeedbackPreviewCard";
import {makeGetCardsForResults} from "../../selectors";
import {Field, getFormValues, reduxForm} from "redux-form";
import SelectButton from "../forms/fields/selectButton";
import {
    makeGetCardsByResults,
    makeGetCorrectCardsForResults,
    makeGetLastScoresByAnsweredCardIds,
    makeGetSkippedCardsForResults,
    makeGetValueArrayByAnsweredCardIds,
    makeGetWrongCardsForResults
} from "../../selectors/index";
import ProgressBar from "../register/statistic/ProgressBar";
import {Link} from "react-router-dom";
import Title from "../shared/title";
import ClippedTag from "../shared/clippedTag";

/**
 * Feedback From. Overview of all Cards that were learned in this session. Gives you a statistic for this Cards.
 */
const validate = values => {
    const errors = {};

    return errors
};

const Feedback = ({register, tags, mode, valuesArray, results, resultCards, valuesFeedback, correctCards, wrongCards, skippedCards, lastScores, cardsPowerMode}) => {

    const calcCards = () => {
        if (mode === 'POWER_MODE') {
            return cardsPowerMode;
        } else if (valuesFeedback === undefined || valuesFeedback.cards === "ALL_CARDS") {
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
            return _.isEmpty(correctCards) ? 0 : correctCards.length;
        } else if (valuesFeedback.cards === "WRONG_CARDS") {
            return _.isEmpty(wrongCards) ? 0 : wrongCards.length;
        } else if (valuesFeedback.cards === "SKIPPED_CARDS") {
            return _.isEmpty(skippedCards) ? 0 : skippedCards.length;
        }
    };

    return (
        <div>
            <CardGroup>
                <Card block>
                    <h6 className="text-muted">Name des Registers</h6>
                    <CardTitle><Title title={register.title}/></CardTitle>
                    <h6 className="text-muted">Verwendeten Tags</h6>
                    <div>
                        {
                            tags.map((tag) => {
                                    return (
                                        <span className="btn btn-outline-primary p-1 ml-1" key={tag}><ClippedTag tag={tag}/></span>
                                    )
                                }
                            )
                        }
                    </div>
                    {
                        tags.length === 0 &&
                        <div>Es wurde mit allen Karten gelernt.</div>
                    }

                    <div>
                        <hr/>
                        <Link className="btn btn-outline-primary" to={`/register/${register.id}`}>Zurück zum
                            Register</Link>
                    </div>
                </Card>

                <Card block>
                    <h6 className="text-muted">Statistik</h6>
                    <div>
                        <ProgressBar good={(valuesArray.good || []).length} middle={(valuesArray.middle || []).length}
                                     bad={(valuesArray.bad || []).length}
                                     unanswered={(valuesArray.unanswered || []).length}/>
                    </div>
                </Card>
            </CardGroup>

            <div className="m-2">
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
                    mode === "TEST_MODE" &&
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
                            }
                        ]}

                    />
                }
            </div>
            <Row>
                {
                    resultCards &&
                    _.values(calcCards()).map((card) =>
                        <FeedbackCard card={card} userAnswer={results[card.id].answer}
                                      value={(lastScores[card.id] || {})} key={card.id}
                                      correct={results[card.id].correct}/>
                    )
                }
            </Row>
        </div>
    );
};

const makeMapStateToProps = () => {
    const getCardsForResults = makeGetCardsForResults();
    const getCorrectCardsForResults = makeGetCorrectCardsForResults();
    const getWrongCorrectCardsForResults = makeGetWrongCardsForResults();
    const getSkippedCardsForResults = makeGetSkippedCardsForResults();
    const getValueArrayByAnsweredCardIds = makeGetValueArrayByAnsweredCardIds();
    const getLastScoresByAnsweredCardIds = makeGetLastScoresByAnsweredCardIds();
    const getCardsByResults = makeGetCardsByResults();
    return (state, props) => {
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
            lastScores: getLastScoresByAnsweredCardIds(state, props),
            cardsPowerMode: getCardsByResults(state, props),
        }
    };
};

export default connect(makeMapStateToProps)(reduxForm({
    form: 'feedback',
    validate
})(Feedback));