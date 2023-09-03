const BASE_URL = "http://localhost:3001/api";

//get all comment by anime id
export const getCommentsDB = async (animeId) => {
  try {
    const response = await fetch(`${BASE_URL}/${animeId}/comments`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export const createCommentDB = async (animeId, newComment) => {
  try {
    const response = await fetch(`${BASE_URL}/${animeId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });

    const data = await response.json();
    console.log("Response data from the server:", data);

    // Instead of calling getComments() here, just return the new comment data
    return data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}



//edit comment depend on comment id
export const updateCommentDB = async (animeId, commentId, updatedComment) => {
  const response = await fetch(`${BASE_URL}/${animeId}/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedComment),
  });

  await response.json();
  return updatedComment;
};

//delete comment depend on comment id
export const deleteCommentDB = async (animeId, commentId) => {
  const response = await fetch(`${BASE_URL}/${animeId}/comments/${commentId}`, {
    method: "DELETE",
  });

  const data = await response.json();
  return data;
};