import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {logoutUser} from '../actions/auth'
import TopBarComponent from "../components/shared/topBar";

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
        const {dispatch, isAuthenticated, displayName} = this.props;
        return (
            <TopBarComponent
                isAuthenticated={isAuthenticated}
                displayName={displayName}
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
    displayName: PropTypes.string
};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        displayName: state.user.displayName
    }
}

export default connect(mapStateToProps)(TopBar);
