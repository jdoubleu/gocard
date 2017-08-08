import React from "react";
import PropTypes from "prop-types";

class Title extends React.Component {
    fitTitle() {
        if ((this.props.title || '').length <= 35) {
            return this.props.title
        } else {
            let clippedTitle = this.props.title.substring(0, 30);
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

export default (Title);