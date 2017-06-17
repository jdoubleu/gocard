import React from "react";
import PropTypes from 'prop-types';
import Icon from '../shared/user/icon'
import { Button } from 'reactstrap';

class Card extends React.Component{

    render() {
        return (
            <div>
              <h2>{this.props.title}</h2>
              <div>
                {this.props.members.map((member) => <Icon name={member} />)}
              </div>
              <div>
                {/* Graph component */}
              </div>
              <Button>Öffnen</Button>
            </div>
        );
    }
}

Card.propTypes = {
  member: PropTypes.array.isRequired,
};

export default Card;
