import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginUser} from "../actions/auth";
import LoginComponent from "../components/account/login";

class Login extends React.Component {

    render() {
        const {dispatch, isLocalLoginFetching, errorMessage} = this.props;
        return (
            <LoginComponent
                onLocalLoginClick={ creds => dispatch(loginUser(creds))}
                isLocalLoginFetching={isLocalLoginFetching}
            />
        )
    }
}

Login.propTypes = {
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

export default connect(mapStateToProps)(Login)
