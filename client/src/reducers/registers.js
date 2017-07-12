import {
    ADD_REGISTER_FAILURE,
    ADD_REGISTER_REQUEST,
    ADD_REGISTER_SUCCESS,
    REGISTERS_FAILURE,
    REGISTERS_REQUEST,
    REGISTERS_SUCCESS,
    STORE_SELECTEDTAGS,
    STORE_SELECTEDMODE,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    MEMBERS_SUCCESS,
    MEMBERS_REQUEST,
    MEMBERS_FAILURE
} from "../actions/registers";
import _ from "lodash";

const initialState = {
    isFetching: false,
    registers: {},
    selectedTags: {},
    users: {},
    members: {}
};

function registers(state = initialState, action) {
    switch (action.type) {
        case REGISTERS_REQUEST:
        case ADD_REGISTER_REQUEST:
        case GET_USER_REQUEST:
        case MEMBERS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case REGISTERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                registers: {
                    ...state.registers,
                    ..._.keyBy({...action.registers}, 'uid')
                }
            };
        case REGISTERS_FAILURE:
        case ADD_REGISTER_FAILURE:
        case GET_USER_FAILURE:
        case MEMBERS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.errorMessage
            };
        case ADD_REGISTER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                registers: {
                    ...state.registers,
                    ..._.keyBy({...action.register}, action.register.uid)
                }
            };
        case STORE_SELECTEDTAGS:
            let newTags = state.selectedTags || {};
            newTags[action.registerId] = [
                ...action.selectedTags
            ];
            return {
                ...state,
                selectedTags: newTags
            };
        case GET_USER_SUCCESS:
            let newUser = state.users || {};
            newUser[action.registerId] =[
                ...state.users, action.user
            ];
            return {
                ...state,
                users: newUser
            };
        case MEMBERS_SUCCESS:
            let newMembers = state.members || {};
            newMembers[action.registerId] =[
                ...action.members
            ];
            return {
                ...state,
                isFetching: false,
                members: newMembers
            };
        default:
            return state;
    }
}

export default registers;
