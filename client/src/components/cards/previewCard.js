import React from "react";
import PropTypes from "prop-types";
import {Button, Card, CardTitle, Col} from "reactstrap";

class PreviewCard extends React.Component {
    render() {
        return (
            <Col xl="4" md="6" xs="12">
                <Card block className="mb-2">
                    <CardTitle>{this.props.card.question}</CardTitle>
                    <Button outline color="primary">Ansehen</Button>
                </Card>
            </Col>

        );
    }
}

PreviewCard.propTypes = {
    card: PropTypes.object.isRequired,
};

export default PreviewCard;
