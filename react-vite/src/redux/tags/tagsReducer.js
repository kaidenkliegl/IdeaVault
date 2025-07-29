import { SET_TAGS, SET_TAG, UPDATE_TAG, DELETE_TAG } from "./tagsActions";

const initialState = {
    byId: {},
    allIds: [],
};

export default function tagsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TAGS: {
            // action.payload is an ARRAY of tags
            const tagsById = {};
            const tagsIds = [];
            action.payload.forEach(tag => {
                tagsById[tag.id] = tag;
                tagsIds.push(tag.id);
            });
            return {
                byId: tagsById,
                allIds: tagsIds,
            };
        }
        case SET_TAG:
        case UPDATE_TAG: {
            // action.payload is a single tag object
            const tag = action.payload;
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [tag.id]: tag,
                },
                allIds: state.allIds.includes(tag.id)
                    ? state.allIds
                    : [...state.allIds, tag.id],
            };
        }
        case DELETE_TAG: {
            const tagId = action.payload;
            const nextById = { ...state.byId };
            delete nextById[tagId];
            return {
                ...state,
                byId: nextById,
                allIds: state.allIds.filter(id => id !== tagId),
            };
        }
        default:
            return state;
    }
}