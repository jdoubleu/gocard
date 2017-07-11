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
    GET_USER_SUCCESS
} from "../actions/registers";
import _ from "lodash";

const initialState = {
    isFetching: false,
    registers: {},
    selectedTags: {},
    selectedMode: {},
    users: {}
};

function registers(state = initialState, action) {
    switch (action.type) {
        case REGISTERS_REQUEST:
        case ADD_REGISTER_REQUEST:
        case GET_USER_REQUEST:
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
        case STORE_SELECTEDMODE:
            let newMode = state.selectedMode || {};
            newMode[action.registerId] =[
                action.selectedMode
            ];
            return {
                ...state,
                selectedMode: newMode
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
        default:
            return state;
    }
}

export default registers;
