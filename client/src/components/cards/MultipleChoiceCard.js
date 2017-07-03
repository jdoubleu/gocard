import React from "react";
import PropTypes from "prop-types";
import {Button, Card, Col, FormGroup, Input, Row, CardText, CardTitle} from "reactstrap";
import lodash from "lodash";


class MultipleChoiceCard extends React.Component {
    constructor(props) {
        super(props);
        this.getRightAnswers = this.getRightAnswers.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.showAnswers = this.showAnswers.bind(this);
        this.button = this.button.bind(this);
        this.correct = this.correct.bind(this);
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
        return this.props.right;
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

    correct(answer){
        let correct = false;
        this.getRightAnswers().forEach(a=>{
            if(a === answer){
                correct = true
            }
        })
        if(correct === true){
            return(
                <Col className="correct-answer">
                    <CardText>{answer}</CardText>
                </Col>
            )
        }else{
            return(
                <Col className="wrong-answer">
                    <CardText>{answer}</CardText>
                </Col>
            )
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
                        {this.correct(answer)}
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
                    <p>Multiple Choice Frage: Bitte alle richtigen Antworten ankreuzen!</p>
                    <FormGroup>
                        {this.showAnswers()}
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

