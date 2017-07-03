import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Dashboard from "../scenes/Dashboard";
import Login from "./Login";

const Home = ({isAuthenticated}) => {
    return isAuthenticated ? (
        <Dashboard/>
    ) : (
        <Login />
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

export default connect(mapStateToProps)(Home)

