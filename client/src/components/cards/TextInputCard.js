import React from "react";
import PropTypes from "prop-types";
import {Button, Card, Col, Form, Input,CardText, CardTitle, FormGroup, Row, Label} from "reactstrap";


class SelfValidateCard extends React.Component {
    constructor(props){
        super(props);
        this.button = this.button.bind(this);
        this.display = this.display.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = this.input.bind(this);
        this.validate = this.validate.bind(this);
        this.displaySkipCancel = this.displaySkipCancel.bind(this);
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

    button(){
        if (this.state.show == false) {
            return (<Button block outline color="primary" onClick={() => this.handleSubmit()}>Prüfen</Button>)
        } else {
            return (<br/>)
        }
    }

    display(){
        if(this.state.show === true) {
            if (this.props.mode <= 2) {
                if (this.state.answer === true) {
                    return (
                        <CardText>Deine Antwort ist richtig</CardText>
                    )
                } else {
                    return (
                        <div>
                            <CardText>Deine Antwort war falsch</CardText>
                            <CardText>{this.props.answer}</CardText>
                        </div>
                    )
                }

            }
        }
    }

    validate(event){


        if(event.target.value === this.props.answer){
            this.setState({
                answer : true
            })
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

    input(){
        if(this.state.show ===false){
            return(<div>
                <Label for="antwort"></Label>
                <Input type="textarea" name="antwort" onBlur={this.validate}></Input>
            </div>)
        }else if(this.state.show === true){
            return(<div>
                <Label for="antwort"></Label>
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
                        <p>Texteingabe: Bitte gebe den genauen Antworttext ein</p>
                        <FormGroup>
                            {this.input()}
                            </FormGroup>
                        <FormGroup>
                            {this.display()}
                        </FormGroup>
                        {this.button()}
                    </Form>
                </Card>
                <br/>
                {this.displaySkipCancel()}
            </Col>

        );
    }
}

SelfValidateCard.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string,
    mode: PropTypes.number
};


SelfValidateCard.defaultProps = {
    question: 'Wie traversiert man über einen Baum?',
    answer: 'mit toString',
    mode: 2
};

export default SelfValidateCard;

