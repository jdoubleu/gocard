import React from "react";
import dummy from "../../dummyCards.json";
import Single from "../../components/cards/SingleChoiceCard";
import Multiple from "../../components/cards/MultipleChoiceCard";
import Self from "../../components/cards/SelfValidateCard";
import InputText from "../../components/cards/TextInputCard";
import {Button, Card, Col, Form, Input,CardText, CardTitle, FormGroup, Row, Label} from "reactstrap";
import Feedback from "./Feedback";
import lodash from "lodash";
class Normal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notAnsweredCards: [],
            answerCards:[],
            allcards: dummy,
            next: false,
            mode: 0
        }
        this.mode = 1;
        this.index=0;
        this.notAnsweredLength;
        this.answeredLength;
        this.round = false;
        this.counter= 0;
        this.array = [];
        this.displayLearningCard = this.displayLearningCard.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.notAnswered = this.notAnswered.bind(this);
        this.displayNotAnswered = this.displayNotAnswered.bind(this);
        this.answered = this.answered.bind(this);
    }
    notAnswered(){
        if(this.round=== false) {
            if (this.state.allcards[this.index].userAnswer === null) {
                let isInside = false;
                this.state.notAnsweredCards.forEach(a => {
                    if (a.id === this.state.allcards[this.index].id) {
                        isInside = true;
                    }
                })
                if (isInside === false) {

                    this.setState({
                        notAnsweredCards: this.state.notAnsweredCards.concat(this.state.allcards[this.index])
                    })
                }
            }

        }else{
            if (this.state.allcards[this.counter].userAnswer === null) {
                let isInside = false;
                this.state.notAnsweredCards.forEach(a => {
                    if (a.id === this.state.allcards[this.counter].id) {
                        isInside = true;
                    }
                })
                if (isInside === false) {

                    this.setState({
                        notAnsweredCards: this.state.notAnsweredCards.concat(this.state.allcards[this.counter])
                    })
                }
            }
        }
        this.notAnsweredLength = this.state.notAnsweredCards.length;



    }

    answered(){
        if(this.round=== false) {
            if (this.state.allcards[this.index].userAnswer !== null) {

                let isInside = false;
                this.state.answerCards.forEach(a => {
                    if (a.id === this.state.allcards[this.index].id) {
                        isInside = true;
                    }
                })
                if (isInside === false) {

                    this.setState({
                        answerCards: this.state.answerCards.concat(this.state.allcards[this.index])
                    })
                }
            }

        }else{
            if (this.state.notAnsweredCards[this.counter].userAnswer !== null) {

                let isInside = false;
                this.state.answerCards.forEach(a => {
                    if (a.id === this.state.notAnsweredCards[this.counter].id) {
                        isInside = true;
                    }
                })
                if (isInside === false) {

                    this.setState({
                        answerCards: this.state.answerCards.concat(this.state.notAnsweredCards[this.counter])
                    })
                }
            }
        }
        this.answeredLength = this.state.answerCards.length;


    }
    onRadioBtnClick(mode) {
        this.setState({mode});
        this.answered();
        this.notAnswered();
        this.index++;
        if(this.round === true){
            this.counter++;
            this.index = this.counter;
        }
    }

    displayNotAnswered(){

        if(this.round === true) {

            if (this.counter < this.state.notAnsweredCards.length) {
                console.log(this.counter);
                return (
                    <div>
                        <InputText question={this.state.notAnsweredCards[this.counter].question}
                                   answer={this.state.notAnsweredCards[this.counter].answer}
                                   mode={this.mode}/>

                    </div>
                )
            }else{
                this.counter = 0;
                return(
                <div>
                    <InputText question={this.state.notAnsweredCards[this.counter].question}
                               answer={this.state.notAnsweredCards[this.counter].answer}
                               mode={this.mode}/>

                </div>)
            }
        }
    }



    displayLearningCard() {


        if(this.index< this.state.allcards.length && this.round === false){
            if(this.state.mode === 1){

                return (
                    <div>
                        <InputText question={this.state.allcards[this.index].question} answer={this.state.allcards[this.index].answer}
                                   mode={this.mode}/>

                    </div>
                )
            }else {

                return (
                    <div>
                        <InputText question={this.state.allcards[this.index].question}
                                   answer={this.state.allcards[this.index].answer}
                                   mode={this.mode}/>


                    </div>
                )
            }
        }else if(this.state.answerCards.length !== this.state.allcards.length){
            this.round =true;

            return(
                <div>
                    {this.displayNotAnswered()}
                    </div>
            )
        }else{
            return(
                <Feedback/>
            )
        }
    }

    render() {
        return (
            <div>
                {this.displayLearningCard()}

                    <Col sm="12" md={{size: 8, offset: 2}}>
                        <Row>
                            <Col>
                                <Button block outline onClick={() => this.onRadioBtnClick(1)}
                                        active={this.state.mode === 1}
                                        color="danger">Abbrechen</Button>
                            </Col>
                            <Col>
                                <Button block outline onClick={() => this.onRadioBtnClick(1)}
                                        active={this.state.mode === 1}
                                        color="info">weiter</Button>
                            </Col>
                        </Row>
                    </Col>
            </div>

        );
    }
}

export default Normal;
