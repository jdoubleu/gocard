import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Dashboard from "../scenes/Dashboard";
import Login from "./account/Login";
import {Route} from "react-router-dom";
import ProtectedRoute from "./shared/ProtectedRoute";


const Home = ({isAuthenticated}) => {
    return isAuthenticated ? (
        <ProtectedRoute component={Dashboard} />
    ) : (
        <Route component={Login} />
    )
};

Home.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(Home);

