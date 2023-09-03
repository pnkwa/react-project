const Comment = require("../models/commentModel");

//get all comments
const getComments = async (req, res) => {
  const { animeId } = req.params;

  try {
    const comments = await Comment.find({ animeId });

    if (comments.length === 0) {
      res.status(404).json({ message: "No comments found for this anime" });
      return;
    }

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving comments" });
  }
};

//get comment by id
const getCommentById = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findOne({ "comments._id": commentId });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Find the specific comment within the comments array
    const foundComment = comment.comments.find(
      (c) => c._id.toString() === commentId
    );

    if (!foundComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json(foundComment);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving comment" });
  }
};

//create comment
const createComment = async (req, res) => {
  const { animeId } = req.params;
  const { username, description, rating } = req.body;

  try {
    const updatedAnime = await Comment.findOneAndUpdate(
      { animeId },
      {
        $push: {
          comments: {
            username,
            description,
            rating,
          },
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedAnime) {
      return res.status(404).json({ error: "Anime not found" });
    }

    res.status(201).json(updatedAnime);
  } catch (error) {
    res.status(500).json({ error: "Error adding comment" });
  }
};

//update comment
const updateComment = async (req, res) => {
  const { animeId, commentId } = req.params;
  const { username, description, rating } = req.body;

  try {
    const comment = await Comment.findOneAndUpdate(
      { animeId, "comments._id": commentId },
      {
        $set: {
          "comments.$.username": username,
          "comments.$.description": description,
          "comments.$.rating": rating,
        },

      },
      { new: true } // Return the updated document
    );
    
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error updating comment" });
  }
};


//delete comment
const deleteComment = async (req, res) => {
  const { animeId, commentId } = req.params;

  try {
    const updatedAnime = await Comment.findOneAndUpdate(
      { animeId },
      {
        $pull: {
          comments: { _id: commentId },
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedAnime) {
      return res.status(404).json({ error: "Anime not found" });
    }

    res.status(200).json(updatedAnime);
  } catch (error) {
    res.status(500).json({ error: "Error deleting comment" });
  }
};

module.exports = {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
