import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginUser} from "../actions/index";
import LoginComp from "../components/Login";

class Login extends React.Component {

    render() {
        const {dispatch, isAuthenticated, errorMessage} = this.props;
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
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
}

function mapStateToProps(state) {

    const {auth} = state;
    const {isAuthenticated, errorMessage} = auth;

    return {
        isAuthenticated,
        errorMessage
    }
}

export default connect(mapStateToProps)(Login)
