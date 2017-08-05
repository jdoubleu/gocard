import React from "react";
import {Button, Card, CardText, CardTitle, Col} from "reactstrap";
import Headline from "../../components/shared/headline";
import PropTypes from "prop-types";
import _ from "lodash";

const FeedbackCard = ({card, userAnswer, handleClick}) => {

    return (
        <Col sm="12" md={{size: 8, offset: 2}}>
            <Headline>
                Feedback
            </Headline>
            <CardTitle>
                {card.question}
            </CardTitle>
            <CardText>
                {
                    card.type === "single-choice" &&
                    card.content.options.map((option, index) => {
                            if (_.parseInt(userAnswer) === card.content.correct) {
                                if (userAnswer === index) {
                                    return (
                                        <div className="text-success">
                                            {option}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div>
                                            {option}
                                        </div>
                                    );
                                }

                            } else {
                                if (_.parseInt(userAnswer) === index) {
                                    return (
                                        <div className="text-danger">
                                            {option}
                                        </div>
                                    );
                                } else if (card.content.correct === index) {
                                    return (
                                        <div className="text-success">
                                            {option}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div>
                                            {option}
                                        </div>
                                    );
                                }
                            }
                        }
                    )
                }
                {
                    card.type === "multiple-choice" &&
                    card.content.options.map((option, index) => {
                        // index in UserAnswer && Corrects => Grün
                        // index in UserAnswer != Corrects || Corrects != UserAnser => Rot
                        // sonst so hintergrund
                        if((_.includes(userAnswer, index))){
                            option = option+" ◀";
                        }
                        if(_.includes(card.content.corrects, index)){
                            return (
                                <div className="text-success">
                                    {option}
                                </div>
                            );
                        } else if((_.includes(userAnswer, index)&& !_.includes(card.content.corrects, index))
                            ||(_.includes(card.content.corrects, index) && !_.includes(userAnswer, index))) {
                            return (
                                <div className="text-danger">
                                    {option}
                                </div>
                            );
                        } else {
                            return (
                                <div>
                                    {option}
                                </div>
                            );
                        }
                    })
                }
                <Button outline block color="primary" type="submit" onClick={() => handleClick()}>
                    Nächste karte
                </Button>
            </CardText>
        </Col>
    );

};

FeedbackCard.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object
};

export default (FeedbackCard);