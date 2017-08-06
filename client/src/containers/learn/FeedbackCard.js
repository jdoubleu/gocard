import React from "react";
import {Button, CardText, CardTitle, Col, Card, CardHeader, CardBlock} from "reactstrap";
import Headline from "../shared/headline";
import PropTypes from "prop-types";
import _ from "lodash";

const FeedbackCard = ({card, userAnswer, handleClick}) => {

    return (
        <div>
            <CardTitle className="text-center">
                Feedback
            </CardTitle>
            <h4 className="text-muted">Frage</h4>
            <CardTitle>
                {card.question}
            </CardTitle>
            <h4 className="text-muted">Antworten</h4>
            <CardText>
                {
                    card.type === "single-choice" &&
                    card.content.options.map((option, index) => {
                            if (_.parseInt(userAnswer) === card.content.correct) {
                                if (userAnswer === index) {
                                    option = option + " ◀ Deine Antwort";
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
                                    option = option + " ◀ Deine Antwort";
                                    return (
                                        <div className="text-danger">
                                            {option}
                                        </div>
                                    );
                                } else if (card.content.correct === index) {
                                    option = option + " ◀ Richtige Antwort";
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
                        if ((_.includes(userAnswer, index))) {
                            option = option + " ◀ Deine Antwort";
                        }
                        if (_.includes(card.content.corrects, index)) {
                            if(!(_.includes(userAnswer, index))) {
                                option = option + " ◀ Richtige Antwort";
                            }
                            return (
                                <div className="text-success">
                                    {option}
                                </div>
                            );
                        } else if ((_.includes(userAnswer, index) && !_.includes(card.content.corrects, index))
                            || (_.includes(card.content.corrects, index) && !_.includes(userAnswer, index))) {
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
                {
                    card.type === 'text-input' &&
                    (card.content.answer === _.trim(userAnswer)) &&
                    <div>
                        <div>
                            Korrekte Antwort: {card.content.answer}
                        </div>
                        <div className="text-success">
                            Deine Antwort: {userAnswer}
                        </div>
                    </div>

                }
                {
                    card.type === 'text-input' &&
                    (card.content.answer !== _.trim(userAnswer)) &&
                    <div>
                        <div>
                            Korrekte Antwort: {card.content.answer}
                        </div>
                        <div className="text-danger">
                            Deine Antwort: {userAnswer}
                        </div>
                    </div>

                }

                {
                    card.type === 'self-validate' &&
                        <div className="mb-1">
                            Korrekte Antwort: {card.content.answer}
                        </div>
                }
                <Button outline block color="primary" type="submit" onClick={() => handleClick()}>
                    Nächste karte
                </Button>
            </CardText>
        </div>
    );

};

FeedbackCard.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object
};

export default (FeedbackCard);
