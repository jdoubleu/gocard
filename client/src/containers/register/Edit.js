import React from "react";
import PropTypes from "prop-types";
import Headline from "../../components/shared/headline";
import {Card, Col} from "reactstrap";
import {updateRegister} from "../../actions/register";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import RegisterForm from "../forms/Register";

const Edit = ({register}) => {
    const handleSubmit = (values, dispatch) => {
        return dispatch(updateRegister(register.uid, values)).then(
            response =>
                dispatch(push('/'))
        )
    };

    return (
        <Col sm="12" md={{size: 8, offset: 2}}>
            <Headline title="Register bearbeiten">
                Hier kannst dein Register bearbeiten.
            </Headline>

            <Card block>
                <RegisterForm onSubmit={handleSubmit} initialValues={register} submitLabel="Speichern"/>
            </Card>
        </Col>
    )
};

Edit.propTypes = {
    register: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    const registerId = ownProps.match.params.id;
    return {
        register: state.entities.registers.byId[registerId] || {},
    }
}

export default connect(mapStateToProps)(Edit);
