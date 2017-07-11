import React from "react";
import PropTypes from "prop-types";

const Icon = ({diameter, children, ...rest}) => {
    return (
        <svg height={diameter} width={diameter} {...rest}>
            <circle cx={diameter / 2} cy={diameter / 2} r={diameter / 2 - 2} stroke="gray" fill="none"/>
            <text fontSize={diameter / 2.5} x={diameter / 2} y={diameter / 2} textAnchor="middle"
                  alignmentBaseline="central" fill="grey">
                {children}
            </text>
        </svg>
    );
};

Icon.propTypes = {
    children: PropTypes.string.isRequired,
    diameter: PropTypes.number
};

Icon.defaultProps = {
    diameter: 40
};

export default Icon;
