import React from "react";
import PropTypes from "prop-types";
import {Button, Card, Col, Form, Input,CardText, CardTitle, FormGroup, Row} from "reactstrap";


class SelfValidateCard extends React.Component {
    constructor(props){
        super(props);
        this.button = this.button.bind(this);
        this.display = this.display.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.displaySkipCancel = this.displaySkipCancel.bind(this);
        this.state = {
            show: false
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

    display(){
        if(this.state.show === true){
            return(
                <div>
                    <CardText>{this.props.answer}</CardText>
                    <Row>
                        <Col>
                            <Button outline block color="danger">Falsch</Button>
                        </Col>
                        <Col>
                            <Button outline block color="primary">Richtig</Button>
                        </Col>
                    </Row>

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
                      <p>Selbstkontrollfrage: Versuche zunächst die Frage selbstständig zu beantworten, erst dann schaue dir die Musterlösung an und bewerte deine Antwort mit richtig oder falsch.</p>
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
    answer: PropTypes.string
};


SelfValidateCard.defaultProps = {
    question: 'Wie traversiert man über einen Baum?',
    answer: 'Über Rekursion und toString kann in Pre/Post/In Order funktionieren '
};

export default SelfValidateCard;
