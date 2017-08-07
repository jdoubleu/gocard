import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import UserIcon from "../../shared/user/icon";
import Icon from "../../shared/icon";
import {UncontrolledTooltip} from "reactstrap";
import {loadMembersByRegister} from "../../../actions/member";
import {makeGetUsersByRegister} from "../../../selectors";

class Bar extends React.Component {

    componentDidMount() {
        const {dispatch, registerId} = this.props;
        dispatch(loadMembersByRegister(registerId));
    }

    render() {
        const {members, diameter, maxIcons, registerId} = this.props;
        const chuckedMembers = _.chunk(members, maxIcons - 1);
        const visibleMembers = chuckedMembers[0] || [];
        const collapsedMembers = chuckedMembers[1] || [];
        return (
            <span>
                {
                    visibleMembers && visibleMembers.length > 0 &&
                    visibleMembers.map((member) =>
                        <span key={member.id}>
                            <UserIcon diameter={diameter} id={`${registerId}-${member.id}`}>
                                {member.displayName}
                            </UserIcon>
                            <UncontrolledTooltip placement="bottom" target={`${registerId}-${member.id}`}>
                                {member.displayName}
                            </UncontrolledTooltip>
                        </span>

                    )
                }
                {
                    collapsedMembers && collapsedMembers.length > 0 &&
                    <span>
                        <Icon diameter={diameter} id={`${registerId}-collapsed`}>
                            {"+" + collapsedMembers.length}
                        </Icon>
                        <UncontrolledTooltip placement="bottom" target={`${registerId}-collapsed`}>
                            {
                                collapsedMembers.map((member) =>
                                    <span>{member.displayName}<br/></span>
                                )
                            }
                        </UncontrolledTooltip>
                    </span>
                }
            </span>
        );
    }
}

Bar.propTypes = {
    registerId: PropTypes.number.isRequired,
    diameter: PropTypes.number.isRequired,
    maxIcons: PropTypes.number.isRequired
};

Bar.defaultProps = {
    diameter: 36,
    maxIcons: 5
};

const makeMapStateToProps = () => {
    const getUsersByRegister = makeGetUsersByRegister();
    return (state, props) => {
        return {
            members: getUsersByRegister(state, props) || []
        }
    }
};

export default connect(makeMapStateToProps)(Bar);
