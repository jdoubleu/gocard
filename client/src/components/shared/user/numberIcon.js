import React from "react";
import PropTypes from "prop-types";

class NumberIcon extends React.Component {

    render() {
        return (
            <span className="user-NumberIcon">
              <svg height={this.props.diameter} width={this.props.diameter}>
                  <circle cx={this.props.diameter / 2} cy={this.props.diameter / 2} r={this.props.diameter / 2 - 2}
                          stroke="gray" fill="none"/>
                  <text fill="grey" fontSize={this.props.diameter / 2.5} x={this.props.diameter / 2}
                        y={this.props.diameter / 2} textAnchor="middle"
                        alignmentBaseline="central">+{this.props.rest}</text>
              </svg>
            </span>
        );
    }
}

NumberIcon.propTypes = {
    rest: PropTypes.number.isRequired,
    diameter: PropTypes.number
};

NumberIcon.defaultProps = {
    rest: 0,
    diameter: 40
};

export default NumberIcon;
