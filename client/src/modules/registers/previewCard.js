import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Card, CardTitle, Col, Row} from "reactstrap";
import Statistic from "../shared/statistic";
import IconBar from "../../components/register/member/bar";

class PreviewCard extends React.Component {
    render() {
        console.log("Register", this.props.register);
        return (
            <Col xl="4" md="6" xs="12">
                <Card block className="mb-2">
                    <CardTitle>{this.props.register.title}</CardTitle>

                    <Row className="mb-3">
                        <Col xs="8">
                            <IconBar members={this.props.register.members} diameter={36}/>
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
    register: PropTypes.object.isRequired
};

export default PreviewCard;
