import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import _ from "lodash";
import TagViewerComponent from "../../../components/register/modules/tagViewer";
import {storeSelectedTags} from "../../../actions/registers";

class TagViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: this.calculatedTags(),
            selectedTags: this.calculatedSelectedTags()
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.calculatedTags = this.calculatedTags.bind(this);
        this.calculatedSelectedTags = this.calculatedSelectedTags.bind(this);
    }

    calculatedTags(){
        let tags = [];
        _.forEach(this.props.cards, function(card) {
            tags = _.concat(tags, card.tags)
        });
        tags = _.uniq(tags);
        if(tags === undefined){
            return [];
        } else {
            return tags;
        }
    }

    calculatedSelectedTags(){
        if(this.props.selectedTags !== undefined && this.props.selectedTags.length > 0 ){
            return this.props.selectedTags;
        } else {
            return this.calculatedTags().slice(0);
        }
    }

    handleSelect(tag) {
        let index = this.state.selectedTags.indexOf(tag);
        if (index < 0) {
            this.setState({
                selectedTags: this.state.selectedTags.concat(tag)
            }, function(){
                this.props.dispatch(storeSelectedTags(this.props.registerId, this.state.selectedTags));
            });
        } else {
            let selectedTags = this.state.selectedTags;
            _.pull(selectedTags, tag);
            this.setState({selectedTags}, function(){
                this.props.dispatch(storeSelectedTags(this.props.registerId, this.state.selectedTags));
            });
        }
    }

    render() {
        return (
            <div>
                <TagViewerComponent tags={["OOP2","Netze","Mathe3","Bibbers"]} selectedTags={this.state.selectedTags} handleSelect={this.handleSelect}/>
            </div>
        );
    }
}



TagViewer.propTypes = {
    cards: PropTypes.array.isRequired,
    registerId: PropTypes.number.isRequired
};


function mapStateToProps(state, ownProps) {
    return {
        selectedTags: state.registers.selectedTags[ownProps.registerId]
    }
}

export default connect(mapStateToProps)(TagViewer);
