import {combineReducers} from "redux";
import {
    ADD_REGISTER_SUCCESS,
    DELETE_REGISTER_SUCCESS,
    LOAD_REGISTER_SUCCESS,
    LOAD_REGISTERS_SUCCESS,
    UPDATE_REGISTER_SUCCESS
} from "../../actions/register";
import _ from "lodash";

/**
 * Reducer for redux to handle register entities
 * Methods to update, add, delete register entities into state
 */

function addRegisterEntry(state, action) {
    const {response} = action;

    return _.assign({}, state, {[response.id]: response});
}

function updateRegisterEntry(state, action) {
    const {response} = action;

    return _.assign({}, state, {[response.id]: response});
}

function deleteRegisterEntry(state, action) {
    const {registerId} = action;

    return _.omit(state, registerId);
}

function addRegisterEntries(state, action) {
    const {response} = action;

    return _.assign({}, state, _.keyBy(response, 'id'));
}

function registersById(state = {}, action) {
    switch (action.type) {
        case LOAD_REGISTER_SUCCESS:
        case ADD_REGISTER_SUCCESS:
            return addRegisterEntry(state, action);
        case UPDATE_REGISTER_SUCCESS:
            return updateRegisterEntry(state, action);
        case DELETE_REGISTER_SUCCESS:
            return deleteRegisterEntry(state, action);
        case LOAD_REGISTERS_SUCCESS:
            return addRegisterEntries(state, action);
        default:
            return state;
    }
}

export default combineReducers({
    byId: registersById,
});