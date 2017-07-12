import {combineReducers} from "redux";

function registersById(state = {}, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function allRegisters(state = [], action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default combineReducers({
    byId: registersById,
    allIds: allRegisters
});