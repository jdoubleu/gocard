import {combineReducers} from "redux";
import {ADD_SCORE_SUCCESS, LOAD_CARDSCORE_SUCCESS, LOAD_SCORE_SUCCESS} from "../../actions/score";
import _ from "lodash";

function addScoreEntry(state, action) {
    const {response} = action;
    return _.assign({}, state, {[response.id]: response});
}

function loadScoreEntries(state, action) {
    const {response} = action;
    return _.assign({}, state, _.keyBy(response, 'id'));
}

function loadScoreEntry(state, action) {
    const {response} = action;
    return _.assign({}, state, {[response.id]: response});
}

function scoreById(state = {}, action) {
    switch (action.type) {
        case ADD_SCORE_SUCCESS:
            return addScoreEntry(state, action);
        case LOAD_SCORE_SUCCESS:
            return loadScoreEntries(state, action);
        case LOAD_CARDSCORE_SUCCESS:
            return loadScoreEntry(state, action);
        default:
            return state;
    }
}

export default combineReducers({
    byId: scoreById,
});