import React from "react";
import dummy from "../../modules/dummyCards.json";
import Single from "../../modules/cards/SingleChoiceCard";
import Multiple from "../../modules/cards/MultipleChoiceCard";
import Self from "../../modules/cards/SelfValidateCard";
import InputText from "../../modules/cards/TextInputCard";
import {Button, Col, Row } from "reactstrap";
import Feedback from "./Feedback";

import {Link} from "react-router-dom";
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
                if(this.state.allcards[this.counter].type === 1) {
                    return (
                        <div>
                            <Single question={this.state.allcards[this.counter].question}
                                    answer={this.state.allcards[this.counter].answer}
                                    mode={this.mode} right={this.state.allcards[this.counter].rightAnswer}/>

                        </div>
                    )
                }else if(this.state.allcards[this.counter].type === 2){
                    return (
                        <div>
                            <Multiple question={this.state.allcards[this.counter].question}
                                      answer={this.state.allcards[this.counter].answer}
                                      mode={this.mode} right={this.state.allcards[this.counter].rightAnswer}/>

                        </div>
                    )
                }else if(this.state.allcards[this.counter].type === 3){
                    return (
                        <div>
                            <Self question={this.state.allcards[this.counter].question}
                                  answer={this.state.allcards[this.counter].answer}
                                  mode={this.mode}/>

                        </div>
                    )
                }else if(this.state.allcards[this.counter].type === 4){
                    return (
                        <div>
                            <InputText question={this.state.allcards[this.counter].question}
                                       answer={this.state.allcards[this.counter].answer}
                                       mode={this.mode}/>

                        </div>
                    )
                }
            }else{
                this.counter = 0;
                if(this.state.allcards[this.counter].type === 1) {
                    return (
                        <div>
                            <Single question={this.state.allcards[this.counter].question}
                                    answer={this.state.allcards[this.counter].answer}
                                    mode={this.mode} right={this.state.allcards[this.counter].rightAnswer}/>

                        </div>
                    )
                }else if(this.state.allcards[this.counter].type === 2){
                    return (
                        <div>
                            <Multiple question={this.state.allcards[this.counter].question}
                                      answer={this.state.allcards[this.counter].answer}
                                      mode={this.mode} right={this.state.allcards[this.counter].rightAnswer}/>

                        </div>
                    )
                }else if(this.state.allcards[this.counter].type === 3){
                    return (
                        <div>
                            <Self question={this.state.allcards[this.counter].question}
                                  answer={this.state.allcards[this.counter].answer}
                                  mode={this.mode}/>

                        </div>
                    )
                }else if(this.state.allcards[this.counter].type === 4){
                    return (
                        <div>
                            <InputText question={this.state.allcards[this.counter].question}
                                       answer={this.state.allcards[this.counter].answer}
                                       mode={this.mode}/>

                        </div>
                    )
                }
            }
        }
    }



    displayLearningCard() {


        if(this.index< this.state.allcards.length && this.round === false){
            if(this.state.mode === 1){
                if(this.state.allcards[this.index].type === 1) {
                    return (
                        <div>
                            <Single question={this.state.allcards[this.index].question}
                                       answer={this.state.allcards[this.index].answer}
                                       mode={this.mode} right={this.state.allcards[this.index].rightAnswer}/>

                        </div>
                    )
                }else if(this.state.allcards[this.index].type === 2){
                    return (
                        <div>
                            <Multiple question={this.state.allcards[this.index].question}
                                       answer={this.state.allcards[this.index].answer}
                                       mode={this.mode} right={this.state.allcards[this.index].rightAnswer}/>

                        </div>
                    )
                }else if(this.state.allcards[this.index].type === 3){
                    return (
                        <div>
                            <Self question={this.state.allcards[this.index].question}
                                       answer={this.state.allcards[this.index].answer}
                                       mode={this.mode}/>

                        </div>
                    )
                }else if(this.state.allcards[this.index].type === 4){
                    return (
                        <div>
                            <InputText question={this.state.allcards[this.index].question}
                                       answer={this.state.allcards[this.index].answer}
                                       mode={this.mode}/>

                        </div>
                    )
                }
            }else {

                if(this.state.allcards[this.index].type === 1) {
                    return (
                        <div>
                            <Single question={this.state.allcards[this.index].question}
                                    answer={this.state.allcards[this.index].answer}
                                    mode={this.mode} right={this.state.allcards[this.index].rightAnswer}/>

                        </div>
                    )
                }else if(this.state.allcards[this.index].type === 2){
                    return (
                        <div>
                            <Multiple question={this.state.allcards[this.index].question}
                                      answer={this.state.allcards[this.index].answer}
                                      mode={this.mode} right={this.state.allcards[this.index].rightAnswer}/>

                        </div>
                    )
                }else if(this.state.allcards[this.index].type === 3){
                    return (
                        <div>
                            <Self question={this.state.allcards[this.index].question}
                                  answer={this.state.allcards[this.index].answer}
                                  mode={this.mode}/>

                        </div>
                    )
                }else if(this.state.allcards[this.index].type === 4){
                    return (
                        <div>
                            <InputText question={this.state.allcards[this.index].question}
                                       answer={this.state.allcards[this.index].answer}
                                       mode={this.mode}/>

                        </div>
                    )
                }
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
                                <Link to="/dashboard">
                                <Button block outline onClick={() => this.onRadioBtnClick(1)}
                                        active={this.state.mode === 1}
                                        color="danger">Abbrechen</Button>
                                    </Link>
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
