import React from "react";
import {Card, Col} from "reactstrap";
import Headline from "../../components/shared/headline";
import _ from "lodash";
import {addCard} from "../../actions/card";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import SingleChoiceCardForm from "../forms/SingleChoiceLearn";
import {makeGetCardsByRegister} from "../../selectors/index";



const LearnMode = ({mode, currentCard, cards }) => {

    const handleSubmit = (values, dispatch) => {

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
                    currentCard.type === "single-choice" &&
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
            currentCard: state.ui.learnMode.currentCard || firstCard,
            mode: state.ui.learnMode.mode || "NORMAL_MODE",

        }
    };
    return mapStateToProps
};

export default connect(makeMapStateToProps)(LearnMode);