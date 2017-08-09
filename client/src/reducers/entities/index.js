import users from "./users";
import registers from "./registers";
import members from "./members";
import cards from "./cards";
import score from "./score";
import {combineReducers} from "redux";

/**
 * Reducer combines all related models under entities
 */

export default combineReducers({users, registers, members, cards, score});