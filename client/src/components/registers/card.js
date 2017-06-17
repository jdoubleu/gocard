import React from "react";
import PropTypes from 'prop-types';
import Icon from '../shared/user/icon'
import { Button, Card, CardTitle, CardText, Col } from 'reactstrap';

class RegCard extends React.Component{

    render() {
        return (
            <Col md="4">
              <Card>
                <CardTitle>{this.props.title}</CardTitle>
                <CardText>
                  {/* Graph component */}
                  {this.props.members.map((member) => <Icon name={member} />)}
                </CardText>
                <Button outline color="primary">Öffnen</Button>
              </Card>
            </Col>
        );
    }
}

RegCard.propTypes = {
  member: PropTypes.array.isRequired,
};

export default RegCard;
