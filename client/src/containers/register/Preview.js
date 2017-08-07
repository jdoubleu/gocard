import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Card, Col, Row} from "reactstrap";
import Title from "../shared/title";
import MemberBar from "../../containers/register/member/Bar";
import {connect} from "react-redux";
import ProgressDoughnut from "./statistic/ProgressDoughnut";

const Preview = ({register}) => {
    return (
        <Col xl="4" md="6" xs="12">
            <Card block className="mb-2">
                <h5>
                    <Title title={register.title}/>
                </h5>

                <Row className="mb-3">
                    <Col xs="8">
                        <MemberBar registerId={register.id} diameter={36}/>
                    </Col>
                    <Col xs="4">
                        <ProgressDoughnut registerId={register.id}/>
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

const mapStateToProps = (state, props) => {
    return {
        register: state.entities.registers.byId[props.registerId] || {},
    }
};

export default connect(mapStateToProps)(Preview);
