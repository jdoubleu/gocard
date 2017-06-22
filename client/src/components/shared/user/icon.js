import React from "react";
import PropTypes from "prop-types";

class Icon extends React.Component {
    getInitials(props) {
        let name = this.props.name;
        // Split name by space
        let splittedName = name.split(" ", 2);
        if (splittedName.length === 1) {
            return splittedName[0].substring(0, 2).toUpperCase();
        } else {
            return splittedName[0].substring(0, 1).toUpperCase() + splittedName[1].substring(0, 1).toUpperCase();
        }
    }

    render() {
        return (
            <svg height={this.props.diameter} width={this.props.diameter}>
                <circle cx={this.props.diameter / 2} cy={this.props.diameter / 2} r={this.props.diameter / 2 - 2}
                        stroke="gray" stroke-width="4" fill="none"/>
                <text fontSize={this.props.diameter / 2.5} x={this.props.diameter / 2} y={this.props.diameter / 2}
                      textAnchor="middle" alignmentBaseline="central" fill="grey">{this.getInitials(this.props)}</text>
            </svg>
        );
    }
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    diameter: PropTypes.number
};

Icon.defaultProps = {
    diameter: 40
};

export default Icon;
