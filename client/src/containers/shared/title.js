import React from "react";
import PropTypes from "prop-types";

/**
 * Class that clipps the title after a certain length.
 */
class Title extends React.Component {
    fitTitle() {
        const {cutOff} = this.props;
        if ((this.props.title || '').length <= cutOff) {
            return this.props.title
        } else {
            let clippedTitle = this.props.title.substring(0, (cutOff - 5));
            return clippedTitle + "...";
        }
    }

    render() {
        const {title} = this.props;
        const newTitle = this.fitTitle(title);
        return (
            <span>
                {newTitle}
            </span>
        )
    };
}

Title.propTypes = {
    title: PropTypes.string
};

Title.defaultProps = {
    cutOff: 35
};

export default (Title);