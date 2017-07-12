import {
    ADD_REGISTER_FAILURE,
    ADD_REGISTER_REQUEST,
    ADD_REGISTER_SUCCESS,
    DELETE_REGISTER_FAILURE,
    DELETE_REGISTER_REQUEST,
    DELETE_REGISTER_SUCCESS,
    LOAD_REGISTERS_FAILURE,
    LOAD_REGISTERS_REQUEST,
    LOAD_REGISTERS_SUCCESS
} from "../actions/register";
import _ from "lodash";

const initialState = {
    isFetching: false,
    items: {},
    selectedMode: {},
    selectedTags: {}
};

function registers(state = initialState, action) {
    switch (action.type) {
        case LOAD_REGISTERS_REQUEST:
        case DELETE_REGISTER_REQUEST:
        case ADD_REGISTER_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case LOAD_REGISTERS_FAILURE:
        case ADD_REGISTER_FAILURE:
        case DELETE_REGISTER_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case LOAD_REGISTERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: _.keyBy(action.response, 'uid')
            };
        case ADD_REGISTER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: _.merge(
                    state.items,
                    _.keyBy(
                        action.response,
                        'uid'
                    )
                )
            };
        case DELETE_REGISTER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: _.omit(state.items, action.registerId)
            };
        default:
            return state;
    }
}

export default registers;
