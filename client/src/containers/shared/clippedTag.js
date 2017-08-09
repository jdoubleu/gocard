import React from "react";
import PropTypes from "prop-types";

/**
 * Class that clippes the Tag after a certain length
 */
class ClippedTag extends React.Component {
    fitTitle() {
        if (this.props.tag.length <= 35) {
            return this.props.tag
        } else {
            let clippedTitle = this.props.tag.substring(0, 30);
            return clippedTitle + "...";
        }
    }

    render() {
        const {tag} = this.props;
        const newTag = this.fitTitle(tag);
        return (
            <span>
                {newTag}
            </span>
        )
    };
}

ClippedTag.propTypes = {
    tag: PropTypes.string.isRequired
};


export default (ClippedTag);
