import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Card, CardTitle, Col, Row} from "reactstrap";
import Statistic from "../../components/shared/statistics/statistic";
import MemberBar from "../../components/register/member/bar";
import {connect} from "react-redux";

const Preview = ({register, ...rest}) => {
    return (
        <Col xl="4" md="6" xs="12" {...rest}>
            <Card block className="mb-2">
                <CardTitle>{register.title}</CardTitle>

                <Row className="mb-3">
                    <Col xs="8">
                        <MemberBar members={{}} diameter={36}/>
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
    registerId: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        register: state.entities.registers.byId[ownProps.registerId] || {},
    }
}

export default connect(mapStateToProps)(Preview);
