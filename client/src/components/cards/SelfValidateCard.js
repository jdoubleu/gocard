import React from "react";
import PropTypes from "prop-types";
import {Button, Card, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";


class SelfValidateCard extends React.Component {
    render() {
        return (
          <Col sm="12" md={{size: 8, offset: 2}}>


              <Card block>
                  <Form onSubmit={this.handleSubmit}>

                      <h3>{this.props.question}</h3>
                      <em>{this.props.descSingleChoice}</em>

                      <Row>
                          <Col>
                              <Button outline color="primary">Prüfen</Button>
                          </Col>
                      </Row>
                  </Form>
              </Card>
          </Col>

        );
    }
}

SelfValidateCard.propTypes = {
    question: PropTypes.string.isRequired,
    desc: PropTypes.string
};


SelfValidateCard.defaultProps = {
    question: 'Wie traversiert man über einen Baum?',
    descSingleChoice: 'Selbstkontrollfrage: Versuche zunächst die Frage selbstständig zu beantworten, erst dann schaue dir die Musterlösung an und bewerte deine Antwort mit richtig oder falsch.',
};

export default SelfValidateCard;
