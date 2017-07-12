import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import DetailComponent from "../../components/register/detail";
import {withRouter} from "react-router-dom";
import {loadCards} from "../../actions/cards";
import {loadMembers, getUserForRegister} from "../../actions/registers";
import _ from "lodash";

class Detail extends React.Component {
    render() {
        return (
            <DetailComponent cards={this.props.cards} mode={this.state.mode} users={this.props.memberNames} register={this.props.register} handleSubmit={this.handleSubmit} modeSelected={this.modeSelected}/>
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
            memberNames: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.modeSelected = this.modeSelected.bind(this);
        this.calculateMemberNames = this.calculateMemberNames.bind(this);
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
        mode: state.registers.selectedMode[ownProps.match.params.id]
    }
}

export default withRouter(connect(mapStateToProps)(Detail));
