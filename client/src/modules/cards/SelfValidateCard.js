import React from "react";
import PropTypes from "prop-types";
import {Button, Card, CardText, CardTitle, Col, Form, FormGroup, Row} from "reactstrap";


class SelfValidateCard extends React.Component {
    constructor(props) {
        super(props);
        this.button = this.button.bind(this);
        this.display = this.display.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.displayTrueFalse = this.displayTrueFalse.bind(this);
        this.state = {
            show: false,
            check: false
        }
    }

    displayTrueFalse() {
        console.log(this.state.check);
        if (this.state.check === true) {
            return (
                <Row>
                    <Col>
                        <Button outline block color="danger" onClick={() => this.handleSubmit()}>Falsch</Button>
                    </Col>
                    <Col>
                        <Button outline block color="primary" onClick={() => this.handleSubmit()}>Richtig</Button>
                    </Col>
                </Row>
            )
        }

    }

    handleSubmit(check) {

        this.setState({
            show: true,
            check: check
        })


    }

    button() {
        if (this.state.show === false) {
            return (<Row>
                <Col>
                    <Button block outline color="primary" onClick={() => this.handleSubmit(true)}>Prüfen</Button>
                </Col>
                <Col>
                    <Button block outline color="primary" onClick={() => this.handleSubmit(false)}>Weiss ich
                        nicht</Button>
                </Col>
            </Row>)
        } else {
            return (<br/>)
        }
    }


    display() {
        if (this.state.show === true) {
            return (
                <div>
                    <CardText>Bewerte jetzt deine Antwort!</CardText>
                    <CardText>Die Richtige Antwort lautet:</CardText>
                    <CardText> <em><b>{this.props.answer}</b></em></CardText>
                    {this.displayTrueFalse()}
                </div>
            )

        }
    }

    render() {
        return (
            <Col sm="12" md={{size: 8, offset: 2}}>


                <Card block>
                    <Form onSubmit={this.handleSubmit}>

                        <CardTitle>{this.props.question}</CardTitle>
                        <CardText>Selbstkontrollfrage: Beantworte die Frage für dich selbst.</CardText>
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
};


SelfValidateCard.defaultProps = {};

export default SelfValidateCard;
