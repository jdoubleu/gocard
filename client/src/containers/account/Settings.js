import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteUser, updateUser, updatePassword} from "../../actions/user";
import {Card, CardText, CardTitle, Col} from "reactstrap";
import Headline from "../../components/shared/headline";
import SettingsForm from "../forms/Settings";
import DeleteUserForm from "../forms/DeleteUser";
import ResetForm from "../forms/Reset";
import Icon from "../../components/shared/user/icon";
import {formValueSelector} from "redux-form";
import {logoutUser} from "../../actions/auth";

const Settings = ({user, displayName, resetToken}) => {

    const handleSubmit = (values, dispatch) => {
        return dispatch(updateUser(user.id, values));
    };

    const handleDeleteSubmit = (values, dispatch) => {
        return dispatch(deleteUser(user.id)).then(
            dispatch(logoutUser())
        );
    };

    const handleResetSubmit = (values, dispatch) => {
        return dispatch(updatePassword(resetToken, values));
    };

    return (
        <Col sm="12" md={{size: 8, offset: 2}}>
            <Headline title="Einstellungen">
                Hier kannst du deinen Account bearbeiten oder löschen.
            </Headline>

            <Card block className="mb-3">
                <div className="text-center">
                    <Icon diameter={200}>
                        {displayName}
                    </Icon>
                </div>

                <SettingsForm onSubmit={handleSubmit} initialValues={user}/>
            </Card>

            {
                user.accountType === 'local' &&
                <Card block className="mb-3">
                    <CardTitle>Passwort ändern</CardTitle>
                    <CardText>Hiermit kannst du dein Passwort für dein lokalen GoCard-Account ändern.</CardText>
                    <ResetForm onSubmit={handleResetSubmit}/>
                </Card>
            }


            <Card block className="mb-3">
                <CardTitle>Account löschen</CardTitle>
                <CardText>Wenn du deinen wirklich löschen möchtest, bestätige dies.</CardText>
                <DeleteUserForm onSubmit={handleDeleteSubmit}/>
            </Card>
        </Col>
    )
};

Settings.propTypes = {
    user: PropTypes.object.isRequired
};

const selector = formValueSelector('settingsForm');
function mapStateToProps(state) {
    return {
        user: state.entities.users.byId[state.auth.userId] || {},
        resetToken: state.auth.token.resetToken || '',
        displayName: selector(state, 'displayName')
    }
}

export default connect(mapStateToProps)(Settings);
