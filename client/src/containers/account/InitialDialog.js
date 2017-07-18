import React from "react";
import {connect} from "react-redux";
import InitialDialogForm from "../forms/InitialDialog";
import {Card, CardText, CardTitle, Col} from "reactstrap";
import {updateUser} from "../../actions/user";

const InitialDialog = ({user}) => {

    const handleSubmit = (values, dispatch) => {
        return dispatch(updateUser({...values, status: "active"}));
    };

    return (
        <Col sm="12" md={{size: 8, offset: 2}}>
            <Card block>
                <CardTitle>Fast geschafft!</CardTitle>
                <CardText>
                    Bitte gib unten deinen Anzeigenamen ein und akzeptiere die EULA.<br/>
                </CardText>

                <InitialDialogForm onSubmit={handleSubmit} initialValues={user}/>
            </Card>
        </Col>
    );
};

function mapStateToProps(state) {
    return {
        user: state.entities.users.byId[state.auth.userId] || {}
    }
}

export default connect(mapStateToProps)(InitialDialog);
