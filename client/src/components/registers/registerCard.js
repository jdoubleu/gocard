import React from "react";
import PropTypes from "prop-types";
import Icon from "../shared/user/icon";
import {Button, Card as CardStrap, CardText, CardTitle, Col, Row} from "reactstrap";
import Statistic from "../shared/statistic";

class RegisterCard extends React.Component {
    render() {
        return (
            <Col xl="4" md="6" xs="12">
                <CardStrap block className="mb-2">
                    <CardTitle>{this.props.title}</CardTitle>

                    <Row>
                        <Col xs="6">
                            <CardText>
                                {this.props.members.map((member) => <span className="pr-1"><Icon
                                    name={member}/></span>)}
                            </CardText>
                        </Col>
                        <Col xs="6">
                            <CardText>
                                <Statistic/>
                            </CardText>
                        </Col>
                    </Row>

                    <Button outline color="primary">Öffnen</Button>
                </CardStrap>

            </Col>

        );
    }
}

RegisterCard.propTypes = {
    member: PropTypes.array,
};

export default RegisterCard;
