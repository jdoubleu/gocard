import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import DashboardComponent from "../components/dashboard";
import {loadRegisters} from "../actions/register";
import _ from "lodash";

class Dashboard extends React.Component {
    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(loadRegisters())
    }


    render() {
        const {registers} = this.props;
        return (
            <DashboardComponent registers={registers}/>
        )
    }
}

Dashboard.propTypes = {
    dispatch: PropTypes.func.isRequired,
    register: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        registers: _.values(state.register.items)
    }
}

export default connect(mapStateToProps)(Dashboard);