import React, { useEffect, useState } from "react";
import {
  getComments as getCommentApi,
  deleteComment,
  updateComment,
} from "../api/api";
import BeautyStars from "beauty-stars";

const Comments = ({ animeId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [editModeCommentId, setEditModeCommentId] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState("");

  useEffect(() => {
    getCommentApi(animeId).then((data) => {
      setBackendComments(data);
    });
  }, [animeId]);

  // when click the edit button
  const handleEditIconClick = (comment) => {
    if (editModeCommentId === comment._id) {
      // If already in edit mode for this comment, exit edit mode
      setEditModeCommentId(null);
      setUpdatedDescription(""); // Clear updated description when exiting edit mode
    } else {
      // If not in edit mode, enter edit mode for this comment
      setEditModeCommentId(comment._id);
      setUpdatedDescription(comment.description); // Initialize updated description when entering edit mode
    }
  };

  // when click the trash button
  const handleTrashIconClick = async (comment) => {
    try {
      await deleteComment(animeId, comment._id);
      console.log("Comment deleted:", comment);

      // Fetch comments again to get the updated data
      const updatedComments = await getCommentApi(animeId);

      // Update the backendComments state with the new data
      setBackendComments(updatedComments);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleCancelEditClick = () => {
    setEditModeCommentId(null); // Reset to null when canceling the edit
    setUpdatedDescription(""); // Clear the updated description
  };

  const handleSaveEditClick = async (editedComment) => {
    try {
      // Update the comment using the updateComment function
      const updatedCommentData = await updateComment(
        animeId,
        editedComment._id, 
        {
          username: editedComment.username,
          description: updatedDescription,
          rating: editedComment.rating,
          _id: editedComment._id,
        }
      );
  
      // Access the commentId and updatedComment properties directly
      const commentId = updatedCommentData.commentId;
      const updatedComment = updatedCommentData.updatedComment;
  
      console.log("commentId *:", commentId);
      console.log("updatedComment:", updatedComment);
  
      // Fetch comments again to get the updated data
      const updatedComments = await getCommentApi(animeId);
      setBackendComments([...updatedComments]);
      // Update the backendComments state with the new data
      setBackendComments(updatedComments);
  
      // Reset edit mode and clear the updated description
      setEditModeCommentId(null);
      setUpdatedDescription("");
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };
  

  return (
    <div className="container--review">
      <div className="heading">
        <h1>Reviews</h1>
        <p>({backendComments.length})</p>
      </div>

      {backendComments.map((comment, index) => (
        <div
          key={comment._id} // Add key prop with the unique identifier
          className={`container--review--box ${
            editModeCommentId === comment._id ? "edit-mode" : ""
          }`}
        >
          <div className="topBox">
            <div className="name">
              <h3>Name</h3>
              <p>: {comment.username}</p>
            </div>

            <div className="icon">
              <i
                className="fa-solid fa-pen-to-square"
                onClick={() => handleEditIconClick(comment)}
              ></i>
              <i
                className="fas fa-trash"
                onClick={() => handleTrashIconClick(comment)}
              ></i>
            </div>
          </div>

          {editModeCommentId === comment._id ? (
            // Edit mode view
            <div className="edit-mode">
              <div className="edit-fields">
                <textarea
                  className="edit-comment"
                  placeholder="Edit Comment..."
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)} // Update the state on change
                ></textarea>
              </div>
              <div className="edit-buttons">
                <button
                  className="cancel-button"
                  onClick={() => handleCancelEditClick(comment)}
                >
                  Cancel
                </button>
                <button
                  className="save-button"
                  onClick={() => handleSaveEditClick(comment)}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            // Regular comment view
            <div className="comment">
              <p>{comment.description}</p>
            </div>
          )}

          <div className="rating">
            <h3>Rating</h3>
            <div className="rating-star">
              <BeautyStars
                value={comment.rating}
                activeColor="#f7a6b9"
                inactiveColor="#C0C0C0"
                size={24}
                style={{ cursor: "default" }}
              />
            </div>
          </div>
          <div className="count">
            <p>#{index + 1}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
