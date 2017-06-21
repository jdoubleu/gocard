/**
 * Project's main config
 * Defines script paths, config params, etc.
 */
import path from "path";

/**
 * GoCardTeam.GoCardApi's public resources folder
 */
const extPublic = 'Packages/Application/GoCardTeam.GoCardApi/Resources/Public';

export const paths = {
    src: {
        app: path.resolve(__dirname, 'client/src/app')
    },
    dest: {
        app: path.resolve(__dirname, extPublic, 'app/')
    }
};