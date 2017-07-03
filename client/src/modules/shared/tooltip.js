import React from "react";
import PropTypes from "prop-types";
import {Tooltip} from "reactstrap";
import InfoIcon from "./user/infoIcon";

class Tips extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            tooltipOpen: false
        };
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }


    render() {
        return (
            <p>
                <a href="#" id="TooltipExample"><InfoIcon /></a>
                <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggle}>
                    {this.props.name}
                </Tooltip>
            </p>
        );
    }
}

Tips.propTypes = {
    name: PropTypes.string.isRequired,
    diameter: PropTypes.number
};

Tips.defaultProps = {
    diameter: 20
};

export default Tips;
