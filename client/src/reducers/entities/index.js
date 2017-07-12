import users from "./users";
import registers from "./registers";
import members from "./members";
import cards from "./cards";
import {combineReducers} from "redux";

export default combineReducers({users, registers, members, cards});