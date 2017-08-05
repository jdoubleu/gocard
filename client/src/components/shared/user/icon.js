import React from "react";
import PropTypes from "prop-types";
import BaseIcon from "../icon";
import {getInitials} from "../../../utils";


const Icon = ({children, ...rest}) => {
    return (
        <BaseIcon {...rest}>
            {getInitials(children)}
        </BaseIcon>
    );
};

Icon.propTypes = {
    children: PropTypes.string,
    diameter: PropTypes.number
};

Icon.defaultProps = {
    diameter: 40
};

export default Icon;
