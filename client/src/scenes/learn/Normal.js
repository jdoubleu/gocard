import React from "react";
import dummy from "../../dummyCards.json";
import single from "../../components/cards/SingleChoiceCard";
import multiple from "../../components/cards/MultipleChoiceCard";
import self from "../../components/cards/SelfValidateCard";
import input from "../../components/cards/TextInputCard";

class Normal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answeredCards: [],
            allcards: dummy
        }
        this.mode = 1;
        this.allcardsLength = this.state.allcards.length;
        this.displayLearningCard = this.displayLearningCard.bind(this);

    }

    displayLearningCard() {
        this.state.allcards.forEach(a => {
            switch (a.type) {
                case 1:
                    return (
                        <single question={a.question} answer={a.answer} mode={this.mode}/>
                    )
                    break;
                case 2:
                    return (
                        <multiple question={a.question} answer={a.answer} mode={this.mode}/>
                    )
                    break;
                case 3:
                    return (
                        <self question={a.question} answer={a.answer} mode={this.mode}/>
                    )
                    break;
                case 4:
                    return (
                        <input question={a.question} answer={a.answer} mode={this.mode}/>
                    )
                    break;
            }
        })
    }

    render() {
        return (
            <div>
                {this.displayLearningCard()}
            </div>
        );
    }
}

export default Normal;
