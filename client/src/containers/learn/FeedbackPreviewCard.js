import React from "react";
import {Button, Card, CardText, CardTitle, Col} from "reactstrap";
import PropTypes from "prop-types";
import _ from "lodash";

const FeedbackCard = ({card, userAnswer}) => {

    return (
        <Col sm="12" md={{size: 8, offset: 2}}>
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
                        if ((_.includes(userAnswer, index))) {
                            option = option + " ◀";
                        }
                        if (_.includes(card.content.corrects, index)) {
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
                    card.type === "self-validate" && userAnswer === true &&
                    <div className="text-success">
                        Richtig
                    </div>
                }
                {
                    card.type === "self-validate" && userAnswer === false &&
                    <div className="text-danger">
                        Falsch
                    </div>
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