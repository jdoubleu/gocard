import {createSelector} from 'reselect'
import _ from "lodash";

const getRegisterId = (state, props) => props.registerId ? props.registerId : _.parseInt(props.match.params.registerId);

const getRegisters = (state) => state.entities.registers.byId;
const getCards = (state) => state.entities.cards.byId;
const getUserId = (state) => state.auth.userId;
const getMembers = (state) => state.entities.members.byId;
const getKeyword = (state, props) => props.keyword;
const getUsers = (state) => state.entities.users.byId;


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
