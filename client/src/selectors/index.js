import {createSelector} from 'reselect'
import _ from "lodash";

const getRegisterId = (state, props) => _.parseInt(props.match.params.registerId);
const getCards = (state) => state.entities.cards.byId;
const getUserId = (state) => state.auth.userId;
const getMembers = (state) => state.entities.members.byId;
const getKeyword = (state, props) => props.keyword;
const getUsers = (state) => state.entities.users.byId;
const getSelectedTags = (state, props) => state.ui.learnSettings.byId[_.parseInt(props.match.params.registerId)].tags;
const getAnsweredCardsIds = (state) => state.ui.learning.allIds || [];
const getAnsweredCards = (state) => state.ui.learning.byId || {};

export const makeGetCardsByRegister = (state, props) => {
    return createSelector(
        [getRegisterId, getCards],
        (registerId, cards) => {
            return _.filter(cards, {'register': registerId});
        }
    )
};

export const makeGetCardIdsByRegister = (state, props) => {
    return createSelector(
        [makeGetCardsByRegister()],
        (cards) => {
            return _.map(cards, 'id');
        }
    );
};

export const makeGetRegisterIds = () => {
    return createSelector(
        [getUserId, getMembers],
        (userId, members) => {
            return _.map(_.filter(members, {'user': userId}), 'register');
        }
    );
};

export const makeGetTagsByRegister = () => {
    return createSelector(
        [makeGetCardsByRegister()],
        (cards) => {
            return _.uniq(_.flatMap(cards, 'tags'));
        }
    );
};

export const makeGetTagsByRegisterByKeyword = () => {
    return createSelector(
        [makeGetTagsByRegister(), getKeyword],
        (tags, keyword) => {
            return _.filter(tags, _.method('includes', keyword));
        }
    );
};

export const makeGetMembersByRegister = () => {
    return createSelector(
        [getRegisterId, getMembers],
        (registerId, members) => {
            return _.filter(members, ['registerId', registerId])
        }
    );
};

export const makeGetUsersByRegister = () => {
    return createSelector(
        [makeGetMembersByRegister(), getUsers],
        (members, users) => {
            return _.map(members, (member) => ( _.assign(users[member.user], {role: member.role})))
        }
    );
};

export const makeGetCardsByTags = () => {
    return createSelector(
        [makeGetCardsByRegister(), getSelectedTags],
        (cards, selectedTags) => {
            if(selectedTags === undefined || selectedTags.length === 0) {
                return cards;
            } else {
                return _.filter(cards, function(c) { return _.intersectionWith(c.tags, selectedTags).length > 0});
            }
        }
    );
};

export const makeGetCardIdsByTags = () => {
    return createSelector(
        [makeGetCardsByTags()],
        (cards) => {
            return _.map(cards, 'id');
        }
    );
};

export const makeGetNextCard = () => {
    return createSelector(
        [makeGetCardsByTags(), getAnsweredCardsIds],
        (cards, answeredIds) => {
            let unAnsweredCards = _.filter(cards, function(c) { return !_.includes(answeredIds, c.id)});
            if(unAnsweredCards.length > 0) {
                return unAnsweredCards[0];
            } else {
                return null;
            }
        }
    );
};

export const makeGetNextCardForPowerMode = () => {
    return createSelector(
        [makeGetCardsByTags(), getAnsweredCardsIds, getAnsweredCards],
        (cards, answeredIds, answeredCards) => {
            let unAnsweredCards = _.filter(cards, function(c) { return (!_.includes(answeredIds, c.id)
                ||(_.includes(answeredIds, c.id)&&answeredCards[c.id].correct !== true))});
            if(unAnsweredCards.length > 0) {
                return unAnsweredCards[0];
            } else {
                return null;
            }
        }
    );
};

/*
 * GetNextUnaswerdCard
 */