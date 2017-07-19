import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import UserIcon from "../../../components/shared/user/icon";
import Icon from "../../../components/shared/icon";
import {UncontrolledTooltip} from "reactstrap";
import _ from "lodash";
import {loadMembersByRegister} from "../../../actions/member";

class Bar extends React.Component {

    componentWillMount() {
        const {dispatch, registerId} = this.props;
        dispatch(loadMembersByRegister(registerId));
    }

    render() {
        const {members, diameter, maxIcons, registerId} = this.props;
        const visibleMembers = _.chunk(members, maxIcons - 1)[0];
        const collapsedMembers = _.chunk(members, maxIcons - 1)[1];
        return (
            <span>
                {
                    visibleMembers && collapsedMembers.length > 0 &&
                    visibleMembers.map((member) =>
                        <span>
                            <UserIcon diameter={diameter} id={registerId + member.id}>
                                {member.displayName}
                            </UserIcon>
                            <UncontrolledTooltip placement="bottom" target={"ID" + member.id}>
                                {member.displayName}
                            </UncontrolledTooltip>
                        </span>
                    )
                }
                {
                    collapsedMembers && collapsedMembers.length > 0 &&
                    <span>
                        <Icon diameter={diameter} id={registerId + '-collapsed'}>
                            {"+" + collapsedMembers.length}
                        </Icon>
                        <UncontrolledTooltip placement="bottom" target={registerId + '-collapsed'}>
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
    members: PropTypes.object.isRequired,
    diameter: PropTypes.number.isRequired,
    maxIcons: PropTypes.number.isRequired
};

Bar.defaultProps = {
    diameter: 36,
    maxIcons: 5
};

function mapStateToProps(state, ownProps) {
    return {
        members: state.entities.members.byId[ownProps.registerId] || {},
    }
}

export default connect(mapStateToProps)(Bar);
