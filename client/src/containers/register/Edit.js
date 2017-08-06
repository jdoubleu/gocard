import React from "react";
import PropTypes from "prop-types";
import Headline from "../../components/shared/headline";
import {Card, Col, Row} from "reactstrap";
import {deleteRegister, updateRegister} from "../../actions/register";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import RegisterForm from "../forms/Register";
import DeleteRegisterForm from "../forms/DeleteRegister";
import {makeGetRegisterById} from "../../selectors";
import {clearMembers} from "../../actions/member";
import _ from "lodash";

const Edit = ({register}) => {
    const handleSubmit = (values, dispatch) => {
        return dispatch(updateRegister(register.id, values)).then(
            response =>
                dispatch(push('/'))
        )
    };

    const handleDeleteSubmit = (values, dispatch) => {
        dispatch(clearMembers( _.map(register.members, 'id')));
        return dispatch(deleteRegister(register.id)).then(
            response =>
                dispatch(push('/'))
        );
    };

    return (
        <Row>
            <Col sm="12" md={{size: 8, offset: 2}}>
                <Headline title="Register bearbeiten">
                    Hier kannst dein Register bearbeiten.
                </Headline>

                <Card block className="mb-3">
                    <RegisterForm onSubmit={handleSubmit} initialValues={register} submitLabel="Speichern"
                                  cancelRoute={`/register/${register.id}`} cancelLabel="Abbrechen"/>
                </Card>

                <Card block>
                    <DeleteRegisterForm onSubmit={handleDeleteSubmit}/>
                </Card>
            </Col>
        </Row>
    )
};

Edit.propTypes = {
    register: PropTypes.object.isRequired
};

const makeMapStateToProps = () => {
    const getRegisterById = makeGetRegisterById();
    return (state, props) => {
        return {
            register: getRegisterById(state, props) || {},
        }
    }
};

export default connect(makeMapStateToProps)(Edit);
