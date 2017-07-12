import React from "react";
import PropTypes from "prop-types";
import {Button, Card, CardText, CardTitle, Col, FormGroup, Input, Row} from "reactstrap";


class SingleChoiceCard extends React.Component {
    constructor(props) {
        super(props);
        this.getRightAnswer = this.getRightAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.button = this.button.bind(this);
        this.showAnswers = this.showAnswers.bind(this);
        this.correct = this.correct.bind(this);

        this.state = {
            answer: false,
            show: false
        }
    }

    correct(answer) {
        if (this.props.mode !== 3) {
            if (answer === this.getRightAnswer()) {
                return (
                    <Col className="text-success">
                        <CardText>{answer}</CardText>
                    </Col>
                )
            } else {
                return (

                    <Col className="text-danger">
                        <CardText>{answer}</CardText>
                    </Col>
                )
            }
        }else{
            return(
                <Col>
                    <CardText>{answer}</CardText>
                </Col>
            )
        }
    }

    getRightAnswer() {
        return this.props.right;
        console.log(this.props.right);
    }

    handleSubmit() {

        this.setState({
            show: true
        })

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
        if (this.state.show === false) {
            return (<Row>
                <Col>
                    <Button block outline color="primary" onClick={() => this.handleSubmit()}>Prüfen</Button>
                </Col>
                <Col>
                    <Button block outline color="primary" onClick={() => this.handleSubmit()}>Weiss ich
                        nicht</Button>
                </Col>
            </Row>)
        } else {
            return (<br/>)
        }
    }

    showAnswers() {
        if (this.state.show === false) {

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
            return (this.props.answer.map((answer) =>
                    <Row>
                        <Col md={{offset: 1, size: 1}}>
                            <Input type="radio" name="buttonAnswer" value={answer}
                                   disabled></Input>
                        </Col>
                        {this.correct(answer)}
                    </Row>
                )
            );
        }

    }


    render() {
        return (
            <Row>
                <Col sm="12" md={{size: 8, offset: 2}}>
                    <Card block>
                        <CardTitle>{this.props.question}</CardTitle>
                        <CardText>Single Choice Frage: Bitte kreuze nur eine Antwort an!</CardText>
                        <FormGroup>
                            {this.showAnswers()}
                        </FormGroup>
                        {this.button()}

                    </Card>

                </Col>

            </Row>
        );
    }
}

SingleChoiceCard.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    mode: PropTypes.number.isRequired,
    desc: PropTypes.string,
    right: PropTypes.string

};


SingleChoiceCard.defaultProps = {};

export default SingleChoiceCard;
