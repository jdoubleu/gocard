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