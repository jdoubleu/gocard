import {combineReducers} from "redux";
import {
    ADD_REGISTER_SUCCESS,
    DELETE_REGISTER_SUCCESS,
    LOAD_REGISTER_SUCCESS,
    LOAD_REGISTERS_SUCCESS,
    UPDATE_REGISTER_SUCCESS
} from "../../actions/register";
import _ from "lodash";

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


function addRegisterId(state, action) {
    const {response} = action;

    return _.uniq(_.concat(state, response.id));
}

function deleteRegisterId(state, action) {
    const {registerId} = action;

    return _.pull(state, registerId);
}

function updateRegisterId(state, action) {
    const {registerId, response} = action;

    return _.concat(_.pull(state, registerId), response.id);
}

function addRegisterIds(state, action) {
    const {response} = action;

    return _.union(state, _.map(response, 'id'));
}

function allRegisters(state = [], action) {
    switch (action.type) {
        case LOAD_REGISTER_SUCCESS:
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