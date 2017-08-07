import React from "react";
import {Card, CardText, CardTitle, Col,} from "reactstrap";
import PropTypes from "prop-types";
import _ from "lodash";

const FeedbackCard = ({card, userAnswer, value}) => {
    return (
        <Col xl="4" md="6" xs="12">
            <Card block className="mb-2" outline color={value < 3 ? 'danger' : value < 6 ? 'warning' : 'success'}>
                <h5 className="text-muted">Frage</h5>
                <CardTitle>
                    {card.question}
                </CardTitle>
                <h5 className="text-muted">Antwort</h5>
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
                            if (!(_.includes(userAnswer, index))) {
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
            </Card>
        </Col>
    );

};

export default (FeedbackCard);

