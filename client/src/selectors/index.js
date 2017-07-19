import {createSelector} from 'reselect'
import _ from "lodash";

const getRegisterId = (state, props) => props.registerId;
const getCards = (state) => state.entities.cards.byId;
const getUserId = (state) => state.auth.userId;
const getMembers = (state) => state.entities.members.byId;
const getKeyword = (state, props) => props.keyword;
const getUsers = (state) => state.entities.users.byId;

export const getCardsByRegister = createSelector(
    [getRegisterId, getCards],
    (registerId, cards) => {
        return _.filter(cards, (card) => (card.registerId === registerId));
    }
);

export const getRegisterIds = createSelector(
    [getUserId, getMembers],
    (userId, members) => {
        return _.map(_.filter(members, ['userId', userId]), 'registerId');
    }
);

export const getTagsByRegister = createSelector(
    [getCardsByRegister],
    (cards) => {
        return _.uniq(_.flatMap(cards, 'tags'));
    }
);

export const getTagsByRegisterByKeyword = createSelector(
    [getTagsByRegister, getKeyword],
    (tags, keyword) => {
        return _.filter(tags, _.method('includes', keyword));
    }
);

export const getMembersByRegister = createSelector(
    [getRegisterId, getMembers],
    (registerId, members) => {
        return _.filter(members, ['registerId', registerId])
    }
);

export const getUsersByRegister = createSelector(
    [getMembersByRegister, getUsers],
    (members, users) => {
        return _.map(members, (member) => ( _.assign(users[member.userId], {role: member.role})))
    }
);
/*
*:TODO
* 1.GetRegistersId -> Dashboard für angemeldeten User
* 2.GetCardsByRegister -> Detailansicht für Tags und PreviewCards || Filterung nach RegId und selectedTags
* 3.GetTagsByRegister -> Detailansicht für Tags und für addTags
* 4.GetMembersByRegister -> Detailansicht alle member eines register laden
* 5.GetStatsByRegister -> Dashboard auslesen das Stats aus den Karten pro Register für jedes Register
*
*
* */