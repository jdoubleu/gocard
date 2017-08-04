import {combineReducers} from "redux";
import inputMemberFields from "./inputMembersField";
import learning from "./learning";
import learnSettings from "./learnSettings";

export default combineReducers({inputMemberFields, learning, learnSettings});