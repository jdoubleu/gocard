import React from "react";
import "../register/Detail.css";
import Header from "../../components/shared/header";
import {
    Button,
    ButtonGroup,
    Card,
    CardDeck,
    CardGroup,
    CardText,
    CardTitle,
    Col,
    Form,
    FormGroup,
    Label,
    Row
} from "reactstrap";
import StatisticBar from "../../components/shared/statisticBar";
import PreviewCardFeedback from "../../components/cards/previewCardFeedback";

import TagViewer from "../../components/registers/tagViewer";

import PropTypes from "prop-types";
import Cards from "../../dummyCards.json";

class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 1,
            cards: Cards
        };
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    onRadioBtnClick(mode) {
        this.setState({mode});
    }

    render() {
        return (
            <div>
                <Header
                    title="Feedback"
                />

                <CardGroup>
                    <Card block>
                        <CardTitle>{this.props.register}</CardTitle>
                        <CardText>Beschreibung</CardText>
                        <CardTitle>Verwendete Tags</CardTitle>
                        <Form>
                            <FormGroup>
                                {this.props.tags.map((tag) => <CardText>{tag}</CardText>)}
                            </FormGroup>

                        </Form>

                    </Card>
                    <Card block className="border-top-primary">
                        <CardTitle>Alte Statistik</CardTitle>
                        <CardText>
                            <StatisticBar />
                        </CardText>
                    </Card>
                    <Card block>
                        <CardTitle>Neue Statistik</CardTitle>
                        <CardText>
                            <StatisticBar />
                        </CardText>
                    </Card>
                </CardGroup>
                <Row className="mt-4 ml-3">
                    <Col>
                        <h4>Alle abgefragten Karteikarten</h4>
                    </Col>
                </Row>
                <CardDeck>
                    {this.state.cards.map((card)=> <PreviewCardFeedback question={card.question} answer={card.userAnswer} right={card.answer} check={card.status}/>)}
                </CardDeck>


            </div>
        );
    }

}
Feedback.propTypes={
    register: PropTypes.string,
    tags: PropTypes.array
}

Feedback.defaultProps={
    register: "Feedback OOP 1",
    tags: ["Bibbers", "Unendlich/Unendlich", "Fabian Zippi Zipproth", "Joshua leise", "Wirtschaftsexperte"]

}

export default Feedback;

