import {combineReducers} from "redux";
import {ADD_SCORE_SUCCESS, LOAD_SCORES_SUCCESS} from "../../actions/score";
import _ from "lodash";
import {DELETE_CARD_SUCCESS, LOAD_CARDS_SUCCESS} from "../../actions/card";
import {DELETE_REGISTER_SUCCESS} from "../../actions/register";
import {DELETE_USER_SUCCESS} from "../../actions/user";

/**
 * Reducer for redux to handle score entities
 * Methods to update, add, delete score entities into state
 */

function addScoreEntry(state, action) {
    const {response, registerId} = action;
    return _.assign({}, state, {[response.id]: {...response, register: registerId}});
}

function loadScoreEntries(state, action) {
    const {response, userId, registerId} = action;
    return _.assign({}, _.omitBy(state, {'user': userId, 'register': registerId}), _.keyBy(_.map(response, (o) => {
        return {...o, 'register': registerId}
    }), 'id'));
}

function deleteScoreEntriesByCard(state, action) {
    const {cardId} = action;
    return _.omitBy(state, {'card': cardId});
}

function loadScoreEntriesByCard(state, action) {
    const {response, registerId, userId} = action;
    const cardIds = _.uniq(_.map(response, 'id'));
    return _.omitBy(state, (o) => {
        return !_.includes(cardIds, o.card) && o.user === userId && o.register === registerId
    });
}

function deleteScoreEntriesByRegister(state, action) {
    const {registerId} = action;
    return _.omitBy(state, ['register', registerId]);
}

function deleteScoreEntriesByUser(state, action) {
    const {userId} = action;
    return _.omitBy(state, ['user', userId]);
}

function scoreById(state = {}, action) {
    switch (action.type) {
        case ADD_SCORE_SUCCESS:
            return addScoreEntry(state, action);
        case LOAD_SCORES_SUCCESS:
            return loadScoreEntries(state, action);
        case DELETE_CARD_SUCCESS:
            return deleteScoreEntriesByCard(state, action);
        case LOAD_CARDS_SUCCESS:
            return loadScoreEntriesByCard(state, action);
        case DELETE_REGISTER_SUCCESS:
            return deleteScoreEntriesByRegister(state, action);
        case DELETE_USER_SUCCESS:
            return deleteScoreEntriesByUser(state, action);
        default:
            return state;
    }
}

export default combineReducers({
    byId: scoreById,
});