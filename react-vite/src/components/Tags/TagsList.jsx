import { useSelector, useDispatch } from "react-redux";
import { getTagsThunk, deleteTagThunk } from "../../redux/tags/tagsThunk";
import { Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import "./Tags.css"; // Import your CSS for styling

const TagList = () => {
    const dispatch = useDispatch();
    // Get tags from Redux, normalized
    // const tags = useSelector((state) =>
    //     state.tags.allIds.map((id) => state.tags.byId[id])
    // );

    // Alternatively, use useMemo for performance optimization
    //get an array of tag objects for easier mapping
    const tagsState = useSelector((state) => state.tags);
    const tags = useMemo(
        () => tagsState.allIds.map(id => tagsState.byId[id]),
        [tagsState.allIds, tagsState.byId]
    );

    // on component mount, fetch tags
    useEffect(() => {
        dispatch(getTagsThunk());
    }, [dispatch]);

    // handlers for deleting a tag
    const handleDelete = async (tagId) => {
        const confirmed = window.confirm(
            "Are you sure you want to permanently delete this tag?"
        );
        if (!confirmed) return;

        // Try/catch so if something fails (network, backend error), user can see it.
        try {
            await dispatch(deleteTagThunk(tagId));
            // Optionally show a toast/message or simply let Redux update the UI.
        } catch (err) {
            alert("Failed to delete tag. Try again.");
        }
    };


    return (
        <div className="tag-list">
            <h2> Your Tags</h2>
            <ul>
                {/* If no tags, encourage user to create some */}
                {tags.length === 0 &&
                    <li>No tags found. Create a new tag to get started!</li>}
                {tags.map((tag) => (
                    <li key={tag.id}>

                        <span>{tag.name}</span>
                        <button
                            className="delete-tag-btn"
                            onClick={() => handleDelete(tag.id)}
                            style={{ color: "red", marginLeft: "10px" }}>
                            {/* Delete button */}
                            Delete
                        </button>

                        <Link to={`/tags/${tag.id}/edit`} className="edit-tag-btn">
                            Edit
                        </Link>
                    </li>
                ))}
            </ul>
            {/* Add new tag button at the bottom */}
            <Link to="/tags/new" className="add-tag-button">
                Add New Tag
            </Link>
        </div>
    );
};
export default TagList;
//Imports getTagsThunk  from your tagsThunk.js
//Renders Each tag as a list item, plus links to detail or edit views.
//Add a create button Link to Tag creation form.