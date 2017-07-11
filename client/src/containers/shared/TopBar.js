import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {logoutUser} from "../../actions/auth";
import {getUserById} from "../../actions/user";

import TopBarComponent from "../../components/shared/topBar/index";

class TopBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropDownTopBar: false,
            dropDownUser: false
        };

        this.onToggleTopBarDropDown = this.onToggleTopBarDropDown.bind(this);
        this.onToggleUserDropDown = this.onToggleUserDropDown.bind(this);
    }

    componentDidMount() {
        if (this.props.isAuthenticated)
            this.props.dispatch(getUserById(this.props.userId))
    }

    onToggleTopBarDropDown() {
        this.setState({
            dropDownTopBar: !this.state.dropDownTopBar
        });
    }

    onToggleUserDropDown() {
        this.setState({
            dropDownUser: !this.state.dropDownUser
        });
    }

    render() {
        const {dispatch, isAuthenticated, user} = this.props;
        return (
            <TopBarComponent
                isAuthenticated={isAuthenticated}
                user={user}
                dropDownTopBar={this.state.dropDownTopBar}
                onToggleTopBarDropDown={this.onToggleTopBarDropDown}
                dropDownUser={this.state.dropDownUser}
                onToggleUserDropDown={this.onToggleUserDropDown}
                onLogout={() => dispatch(logoutUser())}
                onNavbarBrandClick={() => dispatch(push("/"))}
            />
        )
    }
}

TopBar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object
};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userId: state.auth.userId,
        user: state.user.items[state.auth.userId] || {}
    }
}

export default connect(mapStateToProps)(TopBar);
