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
        this.state = {
            answer: false,
            show: ''
        }
    }

    getRightAnswer() {
        return "Mit toString";
    }

    handleSubmit() {

        this.setState({
            show:true
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

    display() {
        console.log("display");
        if(this.state.show === true) {
            console.log("ich darf angezeigt werden");
            if (this.props.mode === 2) {
                if (this.state.answer === true) {
                    return (
                        <CardText>Deine Antwort war richtig!</CardText>
                    )
                } else if (this.state.answer === false) {
                    return (
                        <div>
                            <CardText>Deine Antwort war flasch! Die richtige Antwort ist</CardText>
                            <CardText>{this.getRightAnswer()}</CardText>
                        </div>
                    )
                }
            }
        }
    }

    render() {
        return (
            <Col sm="12" md={{size: 8, offset: 2}}>


                <Card block>

                        <CardTitle>{this.props.question}</CardTitle>
                        <p>Single Choice Frage: bitte kreuze nur eine Antwort an!</p>
                        <FormGroup>
                            {this.props.answer.map((answer) => {
                                return <Row>
                                    <Col md={{offset: 1, size: 1}}>
                                        <Input type="radio" name="buttonAnswer" value={answer}
                                               onClick={this.validate}></Input>
                                    </Col>
                                    <Col>
                                        <CardText>{answer}</CardText>
                                    </Col>
                                </Row>
                            })
                            }
                        </FormGroup>
                    <FormGroup>
                        {this.display()}
                    </FormGroup>

                        <Button block outline color="primary" onClick={() => this.handleSubmit()}>Prüfen</Button>





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
