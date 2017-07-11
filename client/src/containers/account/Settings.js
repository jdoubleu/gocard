import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteUser, updateUser} from "../../actions/user";
import SettingsComponent from "../../components/account/settings";

class Settings extends React.Component {
    render() {
        return (
            <SettingsComponent displayName={this.state.displayName} email={this.state.email}
                               password={this.state.password} confirmPassword={this.state.confirmPassword}
                               handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange}
                               modal={this.state.modal} modalToggle={this.modalToggle}
                               modalHandleSubmit={this.modalHandleSubmit} isFetching={this.props.isFetching}
            />
        );
    }

    constructor(props) {
        super(props);

        this.state = {
            displayName: props.user.displayName,
            email: props.user.email,
            password: '',
            confirmPassword: '',
            modal: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.modalToggle = this.modalToggle.bind(this);
        this.modalHandleSubmit = this.modalHandleSubmit.bind(this);
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

        this.props.dispatch(updateUser({
            "displayName": this.state.displayName,
            "email": this.state.email,
            "password": this.state.password,
        }))
    }

    modalToggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    modalHandleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(deleteUser());
    }
}

Settings.propTypes = {
    user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user.items[state.auth.userId] || {},
        isFetching: state.auth.isFetching
    }
}

export default connect(mapStateToProps)(Settings);
