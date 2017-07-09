import {REGISTERS_FAILURE, REGISTERS_REQUEST, REGISTERS_SUCCESS} from "../actions/registers";

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
        default:
            return state;
    }
}

export default registers;
