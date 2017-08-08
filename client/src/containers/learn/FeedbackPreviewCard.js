import React from "react";
import {Badge, Card, Col, ListGroup, ListGroupItem,} from "reactstrap";
import _ from "lodash";
import {calculateScoreType} from "../../utils/index";
import Title from "../shared/title";

const FeedbackCard = ({card, userAnswer, value, correct}) => {
    const calcColor = () => {
        if (userAnswer === null) {
            return 'secondary';
        } else if (correct === true) {
            return 'success';
        } else if (correct === false) {
            return 'danger';
        }
    };

    const scoreColor = calculateScoreType(value, '#e60000', '#e6b800', '#00e673', '#edecee');

    return (
        <Col xl="4" md="6" xs="12">
            <Card block className="mb-2" outline
                  color={calcColor()}>
                <h6 className="text-muted">Frage</h6>
                <h5>
                    <Title title={card.question}/>
                </h5>

                <h6 className="text-muted">Antwort</h6>
                <ListGroup className="mb-3">
                    {
                        card.type === "single-choice" &&
                        card.content.options.map((option, index) => {
                                if (_.parseInt(userAnswer) === card.content.correct) {
                                    //Answer correct
                                    if (userAnswer === index) {
                                        //Answer correct && index at correct answer position = green with tick
                                        return (
                                            <ListGroupItem color="success" className="justify-content-between" key={index}>
                                                {index + 1}. {option}
                                                <Badge pill>{'\u2714'}</Badge>
                                            </ListGroupItem>
                                        );
                                    } else {
                                        //Answer correct && index at different position = green with X
                                        return (
                                            <ListGroupItem className="justify-content-between" key={index}>
                                                {index + 1}. {option}
                                            </ListGroupItem>
                                        );
                                    }

                                } else {
                                    //Answer not correct
                                    if (_.parseInt(userAnswer) === index) {
                                        //Answer not correct && index at position of user Answer = red with X
                                        return (
                                            <ListGroupItem color="danger" className="justify-content-between" key={index}>
                                                {index + 1}. {option}
                                            </ListGroupItem>
                                        );
                                    } else if (card.content.correct === index) {
                                        //Answer not correct && index at position of correct answer = red with tick
                                        return (
                                            <ListGroupItem className="justify-content-between" key={index}>
                                                {index + 1}. {option}
                                                <Badge pill>{'\u2714'}</Badge>
                                            </ListGroupItem>
                                        );
                                    } else {
                                        //Answer not correct && index not at position of correct answer = red with X
                                        return (
                                            <ListGroupItem className="justify-content-between" key={index}>
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
                                        <ListGroupItem color="success" className="justify-content-between" key={index}>
                                            {index + 1}. {option}
                                            <Badge pill>{'\u2714'}</Badge>
                                        </ListGroupItem>
                                    );
                                } else {
                                    //Index at answerCorrect but userAnswer not at index = white + tick
                                    return (
                                        <ListGroupItem className="justify-content-between" key={index}>
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
                                        <ListGroupItem color="danger" className="justify-content-between" key={index}>
                                            {index + 1}. {option}
                                        </ListGroupItem>
                                    );
                                } else {
                                    //Index at uncorrect answer && userAnswer not at index = white + X
                                    return (
                                        <ListGroupItem className="justify-content-between" key={index}>
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
                <h6 className="text-muted">Score</h6>
                <div>
                    <span className="rounded-circle" style={{'backgroundColor': `${scoreColor}`}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="ml-2">
                        {calculateScoreType(value, 'schlecht', 'geht so', 'gut', 'unbeantwortet')}
                    </span>
                </div>
            </Card>
        </Col>
    );

};

export default (FeedbackCard);

