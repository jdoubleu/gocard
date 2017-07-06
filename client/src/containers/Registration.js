import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import RegistrationComponent from "../components/account/registration";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validPassword: false,
            validEmail: false,
            password: '',
            passwordRepeat: '',
            validForm: false
        };

        this.validateEmail = this.validateEmail.bind(this);
        this.handleSumbit = this.handleSumbit.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updatePasswordRepeat = this.updatePasswordRepeat.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    validateEmail(event) {
        let email = event.target.value.trim();
        this.setState({validEmail: email.includes("@")});
    }

    handleSumbit(event) {
        if(this.state.validEmail && this.state.validPassword) {
            //dispatch(RegisterUser())
        }
    }

    updatePassword(event) {
        this.setState({
            password: event.target.value.trim()
        }, this.validatePassword);
    }

    updatePasswordRepeat(event) {
        this.setState({
            passwordRepeat: event.target.value.trim()
        }, this.validatePassword);
    }

    validatePassword() {
        if(this.state.password !== '' && this.state.passwordRepeat !== '') {
            this.setState({
                validPassword: this.state.password === this.state.passwordRepeat
            });
        }
    }

    render() {
        return (
            <RegistrationComponent validateEmail={this.validateEmail} handleSubmit={this.handleSubmit}
                                   updatePassword={this.updatePassword} updatePasswordRepeat={this.updatePasswordRepeat} isRegistrationFetching={false}
                                   validEmail={this.state.validEmail} validPassword={this.state.validPassword} />
        )
    }
}

Registration.propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    isLocalLoginFetching: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage,
        isLocalLoginFetching: state.auth.isFetching
    }
}

export default connect(mapStateToProps)(Registration)

