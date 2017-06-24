import React from "react";
import PropTypes from "prop-types";
import {Button, Card, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";


class SingleChoiceCard extends React.Component {
    render() {
        return (
          <Col sm="12" md={{size: 8, offset: 2}}>


              <Card block>
                  <Form onSubmit={this.handleSubmit}>

                      <h3>{this.props.question}</h3>
                      <em>{this.props.desc}</em>

                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="radio1" />{' '}
                          {this.props.answerList}
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="radio1" />{' '}
                          {this.props.answerList}
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="radio1" />{' '}
                          {this.props.answerList}
                        </Label>
                      </FormGroup>

                      <Row>
                          <Col>
                              <Button outline color="primary">nächste Karte</Button>
                          </Col>
                      </Row>
                  </Form>
              </Card>
          </Col>

        );
    }
}

SingleChoiceCard.propTypes = {
    question: PropTypes.string.isRequired,
    desc: PropTypes.string
};


SingleChoiceCard.defaultProps = {
    question: 'Wie traversiert man über einen Baum?',
    desc: 'SingleChoice Frage: Bitte kreuze nur eine Antwort an!',
    answerList: 'Antwort1'
};

export default SingleChoiceCard;
