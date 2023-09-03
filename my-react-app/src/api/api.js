import {
  createCommentDB,
  getCommentsDB,
  deleteCommentDB,
  updateCommentDB,
} from ".";
import { v4 as uuidv4 } from "uuid";

let fetchedComments = [];

const fetchComments = async (animeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (fetchedComments.length === 0) {
        fetchedComments = await getCommentsDB(animeId);
      } else {

        const updatedComments = await getCommentsDB(animeId);
        fetchedComments = updatedComments;
      }
      resolve(fetchedComments);
    } catch (error) {
      reject(error);
    }
  });
};

export const getComments = async (animeId) => {
  if (fetchedComments.length === 0) {
    await fetchComments(animeId);
  }

  const animeComments = fetchedComments.find(
    (comment) => comment.animeId === animeId
  );

  if (animeComments) {
    return animeComments.comments;
  } else {
    return [];
  }
};

export const createComment = async (newComment, AnimeId, addCommentToState) => {
  const uniqueKey = uuidv4();

  if (fetchedComments.length === 0) {
    await fetchComments(AnimeId);
  }

  const anime = fetchedComments.find((a) => a.animeId === AnimeId);

  if (!anime) {
    throw new Error(`Anime with ID ${AnimeId} not found.`);
  }

  const rating = newComment.rating;

  if (newComment.username === "") {
    newComment.username = "(Anonymous)";
  }

  const addCommentToDb = {
    _id: uniqueKey,
    ...newComment,
    rating,
  };

  try {
    const savedComment = await createCommentDB(AnimeId, addCommentToDb);
    console.log("create comment to DB Successful");

    const commentsData = await fetchComments(AnimeId); // Wait for fetching to complete
    console.log("Fetched Comments:", commentsData);
    const updatedComments = await getComments(AnimeId);
    const lastComment = updatedComments[updatedComments.length - 1];
    console.log("Last Comment ID:", lastComment._id);

    const comment = {
      _id: lastComment._id,
      ...newComment,
      rating,
    };

    anime.comments.push(comment);

    // If you have a function to update the state of your component with the new comment, call it here
    if (addCommentToState) {
      addCommentToState(comment);

      console.log(addCommentToState(comment));
    }

    return savedComment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

//update
export const updateComment = async (AnimeId, commentId, updatedComment) => {
  console.log("AnimeId : " + AnimeId);
  console.log("commentId : " + commentId);

  if (fetchedComments.length === 0) {
    await fetchComments(AnimeId);
  }

  const anime = fetchedComments.find((a) => a.animeId === AnimeId);

  if (!anime) {
    throw new Error(`Anime with ID ${AnimeId} not found.`);
  }

  const existingComment = anime.comments.find((c) => c._id === commentId);

  if (!existingComment) {
    throw new Error(`Comment with ID ${commentId} not found.`);
  }

  try {
    const updatedCommentData = await updateCommentDB(
      AnimeId,
      commentId,
      updatedComment
    );
    console.log("update comment to DB Successful");
    console.log("updatedCommentData : ", updatedCommentData);

    // Update the comment data in the fetchedComments array using the unique key
    const updatedIndex = anime.comments.findIndex((c) => c._id === commentId);
    anime.comments[updatedIndex] = {
      ...updatedCommentData,
    };

    return updatedCommentData;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};


export const deleteComment = async (AnimeId, commentId) => {
  if (fetchedComments.length === 0) {
    await fetchComments(AnimeId);
  }

  const anime = fetchedComments.find((a) => a.animeId === AnimeId);

  if (!anime) {
    throw new Error(`Anime with ID ${AnimeId} not found.`);
  }

  const existingComment = anime.comments.find((c) => c._id === commentId);

  if (!existingComment) {
    throw new Error(`Comment with ID ${commentId} not found.`);
  }

  try {
    console.log("Before comment deletion:", fetchedComments);

    const deletedCommentData = await deleteCommentDB(AnimeId, commentId);
    console.log("delete comment from DB Successful");
    console.log(deletedCommentData);

    // Remove the deleted comment from the fetchedComments array
    anime.comments = anime.comments.filter((c) => c._id !== commentId);

    console.log("After comment deletion:", fetchedComments);

    return deletedCommentData;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
