import React from "react";
import {Card, Col, Progress} from "reactstrap";
import Headline from "../shared/headline";
import {connect} from "react-redux";
import SingleChoiceCardForm from "../forms/SingleChoiceLearn";
import MultipleChoiceCardForm from "../forms/MultipleChoiceLearn";
import SelfValidateCardForm from "../forms/SelfValidateLearn";
import TextInputCardForm from "../forms/TextInputLearn";
import {
    makeGetCardIdsByTags,
    makeGetCardsByRegister,
    makeGetLastScoreForCurrentCard,
    makeGetNextCard,
    makeGetSizeOfResults,
} from "../../selectors/index";
import {getFormValues} from "redux-form";
import _ from "lodash";
import {addResult, setLastCorrect, setLastResult, setShowResult} from "../../actions/ui";
import {addScore} from "../../actions/score";
import FeedbackCard from "../../containers/learn/FeedbackCard";
import Feedback from "../../containers/learn/Feedback";
import moment from "moment";

const LearnMode = ({userId, mode, register, currentCard, valuesSingle, showResult, lastResult, handleFeedbackClick, valuesMultiple, lastCorrect, valuesSelfValidate, valuesTextInput, resultCards, scoreCurrentCard, createScoreForCard, handleSkip, countAnswers, countCards}) => {

    const calcCardStatistic = () => {
        let scoreStep = 0;
        if (lastCorrect === true) {
            scoreStep = 1;
        } else if (lastCorrect === false || lastCorrect === null) {
            scoreStep = -1;
        }
        if (scoreCurrentCard === null) {
            if (scoreStep === -1) {
                scoreStep = 0;
            }
            let body = {
                user: userId,
                card: currentCard.id,
                value: scoreStep,
                date: moment().format(),
            };
            createScoreForCard(currentCard.id, body);
        } else {
            let score = _.parseInt(scoreCurrentCard.value);
            score += scoreStep;
            if (score < 0) {
                score = 0;
            }
            let body = {
                user: userId,
                card: currentCard.id,
                value: score,
                date: moment().format(),
            };
            createScoreForCard(currentCard.id, body);
        }
    };

    const handleSubmitSingleChoice = (values, dispatch) => {
        if (currentCard.type === "single-choice") {
            let res;
            res = valuesSingle !== undefined && currentCard.content.correct === _.parseInt(valuesSingle.userAnswer);
            dispatch(setLastCorrect(res));
            dispatch(setLastResult(_.parseInt(valuesSingle.userAnswer)));
            calcCardStatistic();
            if (mode !== "TEST_MODE") {
                dispatch(setShowResult(true));
            } else {
                dispatch(addResult(currentCard.id, _.parseInt(valuesSingle.userAnswer), res));
            }
        }
    };

    const handleSubmitMultipleChoice = (values, dispatch) => {
        if (currentCard.type === "multiple-choice") {
            let resA = _.difference(currentCard.content.corrects, valuesMultiple.userAnswer.answer).length === 0;
            let resB = _.difference(valuesMultiple.userAnswer.answer, currentCard.content.corrects).length === 0;
            let res = resA && resB;
            dispatch(setLastCorrect(res));
            dispatch(setLastResult(valuesMultiple.userAnswer.answer));
            calcCardStatistic();
            if (mode !== "TEST_MODE") {
                dispatch(setShowResult(true));
            } else {
                dispatch(addResult(currentCard.id, valuesMultiple.userAnswer.answer, res));
            }
        }
    };
    const handleSubmitSelfValidate = (values, dispatch) => {
        let res = valuesSelfValidate.correct === "true";
        calcCardStatistic();
        dispatch(addResult(currentCard.id, res, res));
        valuesSelfValidate.correct = undefined;
    };

    const handleSubmitTextInput = (values, dispatch) => {
        let lastAnswer = _.trim(valuesTextInput.userAnswer);
        let res = currentCard.content.answer === lastAnswer;
        dispatch(setLastCorrect(res));
        dispatch(setLastResult(lastAnswer));
        calcCardStatistic();
        if (mode !== "TEST_MODE") {
            dispatch(setShowResult(true));
        } else {
            dispatch(addResult(currentCard.id, lastAnswer, res));
        }
    };

    return (
        <Col>
            <Headline
                title={mode === "NORMAL_MODE" ? "Normaler Modus" : mode === "POWER_MODE" ? "Power Modus" : "Klausur Modus"}>
                {currentCard ? 'Hier kannst du Lernen' : 'Hier bekommst du ein gesamt Feedback'}
            </Headline>
            <div className="text-center">Fortschritt {((countAnswers + showResult) / countCards) * 100}%</div>
            <Col sm="12" md={{size: 8, offset: 2}}>
                <Progress value={((countAnswers + showResult) / countCards) * 100} className="mb-1"/>
                {currentCard !== null &&
                <Card block>
                    {
                        currentCard && mode !== "TEST_MODE" && showResult === true &&
                        <FeedbackCard card={currentCard} userAnswer={lastResult}
                                      handleClick={() => {
                                          handleFeedbackClick(currentCard.id, lastResult, lastCorrect)
                                      }}/>
                    }
                    {
                        currentCard && currentCard.type === "single-choice" && showResult === false &&
                        <SingleChoiceCardForm onSubmit={handleSubmitSingleChoice} card={currentCard} mode={mode}
                                              handleSkip={handleSkip}/>
                    }
                    {
                        currentCard && currentCard.type === "multiple-choice" && showResult === false &&
                        <MultipleChoiceCardForm onSubmit={handleSubmitMultipleChoice} card={currentCard} mode={mode}
                                                handleSkip={handleSkip}/>
                    }
                    {
                        currentCard && currentCard.type === 'self-validate' && showResult === false &&
                        <SelfValidateCardForm onSubmit={handleSubmitSelfValidate} card={currentCard} mode={mode}
                                              handleSkip={handleSkip}/>
                    }
                    {
                        currentCard && currentCard.type === 'text-input' && showResult === false &&
                        <TextInputCardForm onSubmit={handleSubmitTextInput} card={currentCard} mode={mode}
                                           handleSkip={handleSkip}/>
                    }
                </Card>


                }
            </Col>
            {
                currentCard === null &&
                <Feedback register={register} mode={mode} resultCards={resultCards} registerId={register.id}/>
            }

        </Col>
    );

};

const makeMapStateToProps = () => {
    const getCardsByRegister = makeGetCardsByRegister();
    const getNextCard = makeGetNextCard();
    const getScoreCurrentCard = makeGetLastScoreForCurrentCard();
    const getCardIdsByTags = makeGetCardIdsByTags();
    const getSizeOfResults = makeGetSizeOfResults();

    const mapStateToProps = (state, props) => {
        const registerId = props.match.params.registerId;
        return {
            register: state.entities.registers.byId[registerId] || {},
            cards: getCardsByRegister(state, props) || [],
            currentCard: getNextCard(state, props),
            mode: state.ui.learning.misc.mode || "NORMAL_MODE",
            valuesSingle: getFormValues('singleChoiceLearn')(state),
            valuesMultiple: getFormValues('multipleChoiceLearn')(state),
            valuesSelfValidate: getFormValues('selfValidateLearn')(state),
            valuesTextInput: getFormValues('textInputLearn')(state),
            showResult: state.ui.learning.misc.showResult || false,
            lastResult: state.ui.learning.misc.lastResult,
            lastCorrect: state.ui.learning.misc.lastCorrect,
            scoreCurrentCard: getScoreCurrentCard(state, props) || null,
            userId: state.auth.userId,
            countAnswers: getSizeOfResults(state, props),
            countCards: getCardIdsByTags(state, props).length,
        }
    };
    return mapStateToProps
};

const mapDispatchToProps = dispatch => ({
    handleFeedbackClick: (cardId, answer, correct) => {
        dispatch(setShowResult(false));
        dispatch(addResult(cardId, answer, correct));
    },
    createScoreForCard: (currentCardId, body) => {
        dispatch(addScore(currentCardId, body));
    },
    handleSkip: () => {
        dispatch(setLastCorrect(null));
        dispatch(setLastResult(null));
        dispatch(setShowResult(true));
    }
});

export default connect(makeMapStateToProps, mapDispatchToProps)(LearnMode);