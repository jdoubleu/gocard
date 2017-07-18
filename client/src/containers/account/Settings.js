import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteUser, updateUser} from "../../actions/user";
import {Card, CardText, CardTitle, Col} from "reactstrap";
import Headline from "../../components/shared/headline";
import SettingsForm from "../forms/Settings";
import DeleteUserForm from "../forms/DeleteUser";
import Icon from "../../components/shared/user/icon";
import {formValueSelector} from "redux-form";
import {logoutUser} from "../../actions/auth";

const Settings = ({user, displayName}) => {

    const handleSubmit = (values, dispatch) => {
        return dispatch(updateUser(user.id, values));
    };

    const handleDeleteSubmit = (values, dispatch) => {
        return dispatch(deleteUser(user.uid)).then(
            dispatch(logoutUser())
        );
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

            <Card block>
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
        displayName: selector(state, 'displayName')
    }
}

export default connect(mapStateToProps)(Settings);
