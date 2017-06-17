import React from "react";
import PropTypes from "prop-types";
import Icon from "../shared/user/icon";
import {Button, Card as CardStrap, CardText, CardTitle, Col} from "reactstrap";

class Card extends React.Component {
    render() {
        return (
            <Col xl="4" md="6" xs="12">
                <CardStrap block className="mb-2">
                    <CardTitle>{this.props.title}</CardTitle>
                    <CardText>
                        {/* Graph component */}
                        {this.props.members.map((member) => <span className="pr-1"><Icon name={member}/></span>)}
                    </CardText>
                    <Button outline color="primary">Öffnen</Button>
                </CardStrap>
            </Col>
        );
    }
}

Card.propTypes = {
    member: PropTypes.array,
};

export default Card;
