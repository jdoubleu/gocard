import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import {UncontrolledTooltip} from "reactstrap";
import UserIcon from "../../shared/user/icon";
import Icon from "../../shared/icon";

const Bar = ({members, diameter, maxIcons}) => {
    const visibleMembers = _.chunk(members, maxIcons - 1)[0];
    const collapsedMembers = _.chunk(members, maxIcons - 1)[1];
    return (
        <span>
            {
                visibleMembers && collapsedMembers.length > 0 &&
                visibleMembers.map((member) =>
                    <span>
                        <UserIcon diameter={diameter} id={"ID" + member.uid}>
                            {member.displayName}
                        </UserIcon>
                        <UncontrolledTooltip placement="bottom" target={"ID" + member.uid} delay={0}>
                            {member.displayName}
                        </UncontrolledTooltip>
                    </span>
                )
            }
            {
                collapsedMembers && collapsedMembers.length > 0 &&
                <span>
                    <Icon diameter={diameter} id="additionalMembers">
                        {"+" + collapsedMembers.length}
                    </Icon>
                    <UncontrolledTooltip placement="bottom" target="additionalMembers" delay={0}>
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
};

Bar.propTypes = {
    diameter: PropTypes.number,
    members: PropTypes.object.isRequired,
    maxIcons: PropTypes.number
};

Bar.defaultProps = {
    maxIcons: 5,
    diameter: 40
};

export default Bar;
