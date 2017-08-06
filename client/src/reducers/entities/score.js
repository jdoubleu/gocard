import {combineReducers} from "redux";
import {
    LOAD_SCORE_SUCCESS,
    ADD_SCORE_SUCCESS,
    LOAD_CARDSCORE_SUCCESS
} from "../../actions/score";
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

function addScoreId(state, action) {
    const {response} = action;

    return _.uniq(_.concat(state, response.id));
}

function addScoreIds(state, action) {
    const {response} = action;

    return _.union(state, _.map(response, 'id'));
}



function allScores(state = [], action) {
    switch (action.type) {
        case ADD_SCORE_SUCCESS:
        case LOAD_CARDSCORE_SUCCESS:
            return addScoreId(state, action);
        case LOAD_SCORE_SUCCESS:
            return addScoreIds(state, action);

        default:
            return state;
    }
}

export default combineReducers({
    byId: scoreById, // {} 1=>1,20,2
    allIds: allScores // [1]
});