import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteUser, requestPasswordReset, updateUser} from "../../actions/user";
import {Card, CardText, CardTitle, Col, Row} from "reactstrap";
import Headline from "../shared/headline";
import SettingsForm from "../forms/Settings";
import DeleteUserForm from "../forms/DeleteUser";
import PasswordChangeRequest from "../forms/PasswordChangeRequest";
import Icon from "../shared/user/icon";
import {formValueSelector} from "redux-form";
import {logoutUser} from "../../actions/auth";

/**
 * Form for Usersettings. This form has subforms SettingFrom, PasswordChangeForm and DeleteUserFrom. Each Form triggers a
 * different submit.
 */
const Settings = ({user, displayName}) => {

    const handleSubmit = (values, dispatch) => {
        return dispatch(updateUser(user.id, values));
    };

    const handleDeleteSubmit = (values, dispatch) => {
        return dispatch(deleteUser(user.id)).then(
            dispatch(logoutUser())
        );
    };

    const handleChangeRequestSubmit = (values, dispatch) => {
        return dispatch(requestPasswordReset(user.email));
    };

    return (
        <Row>
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
                        <PasswordChangeRequest disableMail onSubmit={handleChangeRequestSubmit}/>
                    </Card>
                }


                <Card block className="mb-3">
                    <CardTitle>Account löschen</CardTitle>
                    <CardText>Wenn du deinen wirklich löschen möchtest, bestätige dies.</CardText>
                    <DeleteUserForm onSubmit={handleDeleteSubmit}/>
                </Card>
            </Col>
        </Row>
    )
};

Settings.propTypes = {
    user: PropTypes.object.isRequired
};

const selector = formValueSelector('settingsForm');
function mapStateToProps(state) {
    return {
        user: state.entities.users.byId[state.auth.userId] || {},
        displayName: selector(state, 'displayName')
    }
}

export default connect(mapStateToProps)(Settings);
