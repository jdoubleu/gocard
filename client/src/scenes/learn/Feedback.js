import React from "react";
import {Button, Card, Col, Form, Input,CardText, CardTitle, FormGroup, Row, Label} from "reactstrap";
import CardList from "../../components/cards/cardList";

class Feedback extends React.Component {
    render() {
        return (
            <Col sm="12" md={{size :8, offset:2}}>
                <Card>
                    <CardTitle>Feedback</CardTitle>
                        <CardList/>
                    </Card>
            </Col>
        );
    }
}


export default Feedback;
