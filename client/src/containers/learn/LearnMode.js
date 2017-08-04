import React from "react";
import {Card, Col} from "reactstrap";
import Headline from "../../components/shared/headline";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import SingleChoiceCardForm from "../forms/SingleChoiceLearn";
import MultipleChoiceCardForm from "../forms/MultipleChoiceLearn";
import {makeGetCardsByRegister, makeGetNextCard} from "../../selectors/index";
import {getFormValues} from "redux-form";
import _ from "lodash";
import {addResult, setLastCorrect, setLastResult, setShowResult} from "../../actions/ui";
import FeedbackCard from "../../containers/learn/FeedbackCard";

const LearnMode = ({mode, currentCard, cards, valid, answerSingleChoice, valuesSingle, showResult, lastResult , handleFeedbackClick, valuesMultiple, lastCorrect}) => {

    const CalcCardStatistic = (correct) =>{
        //Load stats for current card
        //Calculate new Stats
        //return new stats object
    };

    const handleSubmitSingleChoice = (values, dispatch) => {
        if(currentCard.type === "single-choice") {
            let res;
            if(valuesSingle !== undefined && currentCard.content.correct === _.parseInt(valuesSingle.userAnswer)) {
                console.log("Correct");
                res = true;
            } else {
                console.log("False");
                res = false;
            }
            dispatch(setLastCorrect(res));
            dispatch(setLastResult(_.parseInt(valuesSingle.userAnswer)));

            if(mode !== "TEST_MODE") {
                console.log("JEEEPPPP");
                dispatch(setShowResult(true));
            }else {
                console.log("NOOOOOOPPPPEEE");
                dispatch(addResult(currentCard.id, _.parseInt(valuesSingle.userAnswer), res));
            }
        }
    };

    const handleSubmitMultipleChoice = (values, dispatch) => {
        if(currentCard.type === "multiple-choice") {
            console.log("multiple",valuesMultiple);
        }
    };

    const matchTitle = () =>{
        if(mode === "NORMAL_MODE"){
            return "Normaler Modus";
        }else if(mode === "POWER_MODE"){
            return "Power Modus";
        }else if("TEST_MODE"){
            return "Klausur Modus";
        }
    };

    return (
        <Col sm="12" md={{size: 8, offset: 2}}>
            <Headline title={matchTitle()}>
                Hier kannst du Lernen
            </Headline>
            <Card block>
                {
                    currentCard && mode !== "TEST_MODE" && showResult === true &&
                    <FeedbackCard card={currentCard} userAnswer={lastResult} handleClick={() => handleFeedbackClick(currentCard.id, lastResult, lastCorrect)}/>
                }
                {
                    currentCard && currentCard.type === "single-choice" && showResult === false &&
                    <SingleChoiceCardForm onSubmit={handleSubmitSingleChoice} card={currentCard}/>
                }
                {
                    currentCard && currentCard.type === "multiple-choice" && showResult === false &&
                    <MultipleChoiceCardForm onSubmit={handleSubmitMultipleChoice} card={currentCard}/>
                }
                {
                    !currentCard &&
                    <h1>done</h1>
                    
                }
            </Card>
        </Col>
    );

};

LearnMode.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object
};


const makeMapStateToProps = () => {
    const getCardsByRegister = makeGetCardsByRegister();
    const getNextCard = makeGetNextCard();
    const mapStateToProps = (state, props) => {
        const registerId = props.match.params.registerId;
        const firstCard = getCardsByRegister(state, props)[0];
        return {
            register: state.entities.registers.byId[registerId] || {},
            cards: getCardsByRegister(state, props) || [],
            //currentCard: state.ui.learning.misc.currentCard || firstCard,
            currentCard: getNextCard(state, props),
            mode: state.ui.learning.misc.mode || "NORMAL_MODE",
            valuesSingle: getFormValues('singleChoiceLearn')(state),
            valuesMultiple: getFormValues('multipleChoiceLearn')(state),
            showResult: state.ui.learning.misc.showResult || false,
            lastResult: state.ui.learning.misc.lastResult || -1,
            userId: state.auth.userId,
            lastCorrect: state.ui.learning.misc.lastCorrect || -1
        }
    };
    return mapStateToProps
};

function mapDispatchToProps(dispatch) {
    return({
        handleFeedbackClick: (cardId, answer, correct) => {
            dispatch(setShowResult(false));
            dispatch(addResult(cardId, answer, correct));
        }
    })
}

export default connect(makeMapStateToProps, mapDispatchToProps)(LearnMode);