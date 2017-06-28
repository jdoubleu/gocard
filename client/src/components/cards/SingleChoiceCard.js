import React from "react";
import PropTypes from "prop-types";
import {Button, Card, Col, FormGroup, Input, Row, CardText, CardTitle} from "reactstrap";


class SingleChoiceCard extends React.Component {
    constructor(props) {
        super(props);
        this.display = this.display.bind(this);
        this.getRightAnswer = this.getRightAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.button = this.button.bind(this);
        this.showAnswers = this.showAnswers.bind(this);
        this.displaySkipCancel = this.displaySkipCancel.bind(this);
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
            if (this.props.mode <= 2) {
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
                            <CardText>Deine Antwort war falsch! Die richtige Antwort lautet: </CardText>
                            <CardText>{this.getRightAnswer()}</CardText>
                            <div className="text-right">
                                <Button outline color="primary">Weiter</Button>
                            </div>
                        </div>
                    )
                }
            }else {
                return(
                    <div className="text-right">
                        <Button outline color="primary">Weiter</Button>
                    </div>
                )
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

    displaySkipCancel(){
        if(this.state.show=== false) {
            return ( <Row>
                    <Col>
                        <Button outline block color="danger">Abbrechen</Button>
                    </Col>
                    <Col>
                        <Button outline block color="info">Überspringen</Button>
                    </Col>
                </Row>
            )
        }else{
            return(<Button outline block color="danger">Abbrechen</Button>)
        }
    }


    skipQuestion(){
        console.log('skip question view');
    }

    cancelMode(){
      console.log('cancel view');
      // Link to last register
    }

    render() {
        return (
          <Row>
            <Col sm="12" md={{size: 7, offset: 2}}>


                <Card block>

                    <CardTitle>{this.props.question}</CardTitle>
                    <p>Single Choice Frage: Bitte kreuze nur eine Antwort an!</p>
                    <FormGroup>
                        {this.showAnswers()}
                    </FormGroup>
                    <FormGroup>
                        {this.display()}
                    </FormGroup>
                    {this.button()}

                </Card>
                <br/>
                {this.displaySkipCancel()}
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

};


SingleChoiceCard.defaultProps = {
    question: "Wie traversiere ich durch einen Baum?",
    answer: ["Mit toString", "Mit Bananen", "Mit Getter/Setter"],
    mode: 3
};

export default SingleChoiceCard;
