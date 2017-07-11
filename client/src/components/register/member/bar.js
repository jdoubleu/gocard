import React from "react";
import lodash from "lodash";
import PropTypes from "prop-types";
import {UncontrolledTooltip} from "reactstrap";
import UserIcon from "../../shared/user/icon";
import Icon from "../../shared/icon";

const Bar = ({members, diameter, maxIcons}) => {
    const visibleMembers = lodash.chunk(members, maxIcons - 1)[0];
    const collapsedMembers = lodash.chunk(members, maxIcons - 1)[1];
    return (
        <span>
            {
                visibleMembers && collapsedMembers.length > 0 &&
                visibleMembers.map((member) =>
                    <span>
                        <UserIcon diameter={diameter} id={"ID" + member}>
                            {member}
                        </UserIcon>
                        <UncontrolledTooltip placement="bottom" target={"ID" + member} delay={0}>
                            {member}
                        </UncontrolledTooltip>
                    </span>
                )
            }
            {
                collapsedMembers && collapsedMembers.length > 0 &&
                <span >
                    <Icon diameter={diameter} id="additionalMembers">
                        {"+" + collapsedMembers.length}
                    </Icon>
                    <UncontrolledTooltip placement="bottom" target="additionalMembers" delay={0}>
                        {
                            collapsedMembers.map((member) =>
                                <span>{member}<br/></span>
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
    members: PropTypes.array.isRequired,
    maxIcons: PropTypes.number
};

Bar.defaultProps = {
    maxIcons: 5,
    diameter: 40
};

export default Bar;
