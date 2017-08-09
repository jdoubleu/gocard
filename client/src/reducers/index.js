import auth from "./auth";
import entities from "./entities";
import ui from "./ui";
import {reducer as form} from "redux-form";

/**
 * Main Reducer combines all sub reducers (entities, ui, auth).
 */

export default {auth, entities, ui, form};