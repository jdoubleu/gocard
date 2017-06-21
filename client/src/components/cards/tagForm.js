import React from "react";
import { Input, Badge, Button, Row, Col } from 'reactstrap';
import _ from 'lodash';

class TagForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        tags: ["attached tag"],
        suggestions : [],
        showSearch: false,
        allTags: ["tags", "of", "all", "cards"],
        search: ''
      }

      this.handleDelete = this.handleDelete.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.getTagList = this.getTagList.bind(this);
      this.addTag = this.addTag.bind(this);
    };

    handleDelete(tag) {
      var tags = this.state.tags;
      _.pull(tags, tag);
      this.setState({tags});
    }

    handleChange(event) {
      var showSearch = event.target.value === '' ? false : true;
      this.setState({search: event.target.value})
      var tags = this.state.tags;
      this.setState({showSearch});
      if(showSearch) {
        var suggestions = this.state.allTags.filter(t => {
          return t.includes(event.target.value);
        })
        //remove allready used tags from suggestions
        suggestions = suggestions.filter(e=> !tags.includes(e));
        this.setState({suggestions})
      }
    }

    addTag(tag) {
      if(this.state.tags.indexOf(tag) === -1) {
        this.setState({
          tags: this.state.tags.concat(tag),
          search: '',
          showSearch: false
        });
      }
    }

    getTagList() {
        if(this.state.showSearch) {
          return (
            <div>
              <Row>
                <Col>
                  {this.state.search} <Button onClick={() => this.addTag(this.state.search)} color="link">Add</Button>
                </Col>
              </Row>
              {this.state.suggestions.map((result) =>
                <Row key={result}>
                  <Col>
                    {result} <Button onClick={() => this.addTag(result)} color="link">Add</Button>
                  </Col>
                </Row>
              )}
          </div>
          );
        }
    }

    render() {
        return (
            <div>
              <Input type="text" id="search" value={this.state.search} placeholder="Bitte Tag eingeben." onChange={this.handleChange}></Input>
              {
                this.state.tags.map((tag)=>
                  <Badge className="mr-1 mt-1">{tag} <Button onClick={() => this.handleDelete(tag)} color="link" className="p-0 text-white">x</Button></Badge>
                )
              }
              {this.getTagList()}
            </div>
        );
    }
}
export default TagForm;
