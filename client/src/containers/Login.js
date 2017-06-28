import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginUser} from "../actions";
import LoginComponent from "../components/Login";

class Login extends React.Component {

    render() {
        const {dispatch, isAuthenticated, errorMessage} = this.props;
        return (
            <div>
                {isAuthenticated && <h1>NICE</h1>}
                {!isAuthenticated && <h1>NOT NICE</h1>}
                {errorMessage}
                <LoginComponent
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
    return {
        isAuthenticated: state.auth.isAuthenticated,
        errorMessage: state.auth.errorMessage
    }
}

export default connect(mapStateToProps)(Login)
