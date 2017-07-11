import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Card, CardTitle, Col, Row} from "reactstrap";
import Statistic from "../../modules/shared/statistic";
import MemberBar from "./member/bar";

const Preview = ({register, ...rest}) => {
    return (
        <Col xl="4" md="6" xs="12" {...rest}>
            <Card block className="mb-2">
                <CardTitle>{register.title}</CardTitle>

                <Row className="mb-3">
                    <Col xs="8">
                        <MemberBar members={register.members} diameter={36}/>
                    </Col>
                    <Col xs="4">
                        <Statistic/>
                    </Col>
                </Row>
                <Link className="btn btn-outline-primary" to={`/register/${register.uid}`}>Öffnen</Link>
            </Card>
        </Col>
    );
};

Preview.propTypes = {
    register: PropTypes.object.isRequired
};

export default Preview;
