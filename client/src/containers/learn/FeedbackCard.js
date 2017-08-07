import React from "react";
import {Badge, Button, CardText, CardTitle, ListGroup, ListGroupItem} from "reactstrap";

import PropTypes from "prop-types";
import _ from "lodash";

const FeedbackCard = ({card, userAnswer, handleClick}) => {

    return (
        <div sm="12" md={{size: 8, offset: 2}}>
            <CardTitle className="text-center">
                Feedback
            </CardTitle>

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
                                            {index+1}. {option}
                                        <Badge pill>{'\u2714'}</Badge></ListGroupItem>
                                    );
                                } else {
                                    //Answer correct && index at different position = green with X
                                    return (
                                        <ListGroupItem className="justify-content-between">
                                            {index+1}. {option}
                                        </ListGroupItem>
                                    );
                                }

                            } else {
                                //Answer not correct
                                if (_.parseInt(userAnswer) === index) {
                                    //Answer not correct && index at position of user Answer = red with X
                                    return (
                                        <ListGroupItem color="danger" className="justify-content-between">
                                            {index+1}. {option}
                                        </ListGroupItem>
                                    );
                                } else if (card.content.correct === index) {
                                    //Answer not correct && index at position of correct answer = red with tick
                                    return (
                                        <ListGroupItem className="justify-content-between">
                                            {index+1}. {option}
                                        <Badge pill>{'\u2714'}</Badge></ListGroupItem>
                                    );
                                } else {
                                    //Answer not correct && index not at position of correct answer = red with X
                                    return (
                                        <ListGroupItem className="justify-content-between">
                                            {index+1}. {option}
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
                        if ((_.includes(userAnswer, index))) {
                            option = option + " ◀ Deine Antwort";
                        }
                        if (_.includes(card.content.corrects, index)) {
                            if (!(_.includes(userAnswer, index))) {
                                option = option + " ◀ Richtige Antwort";
                            }
                            return (
                                <ListGroupItem color="success" className="justify-content-between">
                                    {index+1}. {option}
                                <Badge pill>{'\u2714'}</Badge></ListGroupItem>
                            );
                        } else if ((_.includes(userAnswer, index) && !_.includes(card.content.corrects, index))
                            || (_.includes(card.content.corrects, index) && !_.includes(userAnswer, index))) {
                            return (
                                <ListGroupItem color="danger" className="justify-content-between">
                                    {index+1}. {option}
                                <Badge pill>{'X'}</Badge></ListGroupItem>
                            );
                        } else {
                            return (
                                <ListGroupItem>
                                    {index+1}. {option}
                                </ListGroupItem>
                            );
                        }
                    })
                }
                {
                    card.type === 'text-input' &&
                    (card.content.answer === _.trim(userAnswer)) &&
                    <div>
                        <ListGroupItem>
                            Korrekte Antwort: {card.content.answer}
                        </ListGroupItem>
                        <ListGroupItem color="success" className="justify-content-between">
                            Deine Antwort: {userAnswer}
                        <Badge pill>{'\u2714'}</Badge></ListGroupItem>
                    </div>

                }
                {
                    card.type === 'text-input' &&
                    (card.content.answer !== _.trim(userAnswer)) &&
                    <div>
                        <ListGroupItem>
                            Korrekte Antwort: {card.content.answer}
                        </ListGroupItem>
                        <ListGroupItem color="danger" className="justify-content-between">
                            Deine Antwort: {userAnswer}
                        <Badge pill>{'X'}</Badge></ListGroupItem>
                    </div>

                }

                {
                    card.type === 'self-validate' &&
                    <ListGroupItem color="success" className="justify-content-between">
                        Korrekte Antwort: {card.content.answer}
                    <Badge pill>{'\u2714'}</Badge></ListGroupItem>
                }
                </ListGroup>
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
