import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import DashboardComponent from "../components/dashboard";
import {getRegisters} from "../actions/registers";

class Dashboard extends React.Component {
    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(getRegisters())
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
    registers: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        registers: state.registers.registers || []
    }
}

export default connect(mapStateToProps)(Dashboard);