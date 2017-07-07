import React from "react";
import PropTypes from "prop-types";
import {Card, CardText, CardTitle, Col, Label, Row} from "reactstrap";

class PreviewCardFeedback extends React.Component {
    constructor(props) {
        super(props);
        this.check = this.check.bind(this);
        this.displayRight = this.displayRight.bind(this);
    }

    check() {
        if (this.props.check === true) {
            return (
                <CardText className="display-3">✓</CardText>
            )
        } else if(this.props.check === false){
            return (
                <CardText className="display-3">X</CardText>
            )
        }else{
            return (
                <CardText className="display-3">-</CardText>
            )
        }
    }

    displayRight() {
        if (this.props.check === false || this.props.check === null) {
            return (<Row>
                <Col>
                    <Label for="richtig">Richtige Antwort:</Label>
                    <CardText id="richtig">{this.props.right}</CardText>
                </Col>
            </Row>)
        } else {
            return (
                <div></div>
            )
        }
    }

    render() {
        return (
            <Col xl="4" md="6" xs="12">
                <Card block className="mb-2">
                    <CardTitle>{this.props.question}</CardTitle>
                    {this.check()}
                    <Row>
                        <Col>
                            <Label for="deine">Deine Antwort:</Label>
                            <CardText id="deine">{this.props.answer}</CardText>
                        </Col>
                    </Row>
                    <br/>
                    {this.displayRight()}

                </Card>
            </Col>

        );
    }
}

PreviewCardFeedback.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    right: PropTypes.string.isRequired,
    check: PropTypes.bool.isRequired

};


export default PreviewCardFeedback;