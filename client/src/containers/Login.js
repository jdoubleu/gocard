import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginUser} from "../actions";
import LoginComponent from "../components/account/login";

class Login extends React.Component {

    render() {
        const {dispatch, errorMessage} = this.props;
        return (
            <LoginComponent
                onLocalLoginClick={ creds => dispatch(loginUser(creds))}
            />
        )
    }
}

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage,
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(Login)
