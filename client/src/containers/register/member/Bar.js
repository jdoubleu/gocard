import React from "react";
import PropTypes from "prop-types";
import MemberBar from "../../../components/register/member/bar";
import {connect} from "react-redux";

const Bar = ({members, diameter, ...rest}) => {
    return (
        <MemberBar members={members} diameter={diameter} {...rest}/>
    );
};

Bar.propTypes = {
    registerId: PropTypes.number.isRequired,
    members: PropTypes.object.isRequired,
    diameter: PropTypes.number.isRequired
};

Bar.defaultProps = {
    diameter: 36
};

function mapStateToProps(state, ownProps) {
    return {
        members: state.entities.members.byId[ownProps.registerId] || {},
    }
}

export default connect(mapStateToProps)(Bar);
