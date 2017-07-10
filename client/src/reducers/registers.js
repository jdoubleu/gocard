import {
    ADD_REGISTER_FAILURE,
    ADD_REGISTER_REQUEST,
    ADD_REGISTER_SUCCESS,
    REGISTERS_FAILURE,
    REGISTERS_REQUEST,
    REGISTERS_SUCCESS,
    MEMBERS_SUCCESS,
    MEMBERS_REQUEST,
    MEMBERS_FAILURE
} from "../actions/registers";

const initialState = {
    isFetching: false,
    registers: []
};

function registers(state = initialState, action) {
    switch (action.type) {
        case REGISTERS_REQUEST:
        case ADD_REGISTER_REQUEST:
        case MEMBERS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case REGISTERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                registers: action.registers
            };
        case REGISTERS_FAILURE:
        case ADD_REGISTER_FAILURE:
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
                registers: state.registers.registers.concat([action.register])
            };
        case MEMBERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                users: [...state.users, action.users]
            };
        default:
            return state;
    }
}

export default registers;
