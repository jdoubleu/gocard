import moment from "moment";
import _ from "lodash";

/**
 * Calculates the initial letters for a given displayName of a user
 */
export function getInitials(displayName) {
    if (!displayName)
        return "";

    // Split name by space
    let splittedName = displayName.split(" ", 2);
    if (splittedName.length === 1) {
        return splittedName[0].substring(0, 2).toUpperCase();
    } else {
        return splittedName[0].substring(0, 1).toUpperCase() + splittedName[1].substring(0, 1).toUpperCase();
    }
}

/**
 * Calculates which case to chose by a given score object.
 */
export function calculateScoreType(score, case1, case2, case3, nullCase) {
    if (score.value === null) {
        return nullCase;
    }
    return score.value < 3 ? case1 : score.value < 6 ? case2 : case3;
}

/**
 * Calculates if an object needs to be loaded again or if it is valid.
 */
export function isStateInvalidated(state) {
    if (_.isEmpty(state))
        return true;
    return moment().isAfter(moment(state.invalidate))
}
/**
 * Calculates if an object needs to be loaded again or if it is valid.
 */
export function areStatesInvalidated(state) {
    if (_.isEmpty(state))
        return true;

    return _.filter(state, (value) => {
        return isStateInvalidated(value);
    }).length > 0;
}

