import {createSelector} from 'reselect'
import _ from "lodash";
import {calculateScoreType} from "../utils/index";

const getRegisterId = (state, props) => props.registerId ? props.registerId : _.parseInt(props.match.params.registerId);

const getRegisters = (state) => state.entities.registers.byId;
const getCards = (state) => state.entities.cards.byId;
const getUserId = (state) => state.auth.userId;
const getMembers = (state) => state.entities.members.byId;
const getKeyword = (state, props) => props.keyword;
const getUsers = (state) => state.entities.users.byId;
const getSelectedTags = (state, props) => state.ui.learnSettings.byId[getRegisterId(state, props)].tags;
const getAnsweredCardsIds = (state) => state.ui.learning.allIds || [];
const getAnsweredCards = (state) => state.ui.learning.byId || {};
const getAllScores = (state) => state.entities.score.byId || {};
const getMode = (state) => state.ui.learning.misc.mode;

export const makeGetRegisterById = () => {
    return createSelector(
        [getRegisterId, getRegisters, makeGetMembersByRegister()],
        (registerId, registers, membersByRegister) => {
            return _.assign(registers[registerId], {members: membersByRegister});
        }
    )
};

export const makeGetCardsByRegister = () => {
    return createSelector(
        [getRegisterId, getCards],
        (registerId, cards) => {
            return _.filter(cards, {'register': registerId});
        }
    )
};

export const makeGetCardIdsByRegister = () => {
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

export const makeGetRoleByRegister = () => {
    return createSelector(
        [makeGetMembershipByRegister()],
        (membership) => {
            return membership.role;
        }
    );
};

export const makeGetMembershipByRegister = () => {
    return createSelector(
        [getUserId, getMembers, getRegisterId],
        (userId, members, registerId) => {
            return _.toArray(_.filter(members, {'user': userId, 'register': registerId}))[0] || {};
        }
    );
};

export const makeGetTagsByRegister = () => {
    return createSelector(
        [makeGetCardsByRegister()],
        (cards) => {
            return _.uniq(_.compact(_.flatMap(cards, 'tags'))) || [];
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
            return _.filter(members, ['register', registerId])
        }
    );
};

export const makeGetUsersByRegister = () => {
    return createSelector(
        [makeGetMembersByRegister(), getUsers],
        (members, users) => {
            return _.without(_.map(members, (member) => {
                return users[member.user]
            }), undefined);
        }
    );
};

export const makeGetCardsByTags = () => {
    return createSelector(
        [makeGetCardsByRegister(), getSelectedTags, makeGetScoreByUser(), getMode],
        (cards, selectedTags, allScores, mode) => {
            const cardsByMode = _.filter(cards, (o) => {
                const filteredScores = _.filter(allScores, {'card': o.id});
                const lastScore = _.maxBy(filteredScores, 'id') || {value: 0};
                return mode === 'POWER_MODE' ? _.parseInt(lastScore.value) < 6 : true;
            });
            if (selectedTags === undefined || selectedTags.length === 0) {
                return cardsByMode;
            } else {
                return _.filter(cardsByMode, function (c) {
                    return _.intersectionWith(c.tags, selectedTags).length > 0
                });
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
        [makeGetCardsByTags(), getAnsweredCardsIds, getAnsweredCards, getMode],
        (cards, answeredIds, answeredCards, mode) => {
            let unAnsweredCards = _.filter(cards, function (c) {
                if (mode !== 'POWER_MODE') {
                    return !_.includes(answeredIds, c.id)
                }

                return (!_.includes(answeredIds, c.id)
                    || (_.includes(answeredIds, c.id) && answeredCards[c.id].correct !== true))
            });
            unAnsweredCards = _.sortBy(unAnsweredCards, (o) => {
                return !((answeredCards[o.id] || {correct: true}).correct);
            });
            if (unAnsweredCards.length > 0) {
                return unAnsweredCards[0];
            } else {
                return null;
            }
        }
    );
};

export const makeGetCardsForResults = () => {
    return createSelector(
        [makeGetCardsByTags(), getAnsweredCardsIds],
        (cards, answeredIds) => {
            let Cards = _.filter(cards, function (c) {
                return _.includes(answeredIds, c.id)
            });
            if (Cards.length > 0) {
                return Cards;
            } else {
                return null;
            }
        }
    );
};


export const makeGetScoreByUser = () => {
    return createSelector(
        [getAllScores, getUserId],
        (scores, user) => {
            let scoresByUser = _.filter(scores, function (s) {
                return s.user === user
            });
            if (scoresByUser.length > 0) {
                return scoresByUser;
            } else {
                return null;
            }
        }
    );
};

export const makeGetCorrectCardsForResults = () => {
    return createSelector(
        [makeGetCardsByTags(), getAnsweredCardsIds, getAnsweredCards],
        (cards, answeredIds, answeredCards) => {
            let Cards = _.filter(cards, function (c) {
                return (_.includes(answeredIds, c.id) && answeredCards[c.id].correct === true)
            });
            if (Cards.length > 0) {
                return Cards;
            } else {
                return null;
            }

        }
    );
};


export const makeGetScoreForCurrentCard = () => {
    return createSelector(
        [makeGetScoreByUser(), makeGetNextCard()],
        (scores, card) => {
            let scoresForCurrentCard = _.filter(scores, function (s) {
                if (card !== null) {
                    return s.card === card.id
                }
            });
            if (scoresForCurrentCard.length > 0) {
                return scoresForCurrentCard;
            } else {
                return null;
            }
        }
    );
};

export const makeGetWrongCardsForResults = () => {
    return createSelector(
        [makeGetCardsByTags(), getAnsweredCardsIds, getAnsweredCards],
        (cards, answeredIds, answeredCards) => {
            let Cards = _.filter(cards, function (c) {
                return (_.includes(answeredIds, c.id) && answeredCards[c.id].correct === false)
            });
            if (Cards.length > 0) {
                return Cards;
            } else {
                return null;
            }
        }
    );
};


export const makeGetLastScoreForCurrentCard = () => {
    return createSelector(
        [makeGetScoreForCurrentCard()],
        (scores) => {
            return _.maxBy(scores, 'id');
        }
    );
};

export const makeGetSkippedCardsForResults = () => {
    return createSelector(
        [makeGetCardsByTags(), getAnsweredCardsIds, getAnsweredCards],
        (cards, answeredIds, answeredCards) => {
            let Cards = _.filter(cards, function (c) {
                return (_.includes(answeredIds, c.id) && answeredCards[c.id].correct === null)
            });
            if (Cards.length > 0) {
                return Cards;
            } else {
                return null;
            }
        }
    );
};

export const makeGetSizeOfResults = () => {
    return createSelector(
        [getAnsweredCards, getAnsweredCardsIds, getMode],
        (cards, answeredIds, mode) => {
            if (mode !== 'POWER_MODE') {
                return answeredIds.length;
            } else {
                return _.size(_.filter(cards, ['correct', true]));
            }
        }
    );
};

export const makeGetLastScoresByAnsweredCardIds = () => {
    return createSelector(
        [getAnsweredCardsIds, makeGetScoreByUser()],
        (cardIds, scores) => {
            let lastScores = _.map(cardIds, (cardId) => {
                let filteredScore = _.filter(scores, {'card': cardId});
                return _.maxBy(filteredScore, 'id') || {card: cardId, value: null}
            });
            return _.keyBy(lastScores, 'card');
        }
    );
};

export const makeGetValueArrayByAnsweredCardIds = () => {
    return createSelector(
        [getAnsweredCardsIds, makeGetScoreByUser()],
        (cardIds, scores) => {
            let lastScores = _.map(cardIds, (cardId) => {
                let filteredScore = _.filter(scores, {'card': cardId});
                return _.maxBy(filteredScore, 'id') || {card: cardId, value: null}
            });
            return _.groupBy(lastScores, (o) => {
                return calculateScoreType(o, 'bad', 'middle', 'good', 'unanswered');
            }) || {};
        }
    );
};

export const makeGetValueArrayByRegister = () => {
    return createSelector(
        [makeGetCardIdsByRegister(), makeGetScoreByUser()],
        (cardIds, scores) => {
            let lastScores = _.map(cardIds, (cardId) =>
                _.maxBy(_.filter(scores, {'card': cardId}), 'id') || {value: null}
            );
            return _.groupBy(lastScores, (o) => {
                return calculateScoreType(o, 'bad', 'middle', 'good', 'unanswered');
            }) || {};
        }
    );
};

export const makeGetCardsByResults = () => {
    return createSelector(
        [getCards, getAnsweredCardsIds],
        (cards, answeredCardIds) => {
            return _.filter(cards, function(c) { return _.includes(answeredCardIds, c.id)});
        }
    );
};
