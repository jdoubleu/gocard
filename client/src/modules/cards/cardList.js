import React from "react";
import {CardText, Col, Label, Row} from "reactstrap";
import dummy from "../dummyCards.json";

class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.displayAllCards = this.displayAllCards.bind(this);
        this.getAllCards = this.getAllCards.bind(this);
        this.displayStatus = this.displayStatus.bind(this);
        this.state = {
            cards: dummy
        }
    }

    getAllCards() {
        this.setState({
            cards: dummy
        });
        console.log(this.state.cards);
        return this.state.cards;
    }

    displayStatus(status) {
        if (status === "true") {
            return (

                <CardText>✔
                </CardText>
            )
        } else {
            return (
                <CardText>X</CardText>
            )
        }
    }

    displayAllCards() {
        return (
            this.state.cards.map((cards) => <div><Row key={cards.id}>
                    <Col>
                        <Label>Frage</Label>
                    </Col>
                    <Col>
                        <CardText>{cards.question}</CardText>
                    </Col>

                </Row>
                    <Row>

                        <Col>
                            <Label>Antwort</Label>
                        </Col>
                        <Col>
                            <CardText>{cards.answer}</CardText>
                        </Col>
                        <Col>
                            {this.displayStatus(cards.status)}
                        </Col>
                    </Row>
                </div>
            ));
    }

    render() {
        return (
            <div>
                {this.displayAllCards()}
            </div>
        );
    }
}


export default Feedback;
