import React from "react";
import {Button, Card, Col, Form, Input,CardText, CardTitle, FormGroup, Row, Label} from "reactstrap";
import dummy from "../../dummyCards.json";

class Feedback extends React.Component {
    constructor(props){
        super(props);
        this.displayAllCards = this.displayAllCards.bind(this);
        this.getAllCards = this.getAllCards.bind(this);
        this.state = {
            cards : dummy
        }
    }
    getAllCards(){
        this.setState({
            cards: dummy
        })
        console.log(this.state.cards);
        return this.state.cards;
    }

    displayAllCards(){
        return(
            this.state.cards.map((cards) =><div> <Row key={cards.id}>
            <Col>
                <CardText>{cards.question}</CardText>
                </Col>
        </Row>
                <Row>
                    <Col>
                    <CardText>{cards.answer}</CardText>
                        </Col>
                    <Col>
                        {cards.status}
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
