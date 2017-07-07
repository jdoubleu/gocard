import React from "react";
import PropTypes from "prop-types";

const Headline = ({title, children, ...rest}) => {
    return (
        <div {...rest}>
            <h1>{title}</h1>
            <p className="text-muted">{children}</p>
        </div>

    );
};

Headline.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.string
};

export default Headline;
