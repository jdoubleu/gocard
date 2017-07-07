import React from "react";
import lodash from "lodash";
import PropTypes from "prop-types";
import {UncontrolledTooltip} from "reactstrap";
import Icon from "../../shared/user/icon";
import CollapsedIcon from "./collapsedIcon";

const Bar = ({members, diameter, maxIcons}) => {
    const visibleMembers = lodash.chunk(members, maxIcons - 1)[0];
    const collapsedMembers = lodash.chunk(members, maxIcons - 1)[1];
    return (
        <span>
            {
                visibleMembers.map((member) =>
                    <span>
                        <Icon diameter={diameter} id={"ID" + member}>
                            {member}
                        </Icon>
                        <UncontrolledTooltip placement="bottom" target={"ID" + member} delay={0}>
                            {member}
                        </UncontrolledTooltip>
                    </span>
                )
            }
            {
                collapsedMembers && collapsedMembers.length > 0 &&
                <span id="additionalMembers">
                    <CollapsedIcon diameter={diameter}>
                        {collapsedMembers}
                    </CollapsedIcon>
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
