export const ADD_SELECTED_TAG = 'ADD_SELECTED_TAG';
export const DELETE_SELECTED_TAG = 'DELETE_SELECTED_TAG';

export function addSelectedTag(registerId, tag){
    return {
        type: ADD_SELECTED_TAG,
        registerId,
        tag
    }
}

export function deleteSelectedTag(registerId, tag){
    return {
        type: DELETE_SELECTED_TAG,
        registerId,
        tag
    }
}