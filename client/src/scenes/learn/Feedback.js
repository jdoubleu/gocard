import React from "react";
import "../register/Detail.css";
import Headline from "../../components/shared/headline";
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
    Row
} from "reactstrap";
import StatisticBar from "../../modules/shared/statisticBar";
import PreviewCardFeedback from "../../modules/cards/previewCardFeedback";
import PropTypes from "prop-types";
import Cards from "../../modules/dummyCards.json";

class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 1,
            cards: Cards,
            check: null
        };
        this.displayCards = this.displayCards.bind(this);
        this.getAllRight = this.getAllRight.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.getAllWrong = this.getAllWrong.bind(this);
        this.getAll = this.getAll.bind(this);
        this.check = this.check.bind(this);
        this.getAllNotAnswered = this.getAllNotAnswered.bind(this);
    }

    onRadioBtnClick(mode) {

        this.setState({mode});

    }

    displayCards() {
        if (this.state.mode === 1) {
            return (
                this.getAll()
            )
        } else if (this.state.mode === 2) {
            return (
                this.getAllRight()
            )
        } else if (this.state.mode === 3) {
            return (
                this.getAllWrong()
            )
        } else if( this.state.mode ===4){
            return (
                this.getAllNotAnswered()
            )
        }
    }

    getAll(){
        return this.state.cards.map((card) => <PreviewCardFeedback question={card.question} answer={card.userAnswer}
                                                        right={card.rightAnswer} check={this.check(card.rightAnswer, card.userAnswer)}/>)
    }

    check(right, user){
        if(right === user){
            return true;
        }else if(user === null){
            return null;
        }else if(right != user & user!= null){
            return false;
        }

    }

    getAllRight() {
        let array = [];
        array = this.state.cards.filter(a => {

            return a.userAnswer === a.rightAnswer;
        })
        console.log(array);
        return array.map((card) => <PreviewCardFeedback question={card.question} answer={card.userAnswer}
                                                        right={card.rightAnswer} check={true}/>)
    }

    getAllNotAnswered() {
        let array = [];
        array = this.state.cards.filter(a => {

            return a.userAnswer === null;
        })
        console.log(array);
        return array.map((card) => <PreviewCardFeedback question={card.question} answer={card.userAnswer}
                                                        right={card.rightAnswer} check={null}/>)
    }

    getAllWrong() {
        let array = [];
        array = this.state.cards.filter(a => {

            return a.userAnswer != a.rightAnswer &&  a.userAnswer!= null;
        })
        console.log(array);
        return array.map((card) => <PreviewCardFeedback question={card.question} answer={card.userAnswer}
                                                        right={card.rightAnswer} check={false}/>)
    }

    render() {
        return (
            <div>
                <Headline title="Feedback"></Headline>

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

                    <Card block>
                        <CardTitle>Alte Statistik</CardTitle>
                        <Row >
                            <Col xs="8">
                                <StatisticBar/>
                            </Col>
                        </Row>
                        <CardTitle>Neue Statistik</CardTitle>
                        <Row >
                            <Col xs="8">
                                <StatisticBar/>
                            </Col>
                        </Row>
                    </Card>
                </CardGroup>
                <Row className="mt-4 ml-3">

                    <FormGroup>

                        <ButtonGroup check>
                            <Button outline onClick={() => this.onRadioBtnClick(1)}
                                    active={this.state.mode === 1}
                                    color={this.state.mode === 1 ? 'primary' : 'secondary'}>Alle</Button>
                            <Button outline onClick={() => this.onRadioBtnClick(2)}
                                    active={this.state.mode === 2}
                                    color={this.state.mode === 2 ? 'primary' : 'secondary'}>Richtige</Button>
                            <Button outline onClick={() => this.onRadioBtnClick(3)}
                                    active={this.state.mode === 3}
                                    color={this.state.mode === 3 ? 'primary' : 'secondary'}>Falsche</Button>
                            <Button outline onClick={() => this.onRadioBtnClick(4)}
                                    active={this.state.mode === 4}
                                    color={this.state.mode === 4 ? 'primary' : 'secondary'}>Keine Antwort</Button>
                        </ButtonGroup>
                    </FormGroup>

                </Row>
                <CardDeck>
                    {this.displayCards()}
                </CardDeck>


            </div>
        );
    }

}
Feedback.propTypes = {
    register: PropTypes.string,
    tags: PropTypes.array
}

Feedback.defaultProps = {
    register: "Feedback OOP 1",
    tags: ["Bibbers", "Unendlich/Unendlich", "Fabian Zippi Zipproth", "Joshua leise", "Wirtschaftsexperte"]

}

export default Feedback;
