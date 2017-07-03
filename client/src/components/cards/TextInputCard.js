import React from "react";
import PropTypes from "prop-types";
import "./correct-answer.css";
import {Button, Card, Col, Form, Input, CardText, CardTitle, FormGroup, Row  } from "reactstrap";
import dummy from "../../dummyCards.json";


class SelfValidateCard extends React.Component {
    constructor(props) {
        super(props);
        this.button = this.button.bind(this);
        this.display = this.display.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = this.input.bind(this);
        this.validate = this.validate.bind(this);

        this.state = {
            show: false,
            answer: false
        }
    }

    handleSubmit() {

        this.setState({
            show: true
        })

    }

    button() {
        if (this.state.show == false) {

            return (<Row>
                    <Col>
                        <Button block outline color="primary" onClick={() => this.handleSubmit()}>Prüfen</Button>
                    </Col>
                    <Col>
                        <Button block outline color="primary" onClick={() => this.handleSubmit()}>Weiss ich
                            nicht</Button>
                    </Col>
                </Row>

            )
        } else {
            return (<br/>)
        }
    }

    display() {
        if (this.state.show === true) {
            if (this.props.mode <= 2) {
                if (this.state.answer === true) {
                    return (
                        <CardText>Deine Antwort ist richtig!</CardText>
                    )
                } else {
                    return (
                        <div>
                            <CardText>Deine Antwort war falsch</CardText>
                            <CardText>Die richtige Antwort lautet:</CardText>
                            <CardText><em><b>{this.props.answer}</b></em></CardText>
                        </div>
                    )
                }

            }
        }
    }

    validate(event) {


        if (event.target.value === this.props.answer) {
            this.setState({
                answer: true
            })
            ;

        }

    }


    input() {
        if (this.state.show === false) {
            return (<div>
                <Input type="textarea" name="antwort" onBlur={this.validate}
                       placeholder="Bitte gebe hier deine Antwort ein"></Input>
            </div>)
        } else if (this.state.show === true) {
            return (<div>
                <Input type="textarea" name="antwort" disabled></Input>
            </div>)
        }
    }

    render() {
        return (
            <Col sm="12" md={{size: 8, offset: 2}}>


                <Card block>
                    <Form onSubmit={this.handleSubmit}>

                        <CardTitle>{this.props.question}</CardTitle>
                        <CardText>Texteingabe: Bitte gebe den genauen Antworttext ein</CardText>
                        <FormGroup>
                            {this.input()}
                        </FormGroup>
                        <FormGroup>
                            {this.display()}
                        </FormGroup>
                        {this.button()}
                    </Form>
                </Card>


            </Col>

        );
    }
}

SelfValidateCard.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    mode: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,

};


SelfValidateCard.defaultProps = {};

export default SelfValidateCard;

