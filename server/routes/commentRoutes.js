const express = require("express");
const router = express.Router();
const {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController"); // Update the import statement

router.route("/:animeId/comments").get(getComments).post(createComment);

router
  .route("/:animeId/comments/:commentId")
  .get(getCommentById)
  .put(updateComment)
  .delete(deleteComment);

module.exports = router;
