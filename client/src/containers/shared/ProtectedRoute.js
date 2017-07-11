import React from "react";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import InitialDialog from "../../containers/account/InitialDialog";

const ProtectedRoute = ({component: Component, isAuthenticated, ...rest, userStatus}) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (
            userStatus === "verified" ? (
                <InitialDialog {...props}/>
            ) : (
                <Component {...props}/>
            )
        ) : (
            <Redirect to={{
                pathname: '/',
                state: {from: props.location}
            }}/>
        )
    )}/>
);

ProtectedRoute.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userStatus: state.auth.user.status
    }
}

export default connect(mapStateToProps)(ProtectedRoute);