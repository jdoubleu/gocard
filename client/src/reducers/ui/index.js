import {combineReducers} from "redux";
import learning from "./learning";
import learnSettings from "./learnSettings";

/**
 * Reducer combines all temporary models, results for the ui.
 */

export default combineReducers({learning, learnSettings});
