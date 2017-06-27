import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { loginUser } from '../actions/loginActions';
import LoginComp from '../components/Login'


class Login extends React.Component {

    render() {
        const { dispatch, isAuthenticated, errorMessage } = this.props
        return (
            <div>
                <LoginComp
                    onLocalLoginClick={ creds => dispatch(loginUser(creds))}
                />
            </div>
        )
    }
}

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    quote: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    isSecretQuote: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    console.log(state);
    const { auth } = state
    const { isAuthenticated, errorMessage } = auth

    return {
        isAuthenticated,
        errorMessage
    }
}

export default connect(mapStateToProps)(Login)
