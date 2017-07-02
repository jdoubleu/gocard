import React from "react";
import PropTypes from "prop-types";

class InfoIcon extends React.Component {


    render() {
        return (
            <svg height={this.props.diameter} width={this.props.diameter}>
                <circle cx={this.props.diameter / 2} cy={this.props.diameter / 2} r={this.props.diameter / 2 - 2}
                        stroke="grey" fill="none"/>
                <text fontSize={this.props.diameter / 2.5} x={this.props.diameter / 2} y={this.props.diameter / 2}
                      textAnchor="middle" alignmentBaseline="central" fill="blue">I</text>
            </svg>
        );
    }
}

InfoIcon.propTypes = {
    name: PropTypes.string.isRequired,
    diameter: PropTypes.number
};

InfoIcon.defaultProps = {
    diameter: 20
};

export default InfoIcon;
