import React from "react";
import {connect} from "react-redux";
import DetailComponent from "../../components/register/detail";
import {withRouter} from "react-router-dom";
import {loadCards} from "../../actions/card";
import {storeSelectedTags} from "../../actions/register";
import {loadMembers} from "../../actions/member";

class Detail extends React.Component {
    render() {
        const {cards, members, register} = this.props;
        return (
            <DetailComponent
                handleSubmit={this.handleSubmit}
                handleInputChange={this.handleInputChange}
                register={register}
                cards={cards}
                mode={this.state.mode}
                members={members}
                tags={["OOP2", "Netze", "Mathe3", "Bibbers"]}
                selectedTags={[]}
                modeSelected={this.modeSelected}
                totalScore={this.state.totalScore}
            />
        );
    }

    componentWillMount() {
        this.props.dispatch(loadMembers(this.props.match.params.id));
        this.props.dispatch(loadCards(this.props.match.params.id));
    }

    constructor(props) {
        super(props);

        this.state = {
            mode: 1,
            totalScore: {good: 1, middle: 0, bad: 10}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectTag = this.handleSelectTag.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    handleSelectTag(tag) {
    }
}

Detail.propTypes = {};

function mapStateToProps(state, ownProps) {
    const registerId = ownProps.match.params.id;
    return {
        register: state.entities.registers.byId[registerId]
    }
}

export default withRouter(connect(mapStateToProps)(Detail));
