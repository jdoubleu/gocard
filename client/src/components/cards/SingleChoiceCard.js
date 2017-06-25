import React from "react";
import PropTypes from "prop-types";
import {Button, Card, Col, Form, FormGroup, Input, Label, Row, CardText, CardTitle} from "reactstrap";


class SingleChoiceCard extends React.Component {
    constructor(props) {
        super(props);
        this.display = this.display.bind(this);
        this.getRightAnswer = this.getRightAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.button = this.button.bind(this);
        this.showAnswers = this.showAnswers.bind(this);
        this.state = {
            answer: false,
            show: false
        }
    }

    getRightAnswer() {
        return "Mit toString";
    }

    handleSubmit() {

        this.setState({
            show: true
        })
        console.log(this.state.show);
    }

    validate(event) {

        if (event.target.value === this.getRightAnswer()) {
            this.setState({
                answer: true
            })
        } else {
            this.setState({
                answer: false
            })
        }


    }

    button() {
        if (this.state.show == false) {
            return (<Button block outline color="primary" onClick={() => this.handleSubmit()}>Prüfen</Button>)
        } else {
            return (<br/>)
        }
    }

    display() {

        if (this.state.show === true) {
            console.log("ich darf angezeigt werden");
            if (this.props.mode === 2) {
                if (this.state.answer === true) {
                    return (
                        <Col>
                            <CardText>Deine Antwort war richtig!</CardText>
                            <div className="text-right">
                                <Button outline color="primary">Weiter</Button>
                            </div>
                        </Col>
                    )
                } else if (this.state.answer === false) {
                    return (
                        <div>
                            <CardText>Deine Antwort war flasch! Die richtige Antwort ist</CardText>
                            <CardText>{this.getRightAnswer()}</CardText>
                            <div className="text-right">
                                <Button outline color="primary">Weiter</Button>
                            </div>
                        </div>
                    )
                }
            }
        }
    }

    showAnswers() {
        if (this.state.show === false) {
            console.log("ich bin hier");
            return ( this.props.answer.map((answer) =>
                    <Row>
                        <Col md={{offset: 1, size: 1}}>
                            <Input type="radio" name="buttonAnswer" value={answer}
                                   onClick={this.validate}></Input>
                        </Col>
                        <Col>
                            <CardText>{answer}</CardText>
                        </Col>
                    </Row>
                )
            );
        } else {
            console.log("ich bin da");
            return ( this.props.answer.map((answer) =>
                    <Row>
                        <Col md={{offset: 1, size: 1}}>
                            <Input type="radio" name="buttonAnswer" value={answer}
                                   onClick={this.validate} disabled></Input>
                        </Col>
                        <Col>
                            <CardText>{answer}</CardText>
                        </Col>
                    </Row>
                )
            );
        }

    }

    render() {
        return (
            <Col sm="12" md={{size: 8, offset: 2}}>


                <Card block>

                    <CardTitle>{this.props.question}</CardTitle>
                    <p>Single Choice Frage: bitte kreuze nur eine Antwort an!</p>
                    <FormGroup>
                        {this.showAnswers()}
                    </FormGroup>
                    <FormGroup>
                        {this.display()}
                    </FormGroup>
                    {this.button()}


                </Card>
            </Col>

        );
    }
}

SingleChoiceCard.propTypes = {
    question: PropTypes.string.isRequired,
    desc: PropTypes.string,
    answer: PropTypes.array,
    mode: PropTypes.number
};


SingleChoiceCard.defaultProps = {
    question: "Wie traversiere ich durch eien Baum?",
    answer: ["Mit toString", "Mit Bananen", "Mit Getter/Setter"],
    mode: 2
};

export default SingleChoiceCard;
