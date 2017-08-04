import {combineReducers} from "redux";
import {
    SET_SELECTED_SETTINGS
} from "../../actions/ui";
import _ from "lodash";

function addSettings(state, action) {
    return _.assign({}, state, {
        [action.payload.registerId]: {
            mode: action.payload.mode,
            tags: action.payload.tags
        }
    });
}

function settingsById(state = {}, action) {
    switch (action.type) {
        case SET_SELECTED_SETTINGS:
            return addSettings(state, action);
        default:
            return state;
    }
}

function addSettingsId(state, action) {
    return _.uniq(_.concat(state, action.payload.registerId));
}

function allSettings(state = [], action) {
    switch (action.type) {
        case SET_SELECTED_SETTINGS:
            return addSettingsId(state, action);
        default:
            return state;
    }
}

export default combineReducers({
    byId: settingsById,
    allIds: allSettings
})