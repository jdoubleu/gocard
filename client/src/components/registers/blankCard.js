import React from "react";
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class BlankCard extends React.Component{
    render() {
        return (
            <Link to="/register/new">
              <h2>Neue Karte Erstellen</h2>
              <div>
                  <svg height={this.props.size} width={this.props.size}>
                      <line x1="0" y1={this.props.size/2} x2={this.props.size} y2={this.props.size/2} strokeWidth={this.props.size/10} stroke="black" />
                      <line x1={this.props.size/2} y1="0" x2={this.props.size/2} y2={this.props.size} strokeWidth={this.props.size/10} stroke="black" />
                  </svg>
              </div>
              <Button>Erstellen</Button>
            </Link>
        );
    }
}

BlankCard.probTypes = {
    size: PropTypes.number
}

BlankCard.defaultProps = {
    size: 40
}


export default BlankCard;
