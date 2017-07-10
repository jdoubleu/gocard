import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import _ from "lodash";
import TagViewerComponent from "../../../components/register/modules/tagViewer";

class TagViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            selectedTags: this.state.tags.slice(0)
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.calculatedTags = this.calculatedTags.bind(this);

    }
    componentWillMount(){
        this.calculatedTags();
    }

    calculatedTags(){
        let tags = [];
        _.forEach(this.props.cards, function(card) {
            tags = _.concat(tags, card.tags)
        });
        tags = _.uniq(tags);
        this.setState({
           tags
        });
    }

    handleSelect(tag) {
        let index = this.state.selectedTags.indexOf(tag);
        if (index < 0) {
            this.setState({
                selectedTags: this.state.selectedTags.concat(tag)
            });
        } else {
            let selectedTags = this.state.selectedTags;
            _.pull(selectedTags, tag);
            this.setState({selectedTags});
        }
    }

    render() {
        return (
            <div>
                <TagViewerComponent tags={this.state.tags} selectedTags={this.state.selectedTags} handleSelect={this.handleSelect}/>
            </div>
        );
    }
}



TagViewer.propTypes = {
    cards: PropTypes.array.isRequired
};


function mapStateToProps(state) {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps)(TagViewer);
