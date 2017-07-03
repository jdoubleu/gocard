import React from "react";
import PropTypes from "prop-types";
import {Button, Card, Col, Form, Input,CardText, CardTitle, FormGroup, Row} from "reactstrap";


class SelfValidateCard extends React.Component {
    constructor(props){
        super(props);
        this.button = this.button.bind(this);
        this.display = this.display.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                      <CardText>Selbstkontrollfrage: Versuche zunächst die Frage selbstständig zu beantworten, erst dann schaue dir die Musterlösung an und bewerte deine Antwort mit richtig oder falsch.</CardText>
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


SelfValidateCard.defaultProps = {

};

export default SelfValidateCard;
