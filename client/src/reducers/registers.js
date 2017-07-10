import {
    ADD_REGISTER_FAILURE,
    ADD_REGISTER_REQUEST,
    ADD_REGISTER_SUCCESS,
    REGISTERS_FAILURE,
    REGISTERS_REQUEST,
    REGISTERS_SUCCESS,
    STORE_SELECTEDTAGS
} from "../actions/registers";
import _ from "lodash";

const initialState = {
    isFetching: false,
    registers: {},
    selectedTags: {}
};

function registers(state = initialState, action) {
    switch (action.type) {
        case REGISTERS_REQUEST:
        case ADD_REGISTER_REQUEST:
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
        default:
            return state;
    }
}

export default registers;
