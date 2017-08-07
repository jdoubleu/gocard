import React from "react";
import {Badge, Card, CardText, CardTitle, Col, ListGroup, ListGroupItem,} from "reactstrap";
import _ from "lodash";
import {calculateScoreType} from "../../utils/index";

const FeedbackCard = ({card, userAnswer, value}) => {
    return (
        <Col xl="4" md="6" xs="12">
            <Card block className="mb-2" outline
                  color={calculateScoreType(value, 'danger', 'warning', 'success', 'secondary')}>
                <h6 className="text-muted">Frage</h6>
                <CardTitle>
                    {card.question}
                </CardTitle>

                <h6 className="text-muted">Antwort</h6>
                <CardText>
                    <ListGroup className="mb-3">
                        {
                            card.type === "single-choice" &&
                            card.content.options.map((option, index) => {
                                    if (_.parseInt(userAnswer) === card.content.correct) {
                                        //Answer correct
                                        if (userAnswer === index) {
                                            //Answer correct && index at correct answer position = green with tick
                                            return (
                                                <ListGroupItem color="success" className="justify-content-between">
                                                    {index + 1}. {option}
                                                    <Badge pill>{'\u2714'}</Badge>
                                                </ListGroupItem>
                                            );
                                        } else {
                                            //Answer correct && index at different position = green with X
                                            return (
                                                <ListGroupItem className="justify-content-between">
                                                    {index + 1}. {option}
                                                </ListGroupItem>
                                            );
                                        }

                                    } else {
                                        //Answer not correct
                                        if (_.parseInt(userAnswer) === index) {
                                            //Answer not correct && index at position of user Answer = red with X
                                            return (
                                                <ListGroupItem color="danger" className="justify-content-between">
                                                    {index + 1}. {option}
                                                </ListGroupItem>
                                            );
                                        } else if (card.content.correct === index) {
                                            //Answer not correct && index at position of correct answer = red with tick
                                            return (
                                                <ListGroupItem className="justify-content-between">
                                                    {index + 1}. {option}
                                                    <Badge pill>{'\u2714'}</Badge>
                                                </ListGroupItem>
                                            );
                                        } else {
                                            //Answer not correct && index not at position of correct answer = red with X
                                            return (
                                                <ListGroupItem className="justify-content-between">
                                                    {index + 1}. {option}
                                                </ListGroupItem>
                                            );
                                        }
                                    }
                                }
                            )
                        }
                        {
                            card.type === "multiple-choice" &&
                            card.content.options.map((option, index) => {
                                if (_.includes(card.content.corrects, index)) {
                                    //Index at answerCorrect
                                    if (_.includes(userAnswer, index)) {
                                        //Index at answerCorrect and userAnswer at index = green + tick
                                        return (
                                            <ListGroupItem color="success" className="justify-content-between">
                                                {index + 1}. {option}
                                                <Badge pill>{'\u2714'}</Badge>
                                            </ListGroupItem>
                                        );
                                    } else {
                                        //Index at answerCorrect but userAnswer not at index = white + tick
                                        return (
                                            <ListGroupItem className="justify-content-between">
                                                {index + 1}. {option}
                                                <Badge pill>{'\u2714'}</Badge>
                                            </ListGroupItem>
                                        );
                                    }
                                } else {
                                    //Index at uncorrect answer = red + X
                                    if (_.includes(userAnswer, index)) {
                                        //Index at uncorrect answer && userAnswer at index = red + X
                                        return (
                                            <ListGroupItem color="danger" className="justify-content-between">
                                                {index + 1}. {option}
                                            </ListGroupItem>
                                        );
                                    } else {
                                        //Index at uncorrect answer && userAnswer not at index = white + X
                                        return (
                                            <ListGroupItem className="justify-content-between">
                                                {index + 1}. {option}
                                            </ListGroupItem>
                                        );
                                    }
                                }
                            })
                        }
                        {
                            card.type === 'text-input' &&
                            (card.content.answer === _.trim(userAnswer)) &&
                            <div>
                                <ListGroupItem color="success" className="justify-content-between">
                                    {userAnswer}
                                    <Badge pill>{'\u2714'}</Badge>
                                </ListGroupItem>
                            </div>

                        }
                        {
                            card.type === 'text-input' &&
                            (card.content.answer !== _.trim(userAnswer)) &&
                            <div>
                                <ListGroupItem className="justify-content-between">
                                    {card.content.answer}
                                    <Badge pill>{'\u2714'}</Badge>
                                </ListGroupItem>
                                <ListGroupItem color="danger" className="justify-content-between">
                                    {userAnswer}
                                </ListGroupItem>
                            </div>

                        }

                        {
                            card.type === 'self-validate' &&
                            <ListGroupItem className="justify-content-between">
                                {card.content.answer}
                                <Badge pill>{'\u2714'}</Badge>
                            </ListGroupItem>
                        }
                    </ListGroup>
                </CardText>
            </Card>
        </Col>
    );

};

export default (FeedbackCard);

