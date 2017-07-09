import {
    ADD_REGISTER_FAILURE,
    ADD_REGISTER_REQUEST,
    ADD_REGISTER_SUCCESS,
    REGISTERS_FAILURE,
    REGISTERS_REQUEST,
    REGISTERS_SUCCESS
} from "../actions/registers";

const initialState = {
    isFetching: false,
    registers: []
};

function registers(state = initialState, action) {
    switch (action.type) {
        case REGISTERS_REQUEST:
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
            return {
                ...state,
                isFetching: false,
                errorMessage: action.errorMessage
            };
        case ADD_REGISTER_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case ADD_REGISTER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                registers: state.registers.registers.concat([action.register])
            };
        case ADD_REGISTER_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.errorMessage
            };
        default:
            return state;
    }
}

export default registers;
