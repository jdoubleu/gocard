import React from "react";
import PropTypes from "prop-types";
import Icon from "../shared/user/icon";
import {Button, Card as StrapCard, CardText, CardTitle, Col} from "reactstrap";

class Card extends React.Component {
    render() {
        return (
            <Col xl="4" md="6" xs="12">
                <StrapCard block className="mb-2">
                    <CardTitle>{this.props.title}</CardTitle>
                    <CardText>
                        {/* Graph component */}
                        {this.props.members.map((member) => <Icon name={member}/>)}
                    </CardText>
                    <Button outline color="primary">Öffnen</Button>
                </StrapCard>
            </Col>
        );
    }
}

Card.propTypes = {
    member: PropTypes.array,
};

export default Card;
