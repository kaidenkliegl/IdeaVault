import { setTags, setTag, addTag, updateTag, deleteTag } from "./tagsActions";

// GET all tags for user
export const getTagsThunk = () => async (dispatch) => {
    const res = await fetch("/api/tags/", {
        credentials: "include"
    });
    if (!res.ok) throw res;
    const data = await res.json();
    //data.tagss is an array
    dispatch(setTags(data.tags));
};

// GET a single tag by ID (for tag details page/form)
export const getTagThunk = (tagId) => async (dispatch) => {
    const res = await fetch(`/api/tags/${tagId}`, {
        credentials: "include"
    });
    if (!res.ok) throw res;
    const data = await res.json();
    dispatch(setTag(data.tag)); // data.tag should be a single tag object
};


// create a new tag
export const createNewTagThunk = (tagInfo) => async (dispatch) => {

    // Check if tagInfo is valid
    try {
        const res = await fetch("/api/tags/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tagInfo),
            credentials: "include",
        });

        // Check if the response is ok
        if (!res.ok) {
            if (res.status === 401) {
                alert("You must be logged in to create tags.");
                return { error: "Unauthorized" };
            }
            // Try to parse error response
            let errorData;
            try {
                errorData = await res.json();
            } catch {
                errorData = { error: "Unknown error" };
            }
            return errorData;
        }

        const data = await res.json();

        dispatch(addTag(data.tag));
        return data;
    } catch (err) {
        console.error("Tag creation failed:", err);
        return { error: "Network or server error" };
    }
}

// update an existing tag
export const updateTagThunk = (tagId, tagInfo) => async (dispatch) => {
    const res = await fetch(`/api/tags/${tagId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tagInfo),
        credentials: "include" // Make sure cookies are sent!
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
        credentials: "include" // Make sure cookies are sent!
    });
    if (!res.ok) throw res;
    const data = await res.json();
    dispatch(deleteTag(tagId)); // tagId is the ID of the deleted tag
    return data; // return any additional data if needed
}