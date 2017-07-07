import React from "react";
import PropTypes from "prop-types";

const CollapsedIcon = ({children, diameter, ...rest}) => {
    return (
        <svg height={diameter} width={diameter} {...rest}>
            <circle cx={diameter / 2} cy={diameter / 2} r={diameter / 2 - 2}
                    stroke="gray" fill="none"/>
            <text fill="grey" fontSize={diameter / 2.5} x={diameter / 2}
                  y={diameter / 2} textAnchor="middle"
                  alignmentBaseline="central">
                +{children.length}
            </text>
        </svg>
    );
};

CollapsedIcon.propTypes = {
    children: PropTypes.array.isRequired,
    diameter: PropTypes.number
};

CollapsedIcon.defaultProps = {
    diameter: 40
};

export default CollapsedIcon;
