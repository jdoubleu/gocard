import React from "react";
import PropTypes from "prop-types";
import {Button, Card, Col, Form, FormGroup, Input, Label, Row, CardText, CardTitle} from "reactstrap";


class MultipleChoiceCard extends React.Component {
    constructor(props) {
        super(props);
        this.display = this.display.bind(this);
        this.getRightAnswers = this.getRightAnswers.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.state = {
            answer: false,
            show: '',
            clicked: [],
            test: []
        }
    }

    getRightAnswers() {
        let answers = ["Mit toString", "durch Rekursion", "Pre/Post/In Order"];
        return answers;
    }

    handleSubmit() {

        this.setState({
            show: true,
            clicked: this.state.clicked
        })
        console.log(this.state.show);
    }

    validate(event) {
        let array = []

        array.forEach(a => {
            if (a === event.target.value) {
                let index = array.indexOf(event.target.value);
                delete array[index];
            }
        });
        array = array.concat(event.target.value);
        array.forEach(a =>{
            this.getRightAnswers().forEach(d =>{
                if(a === d){
                    this.setState({
                        answer: true
                    })
                }else{
                    this.setState({
                        answer: false
                    })
                }
            })
        });
        this.setState({
            clicked: array
        })
        console.log(this.state.clicked);




    }

    display() {

        if (this.state.show === true) {

            if (this.props.mode === 2) {
                if (this.state.answer === true) {
                    return (
                        <CardText>Deine Antwort war richtig!</CardText>
                    )
                } else if (this.state.answer === false) {
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
                                    <Input type="checkbox" name="buttonAnswer" value={answer}
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

MultipleChoiceCard.propTypes = {
    question: PropTypes.string.isRequired,
    desc: PropTypes.string,
    answer: PropTypes.array,
    mode: PropTypes.number
};


MultipleChoiceCard.defaultProps = {
    question: "Wie traversiere ich durch eien Baum?",
    answer: ["Mit toString", "Mit Bananen", "Mit Getter/Setter", "durch Rekursion", "Pre/Post/In Order"],
    mode: 2
};

export default MultipleChoiceCard;

