import React from "react";
import PropTypes from "prop-types";
import {Button, Card, CardText, CardTitle, Col, Row} from "reactstrap";
import Statistic from "../shared/statistic";
import IconBar from '../shared/member/iconBar';

class RegisterCard extends React.Component {
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

                    <Button outline color="primary">Öffnen</Button>
                </Card>

            </Col>

        );
    }
}

RegisterCard.propTypes = {
    members: PropTypes.array,
};

export default RegisterCard;
