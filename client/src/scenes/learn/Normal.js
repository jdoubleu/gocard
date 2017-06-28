import React from "react";
import dummy from "../../dummyCards.json";
import Single from "../../components/cards/SingleChoiceCard";
import Multiple from "../../components/cards/MultipleChoiceCard";
import Self from "../../components/cards/SelfValidateCard";
import Input from "../../components/cards/TextInputCard";

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

    displayLearningCard(i) {
        let index= i;
        index++;
        if(index< this.state.allcards.length){
            return (
                <div>
                <Input question={this.state.allcards[index].question} answer={this.state.allcards[index].answer}
                       mode={this.mode}/>
                    
                </div>
            )

        }
    }

    render() {
        return (
            <div>
                {this.displayLearningCard(-1)}
            </div>
        );
    }
}

export default Normal;
