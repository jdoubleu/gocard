import React from "react";
import dummy from "../../dummyCards.json";
import Single from "../../components/cards/SingleChoiceCard";
import Multiple from "../../components/cards/MultipleChoiceCard";
import Self from "../../components/cards/SelfValidateCard";
import InputText from "../../components/cards/TextInputCard";
import {Button, Col, Row } from "reactstrap";
import Feedback from "./Feedback";

import {Link} from "react-router-dom";
class Normal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allcards: dummy,
            next: false,
            mode: 0
        }
        this.mode = 1;
        this.index=0;
        this.displayLearningCard = this.displayLearningCard.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);


    }

    onRadioBtnClick(mode) {
        this.setState({mode});
        this.index++;

    }





    displayLearningCard() {

        if(this.index< this.state.allcards.length){
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
                    <br/>
                    <Col sm="12" md={{size: 8, offset: 2}}>
                        <Row>
                            <Col>
                                <Link to="/dashboard">
                                <Button block outline onClick={() => this.onRadioBtnClick(1)}
                                        active={this.state.mode === 0}
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
