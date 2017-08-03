import React from "react";
import {Card, Col} from "reactstrap";
import Headline from "../../components/shared/headline";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import SingleChoiceCardForm from "../forms/SingleChoiceLearn";
import {makeGetCardsByRegister} from "../../selectors/index";
import {getFormValues} from "redux-form";
import _ from "lodash";
import {setLastResult, setShowResult} from "../../actions/ui";
import FeedbackCard from "../../containers/learn/FeedbackCard";

const LearnMode = ({mode, currentCard, cards, valid, answerSingleChoice, valuesSingle, showResult, lastResult ,handleFeedbackClick}) => {

    const handleSubmit = (values, dispatch) => {
        if(currentCard.type === "single-choice") {
            if(valuesSingle !== undefined && currentCard.content.correct === _.parseInt(valuesSingle.userAnswer)) {
                console.log("Correct");
            } else {
                console.log("False");
            }
            dispatch(setLastResult(_.parseInt(valuesSingle.userAnswer)));
            if(mode !== "TEST_MODE") {
                dispatch(setShowResult(true))
            }
        }
    };

    const matchTitle = () =>{
        console.log("mode", mode);
        console.log("cards", cards);
        console.log("currentCard", currentCard);
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
                    mode !== "TEST_MODE" && showResult === true &&
                    <FeedbackCard card={currentCard} userAnswer={lastResult} handleClick={handleFeedbackClick}/>
                }
                {
                    currentCard.type === "single-choice" && showResult === false &&
                    <SingleChoiceCardForm onSubmit={handleSubmit} card={currentCard}/>
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
    const mapStateToProps = (state, props) => {
        const registerId = props.match.params.registerId;
        const firstCard = getCardsByRegister(state, props)[0];
        return {
            register: state.entities.registers.byId[registerId] || {},
            cards: getCardsByRegister(state, props) || [],
            currentCard: state.ui.learning.misc.currentCard || firstCard,
            mode: state.ui.learning.misc.mode || "NORMAL_MODE",
            valuesSingle: getFormValues('singleChoiceLearn')(state),
            showResult: state.ui.learning.misc.showResult || false,
            lastResult: state.ui.learning.misc.lastResult || -1
        }
    };
    return mapStateToProps
};

function mapDispatchToProps(dispatch) {
    return({
        handleFeedbackClick: () => {dispatch(setShowResult(false))}
    })
}

export default connect(makeMapStateToProps, mapDispatchToProps)(LearnMode);