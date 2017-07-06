import React from "react";
import PropTypes from "prop-types";

const Headline = ({title, lead, ...rest}) => {
    return (
        <div {...rest}>
            <h1>{title}</h1>
            <p className="text-muted">{lead}</p>
        </div>

    );
};

Headline.propTypes = {
    title: PropTypes.string.isRequired,
    lead: PropTypes.string
};

export default Headline;
