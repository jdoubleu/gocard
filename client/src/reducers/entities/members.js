import {combineReducers} from "redux";

function membersById(state = {}, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function allMembers(state = [], action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default combineReducers({
    byId: membersById,
    allIds: allMembers
});