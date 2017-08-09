import React from "react";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import InitialDialog from "../../containers/account/InitialDialog";

const ProtectedRoute = ({component: Component, isAuthenticated, user, ...rest}) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (
            user.status === "verified" ? (
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
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object
};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.entities.users.byId[state.auth.userId] || {}
    }
}

export default connect(mapStateToProps)(ProtectedRoute);