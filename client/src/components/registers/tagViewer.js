import React from "react";
import { Badge, Button, } from 'reactstrap';
import _ from 'lodash';

class TagViewer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedTags: this.props.tags.slice(0)
      }

      this.handleSelect=this.handleSelect.bind(this);
      this.getTagView=this.getTagView.bind(this);
    }

    handleSelect(tag) {
      let index = this.state.selectedTags.indexOf(tag);
      if(index < 0) {
        this.setState({
          selectedTags: this.state.selectedTags.concat(tag)
        });
      } else {
        var selectedTags = this.state.selectedTags;
        _.pull(selectedTags, tag);
        this.setState({selectedTags});
      }
    }

    getTagView() {
      if(this.props.tags.length > 0) {
        return(
          <div>
            {
              this.props.tags.map((tag)=>
                <Button size="sm" className="mr-1" onClick={() => this.handleSelect(tag)}
                  color={this.state.selectedTags.includes(tag)?'primary': 'secondary'}>{tag} {this.state.selectedTags.includes(tag)?'\u2714': ''}</Button>
              )
            }
          </div>
        );
      } else {
        return(
          <div>
            <p>
              Keine Tags vorhanden.
            </p>
          </div>
        );
      }
    }

    render() {
        return (
          <div>
            {this.getTagView()}
          </div>
        );
    }
}

TagViewer.defaultProps = {
  tags: ["tags", "of", "all", "cards"]
}

export default TagViewer;
