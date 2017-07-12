import {combineReducers} from "redux";
import {
    ADD_REGISTER_SUCCESS,
    DELETE_REGISTER_SUCCESS,
    LOAD_REGISTERS_SUCCESS,
    UPDATE_REGISTER_SUCCESS
} from "../../actions/register";
import _ from "lodash";

function addRegisterEntry(state, action) {
    const {response} = action;

    return _.merge(state, {[response.uid]: response});
}

function updateRegisterEntry(state, action) {
    const {response} = action;

    return _.merge(state, {[response.uid]: response});
}

function deleteRegisterEntry(state, action) {
    const {registerId} = action;

    return _.omit(state, registerId);
}

function addRegisterEntrys(state, action) {
    const {response} = action;

    return _.merge(state, _.keyBy(response, 'uid'));
}

function registersById(state = {}, action) {
    switch (action.type) {
        case ADD_REGISTER_SUCCESS:
            return addRegisterEntry(state, action);
        case UPDATE_REGISTER_SUCCESS:
            return updateRegisterEntry(state, action);
        case DELETE_REGISTER_SUCCESS:
            return deleteRegisterEntry(state, action);
        case LOAD_REGISTERS_SUCCESS:
            return addRegisterEntrys(state, action);
        default:
            return state;
    }
}


function addRegisterId(state, action) {
    const {response} = action;

    return _.concat(state, response.uid);
}

function deleteRegisterId(state, action) {
    const {registerId} = action;

    return _.omit(state, registerId);
}

function updateRegisterId(state, action) {
    const {registerId, response} = action;

    return _.concat(_.omit(state, registerId), response.uid);
}

function addRegisterIds(state, action) {
    const {response} = action;

    return _.union(state, _.map(response, 'uid'));
}

function allRegisters(state = [], action) {
    switch (action.type) {
        case ADD_REGISTER_SUCCESS:
            return addRegisterId(state, action);
        case UPDATE_REGISTER_SUCCESS:
            return updateRegisterId(state, action);
        case DELETE_REGISTER_SUCCESS:
            return deleteRegisterId(state, action);
        case LOAD_REGISTERS_SUCCESS:
            return addRegisterIds(state, action);
        default:
            return state;
    }
}

export default combineReducers({
    byId: registersById,
    allIds: allRegisters
});