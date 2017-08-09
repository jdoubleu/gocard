import React from "react";
import {connect} from "react-redux";
import InitialDialogForm from "../forms/InitialDialog";
import {Card, CardText, CardTitle, Col, Row} from "reactstrap";
import {deleteUser, updateUser} from "../../actions/user";
import {logoutUser} from "../../actions/auth";
import Headline from "../shared/headline";
import DeleteUserForm from "../forms/DeleteUser";
/**
 * Form for Initial Dialog. The Initial Dialog appears when a User logs in for the first time.
 * If the user accepts the Eula he will be updated else he will be deleted.
 */
const InitialDialog = ({user}) => {

    const handleSubmit = (values, dispatch) => {
        return dispatch(updateUser(user.id, {...values, status: "active"}));
    };

    const handleDeleteSubmit = (values, dispatch) => {
        return dispatch(
            deleteUser(user.id)
        ).then(
            response =>
                dispatch(logoutUser())
        );
    };

    return (
        <Row>
            <Col sm="12" md={{size: 8, offset: 2}}>
                <Headline title="Fast geschafft!"/>
                <Card block>
                    <CardText>
                        Bitte gib unten deinen Anzeigenamen ein und akzeptiere die EULA.<br/>
                    </CardText>

                    <InitialDialogForm onSubmit={handleSubmit} initialValues={user}/>
                </Card>

                <Card block className="mt-4">
                    <CardTitle>Account löschen</CardTitle>
                    <CardText>Wenn du die EULA nicht akzeptieren möchtest, kannst du deinen Account löschen.</CardText>
                    <DeleteUserForm onSubmit={handleDeleteSubmit}/>
                </Card>
            </Col>
        </Row>
    );
};

function mapStateToProps(state) {
    return {
        user: state.entities.users.byId[state.auth.userId] || {}
    }
}

export default connect(mapStateToProps)(InitialDialog);
