import React, { useState } from "react";
import BeautyStars from "beauty-stars";
import { createComment } from "../api/api"; // Import your createComment function

//post comment 
const CommentForm = ({ animeId , addCommentToState }) => {
  
  const [commentData, setCommentData] = useState({
    username: "",
    description: "",
    rating: 0,
  });

  const handlePostComment = async (animeId) => {
    const newComment = {
      ...commentData,
    };
  
    try {
      //create comment
      const response = await createComment(newComment, animeId);
      console.log("Comment posted successfully:");
  
      // Update parent (SLIDE) component's state with the new comment
      addCommentToState(response); 
  
      // Reset the form after posting
      setCommentData({
        username: "",
        description: "",
        rating: 0,
      });
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };
  
  return (
    <div className="container--comment">
      <h1>Comment</h1>
      <div className="container--comment--box">
        <div className="typename">
          <input
            type="text"
            placeholder="Type name..."
            value={commentData.username}
            onChange={(e) =>
              setCommentData({ ...commentData, username: e.target.value })
            }
          />
        </div>
        <div className="typecomment">
          <textarea
            value={commentData.description}
            onChange={(e) =>
              setCommentData({ ...commentData, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="rating">
          <h3>Rating</h3>
          <div className="rating-star">
            <BeautyStars
              value={commentData.rating}
              onChange={(rating) => setCommentData({ ...commentData, rating })}
              activeColor="#f7a6b9"
              inactiveColor="#C0C0C0"
              size={30}
            />
          </div>
        </div>
        <div className="button">
          <button
            type="button"
            onClick={() => handlePostComment(animeId)}
          >
            POST
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;