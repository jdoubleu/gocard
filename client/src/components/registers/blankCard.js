import React from "react";
import {Card, CardTitle, CardText, Col} from 'reactstrap';
import {Link} from 'react-router-dom';

class BlankCard extends React.Component {
    render() {
        return (
            <Col xl="4" md="6" xs="12">
                <Link to="/register/new">
                    <Card block className="text-center mb-2">
                        <CardText className="display-1">+</CardText>
                        <CardTitle>Erstellen</CardTitle>
                    </Card>
                    <hr/>
                </Link>
            </Col>
        );
    }
}

export default BlankCard;
