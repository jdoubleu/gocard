import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import DetailComponent from "../../components/register/detail";
import {withRouter} from "react-router-dom";
import {loadCards} from "../../actions/card";
import {storeSelectedTags, loadMembers, getUserForRegister} from "../../actions/registers";
import _ from "lodash";

class Detail extends React.Component {
    render() {
        return (
            <DetailComponent cards={this.props.cards} mode={this.state.mode} users={this.props.memberNames}
                             register={this.props.register} handleSubmit={this.handleSubmit} modeSelected={this.modeSelected}
                             tags={["OOP2","Netze","Mathe3","Bibbers"]} selectedTags={this.state.selectedTags}
                             totalScore={this.state.totalScore} handleSelect={this.handleSelect}/>
        );
    }

    modeSelected(mode){
        this.setState({
            mode
        });
    }

    componentWillMount(){
        this.props.dispatch(loadMembers(this.props.match.params.id));
        this.props.dispatch(loadCards(this.props.match.params.id));
        this.calculateMemberNames();
    }

    constructor(props) {
        super(props);

        this.state = {
            mode: 1,
            description: "",
            register: {},
            memberNames: {},
            tags: this.calculatedTags(),
            selectedTags: this.calculatedSelectedTags(),
            totalScore: {good: 1, middle:0, bad:10}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.modeSelected = this.modeSelected.bind(this);
        this.calculateMemberNames = this.calculateMemberNames.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.calculatedTags = this.calculatedTags.bind(this);
        this.calculatedSelectedTags = this.calculatedSelectedTags.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    calculateMemberNames() {
        this.props.members.map((member) =>
            this.props.dispatch(getUserForRegister(member.userid, this.props.match.params.id))
        );

        this.setState({
            memberNames: _.map(this.state.register.users, 'displayName')
        });
    }

    handleSubmit(event) {
        event.preventDefault();

    }

    calculatedTags(){
        let tags = [];
        _.forEach(this.props.cards, function(card) {
            tags = _.concat(tags, card.tags)
        });
        tags = _.uniq(tags);
        if(tags === undefined){
            return [];
        } else {
            return tags;
        }
    }

    calculatedSelectedTags(){
        if(this.props.selectedTags !== undefined && this.props.selectedTags.length > 0 ){
            return this.props.selectedTags;
        } else {
            return this.calculatedTags().slice(0);
        }
    }

    handleSelect(tag) {
        let index = this.state.selectedTags.indexOf(tag);
        if (index < 0) {
            this.setState({
                selectedTags: this.state.selectedTags.concat(tag)
            }, function(){
                this.props.dispatch(storeSelectedTags(this.props.registerId, this.state.selectedTags));
            });
        } else {
            let selectedTags = this.state.selectedTags;
            _.pull(selectedTags, tag);
            this.setState({selectedTags}, function(){
                this.props.dispatch(storeSelectedTags(this.props.registerId, this.state.selectedTags));
            });
        }
    }


}

Detail.propTypes = {
    user: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        register: state.registers.registers[ownProps.match.params.id],
        members: state.users.members[ownProps.match.params.id],
        user: state.auth.user,
        users: state.users,
        cards: state.cards.cards[ownProps.match.params.id],
        mode: state.registers.selectedMode[ownProps.match.params.id],
        selectedTags: state.registers.selectedTags[ownProps.registerId]
    }
}

export default withRouter(connect(mapStateToProps)(Detail));
