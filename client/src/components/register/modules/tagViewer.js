import React from "react";
import PropTypes from "prop-types";
import {Button} from "reactstrap";


const tagViewer = ({tags, handleSelect, selectedTags}) => {
    return (
        <div>
            {tags &&
                this.props.tags.map((tag) =>
                    <Button outline size="sm" className="mr-1" onClick={() => handleSelect(tag)}
                            color={selectedTags.includes(tag) ? 'primary' : 'secondary'}>{tag} {selectedTags.includes(tag) ? '\u2714' : ''}</Button>
                )
            }
            {!tags &&
                <p>
                    Keine Tags vorhanden.
                </p>
            }
        </div>
    );
};

tagViewer.propTypes = {
    tags: PropTypes.array.isRequired,
    selectedTags: PropTypes.array.isRequired,
    handleSelect: PropTypes.func.isRequired,
};

export default tagViewer;
