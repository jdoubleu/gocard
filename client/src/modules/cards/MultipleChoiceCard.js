import React from "react";
import PropTypes from "prop-types";
import {Button, Card, Col, FormGroup, Input, Row, CardText, CardTitle} from "reactstrap";
import lodash from "lodash";


class MultipleChoiceCard extends React.Component {
    constructor(props) {
        super(props);
        this.display = this.display.bind(this);
        this.getRightAnswers = this.getRightAnswers.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.showAnswers = this.showAnswers.bind(this);
        this.button = this.button.bind(this);
        this.array = [];
        this.count = 0;
        this.state = {
            answer: false,
            show: false,
            clicked: [],
            test: []
        }
    }

    getRightAnswers() {
        let answers = ["Ned", "Jon", "Hodor"];

        return answers;
    }

    handleSubmit() {

        this.setState({
            show: true,
        })
    }

    validate(event) {

        let test = false;
        this.array.forEach(a => {
            if (a === event.target.value) {
                let index = this.array.indexOf(event.target.value);
                delete this.array[index];
                test = true;
            }
        });

        if (test === false) {
            this.array = this.array.concat(event.target.value);
        }
        let valid = false;
        this.count = 0;
        console.log(this.array);
        console.log(this.getRightAnswers());
        let dif = lodash.difference(this.getRightAnswers(),this.array );
        if (dif.length === 0) {
            valid = true;
        }
        let allundifiend = true;
        this.array.forEach(a => {
            if (a != undefined) {
                allundifiend = false;
            }
        })
        if (allundifiend === true) {
            valid = false;
        }

        this.setState({
            clicked: this.array,
            answer: valid
        })


    }

    display() {

        if (this.state.show === true) {

            if (this.props.mode === 1) {
                if (this.state.answer === true) {
                    return (
                        <div>
                            <CardText>Deine Antwort war richtig!</CardText>

                        </div>
                    )
                } else if (this.state.answer === false) {
                    console.log("hallo");
                    return (

                        <div>
                            <CardText>Deine Antwort war flasch! Die richtige Antworten sind</CardText>
                            {this.getRightAnswers().map((a) => {
                                return <CardText>{a}</CardText>
                            })}

                        </div>
                    )
                }
            }
        }
    }



    showAnswers() {
        if (this.state.show === false) {
            return ( this.props.answer.map((answer) =>
                    <Row>
                        <Col md={{offset: 1, size: 1}}>
                            <Input type="checkbox" name="buttonAnswer" value={answer}
                                   onClick={this.validate}></Input>
                        </Col>
                        <Col>
                            <CardText>{answer}</CardText>
                        </Col>
                    </Row>
                )
            );
        } else {
            return ( this.props.answer.map((answer) =>
                    <Row>
                        <Col md={{offset: 1, size: 1}}>
                            <Input type="checkbox" name="buttonAnswer" value={answer}
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

    button() {
        if (this.state.show == false) {
            return (<Button block outline color="primary" onClick={() => this.handleSubmit()}>Prüfen</Button>)
        } else {
            return (<br/>)
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

MultipleChoiceCard.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.array.isRequired,
    mode: PropTypes.number.isRequired,
    desc: PropTypes.string,
    right: PropTypes.array,

};


MultipleChoiceCard.defaultProps = {
};

export default MultipleChoiceCard;

