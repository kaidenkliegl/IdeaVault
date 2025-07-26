import React from "react";
import { useDispatch } from "react-redux";
import { deleteTagThunk } from "../../redux/tags";

// This component renders a button to delete a tag
const DeleteTagButton = ({ tagId }) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this tag?")) {
            try {
                await dispatch(deleteTagThunk(tagId)).unwrap();
                // Optionally, you can redirect or show a success message here
            } catch (err) {
                console.error("Failed to delete tag:", err);
                alert("Error deleting tag. Please try again.");
            }
        }
    };

    return (
        <button onClick={handleDelete} className="delete-tag-button">
            Delete Tag
        </button>
    );
}