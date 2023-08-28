import React, { useState } from "react";
import Comments from "./comment-review/Comments"; // Assuming this is the correct path
import CommentForm from "./comment-review/CommentForm"; // Import CommentForm
import Slide from "./comment-review/slide/Slide";
import GenreList from "./comment-review/GenreList"

const App = () => {
    const [backendComments, setBackendComments] = useState([]);

    const addCommentToState = (newComment) => {
        setBackendComments(prevComments => [...prevComments, newComment]);
    };

    return (
        <>
            <GenreList></GenreList>
            <Slide />
            <div>
                <Comments backendComments={backendComments} />
                <CommentForm addCommentToState={addCommentToState} />
            </div>
        </>
    );
};

export default App;
