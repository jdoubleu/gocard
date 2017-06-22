import React from "react";
import PropTypes from "prop-types";
import {Button, Card, CardTitle, Col, CardText} from "reactstrap";
import {Link} from "react-router-dom";

class BlankPreviewCard extends React.Component {
    render() {
        return (
            <Col xl="4" md="6" xs="12">
                <Link to="/register/:id/card/new">
                <Card block className="text-center mb-2">
                    <CardText className="display-1">+</CardText>
                    <CardTitle>Erstellen</CardTitle>
                </Card>
                </Link>
            </Col>

        );
    }
}


export default BlankPreviewCard;
