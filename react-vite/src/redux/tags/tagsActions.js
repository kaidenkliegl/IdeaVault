
export const SET_TAGS = 'tags/setTags';
export const SET_TAG = 'tags/setTag';
export const ADD_TAG = 'tags/addTag';
export const UPDATE_TAG = 'tags/updateTag';
export const DELETE_TAG = 'tags/deleteTag';

// action creators 
export const setTags = (tags) => ({
    type: SET_TAGS,
    payload: tags,
});

export const setTag = (tag) => ({
    type: SET_TAG,
    payload: tag,
});

export const addTag = (tag) => ({
    type: ADD_TAG,
    payload: tag,
});

export const updateTag = (tag) => ({
    type: UPDATE_TAG,
    payload: tag,
});

export const deleteTag = (tagId) => ({
    type: DELETE_TAG,
    payload: tagId, // only delete the tagId
});

