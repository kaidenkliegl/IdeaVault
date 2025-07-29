import { setTags, setTag, createTag, updateTag, deleteTag } from "./tagsActions";

// GET all tags for user
export const getTagsThunk = () => async (dispatch) => {
    const res = await fetch("/api/tags", {
        credentials: "include",
    });
    if (!res.ok) throw res;
    const data = await res.json();
    //data.tagss is an array
    dispatch(setTags(data.tags));
};

// GET a single tag by ID (for tag details page/form)
export const getTagThunk = (tagId) => async (dispatch) => {
    const res = await fetch(`/api/tags/${tagId}`);
    if (!res.ok) throw res;
    const data = await res.json();
    dispatch(setTag(data.tag)); // data.tag should be a single tag object
};


// create a new tag
export const createNewTagThunk = (tagInfo) => async (dispatch) => {
    const res = await fetch("/api/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tagInfo),
    });
    if (!res.ok) throw res;
    const data = await res.json();
    dispatch(createTag(data.tag));
    return data.tag;
};

// update an existing tag
export const updateTagThunk = (tagId, tagInfo) => async (dispatch) => {
    const res = await fetch(`/api/tags/${tagId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tagInfo),
    });
    if (!res.ok) throw res;
    const data = await res.json();
    dispatch(updateTag(data.tag));
    return data.tag;
}
// delete a tag by ID
export const deleteTagThunk = (tagId) => async (dispatch) => {
    const res = await fetch(`/api/tags/${tagId}`, {
        method: "DELETE",
    });
    if (!res.ok) throw res;
    const data = await res.json();
    dispatch(deleteTag(tagId)); // tagId is the ID of the deleted tag
    return data; // return any additional data if needed
}