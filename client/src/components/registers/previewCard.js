import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Card, CardText, CardTitle, Col, Row} from "reactstrap";
import Statistic from "../shared/statistic";
import IconBar from "../shared/member/iconBar";

class PreviewCard extends React.Component {
    render() {
        return (
            <Col xl="4" md="6" xs="12">
                <Card block className="mb-2">
                    <CardTitle>{this.props.title}</CardTitle>

                    <Row className="mb-3">
                        <Col xs="8">
                            <IconBar members={this.props.members} diameter={36}/>
                        </Col>
                        <Col xs="4">
                            <Statistic/>
                        </Col>
                    </Row>

                    <Link className="btn btn-outline-primary" to="/register/3">Öffnen</Link>
                </Card>

            </Col>

        );
    }
}

PreviewCard.propTypes = {
    members: PropTypes.array,
};

export default PreviewCard;
