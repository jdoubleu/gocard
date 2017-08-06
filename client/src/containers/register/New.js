import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addRegister} from "../../actions/register";
import {addMembersToRegister} from "../../actions/member";
import moment from "moment";
import {push} from "react-router-redux";
import {Card, Col, Row} from "reactstrap";
import Headline from "../../components/shared/headline";
import RegisterForm from "../forms/Register";
import _ from "lodash";

const New = ({userId}) => {
    const handleSubmit = (values, dispatch) => {
        return dispatch(addRegister({
            title: values.title,
            description: values.description,
            owner: userId,
            crdate: moment().format(),
        })).then(
            success => {
                if (!_.isEmpty(values.members)) {
                    dispatch(addMembersToRegister(success.response.id, values.members));
                }
                dispatch(push('/'))
            }
        )
    };

    return (
        <Row>
            <Col sm="12" md={{size: 8, offset: 2}}>
                <Headline title="Neues Register">
                    Hier kannst du ein neues Register für Deine Karteikarten erstellen.
                </Headline>

                <Card block>
                    <RegisterForm onSubmit={handleSubmit} submitLabel="Erstellen" cancelRoute="/"
                                  cancelLabel="Abbrechen"/>
                </Card>
            </Col>
        </Row>
    )
};

New.propTypes = {
    userId: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(New);
