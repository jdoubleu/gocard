import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {updateUser} from "../../actions/user";
import {Card, Col} from "reactstrap";
import Headline from "../../components/shared/headline";
import SettingsForm from "../forms/Settings";
import Icon from "../../components/shared/user/icon";
import {formValueSelector} from "redux-form";

const Settings = ({user, displayName}) => {
    return (
        <Col sm="12" md={{size: 8, offset: 2}}>
            <Headline title="Einstellungen"/>

            <Card block>
                <div className="text-center">
                    <Icon diameter={200}>
                        {displayName}
                    </Icon>
                </div>

                <SettingsForm onSubmit={handleSubmit} initialValues={user}/>
            </Card>
        </Col>
    )
};

Settings.propTypes = {
    user: PropTypes.object.isRequired
};

const handleSubmit = (values, dispatch) => {
    return dispatch(updateUser(values));
};

const selector = formValueSelector('settingsForm');
function mapStateToProps(state) {
    return {
        user: state.entities.users.byId[state.auth.userId] || {},
        displayName: selector(state, 'displayName')
    }
}

export default connect(mapStateToProps)(Settings);
