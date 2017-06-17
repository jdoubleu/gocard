import React from "react";
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

class BlankCard extends React.Component{
    render() {
        return (
            <div className="blankCard">
                <h2>Neue Karte Erstellen</h2>
                <div>
                    <svg height={this.props.size} width={this.props.size}>
                        <line x1="0" y1={this.props.size/2} x2={this.props.size} y2={this.props.size/2} strokeWidth="4" stroke="black" />
                        <line x1={this.props.size/2} y1="0" x2={this.props.size/2} y2={this.props.size} strokeWidth="4" stroke="black" />
                    </svg>
                </div>
                <Button>Erstellen</Button>
            </div>
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
