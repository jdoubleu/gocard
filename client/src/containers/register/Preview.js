import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Card, CardTitle, Col, Row} from "reactstrap";
import Progress from "../../containers/register/statistic/Progress";
import MemberBar from "../../containers/register/member/Bar";
import {connect} from "react-redux";

const Preview = ({register}) => {
    return (
        <Col xl="4" md="6" xs="12">
            <Card block className="mb-2">
                <CardTitle>{register.title}</CardTitle>

                <Row className="mb-3">
                    <Col xs="8">
                        <MemberBar registerId={register.id} diameter={36}/>
                    </Col>
                    <Col xs="4">
                        <Progress registerId={register.id}/>
                    </Col>
                </Row>
                <Link className="btn btn-outline-primary" to={`/register/${register.id}`}>Öffnen</Link>
            </Card>
        </Col>
    );
};

Preview.propTypes = {
    registerId: PropTypes.number.isRequired
};

function mapStateToProps(state, props) {
    return {
        register: state.entities.registers.byId[props.registerId] || {},
    }
}

export default connect(mapStateToProps)(Preview);
