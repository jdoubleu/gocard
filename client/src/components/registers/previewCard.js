import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Button, Card, CardText, CardTitle, Col, Row} from "reactstrap";
import Statistic from "../shared/statistic";
import IconBar from '../shared/member/iconBar';

class PreviewCard extends React.Component {
    render() {
        return (
            <Col xl="4" md="6" xs="12">
                <Card block className="mb-2">
                    <CardTitle>{this.props.title}</CardTitle>

                    <Row>
                        <Col xs="6">
                            <CardText>
                                <IconBar members={this.props.members} />
                            </CardText>
                        </Col>
                        <Col xs="6">
                            <CardText>
                                <Statistic/>
                            </CardText>
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
