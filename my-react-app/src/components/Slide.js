import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import BeautyStars from "beauty-stars";

export default function Slide() {
  const { id } = useParams();
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);
  const [anime, setAnime] = useState({
    title: "",
    image: "",
    synopsis: "",
    aired: "",
    rating: "",
    score: 0,
    status: "",
    episodes: 0,
    duration: "",
    season: "",
    genres: "",
    trailer: {},
  });

  const [backendComments, setBackendComments] = useState([]);

  const addCommentToState = (newComment) => {
    setBackendComments((prevComments) => [...prevComments, newComment]);
  };

  useEffect(() => {
    const fetchAnimeData = async () => {
      const apiUrl = `https://api.jikan.moe/v4/anime/${id}/full`;

      try {
        const response = await axios.get(apiUrl);
        const animeData = response.data.data;
        setAnime({
          title: animeData.title,
          image: animeData.images.jpg.large_image_url,
          synopsis: animeData.synopsis,
          aired: animeData.aired?.string,
          rating: animeData.rating,
          score: animeData.score,
          status: animeData.status,
          episodes: animeData.episodes,
          duration: animeData.duration,
          season: animeData.season,
          genres: animeData.genres.map((genre) => genre.name).join(", "),
          trailer: animeData.trailer,
        });
        console.log(animeData);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    fetchAnimeData();
  }, []);

  const accessDbId = "5114";

  console.log("tr: " + anime.trailer.youtube_id);

  // ตรวจสอบว่าควรแสดงวิดีโอตัวอย่างหรือไม่
  const shouldShowTrailer =
    anime.trailer && anime.trailer.youtube_id && !anime.trailer.error;

  if (error) {
    return <NotFound />;
  }
  const starsCount = Math.floor(anime.score / 2);
  return (
    <>
      <StyledSlide>
        {shouldShowTrailer && (
          <div className="trailer-container">
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}?autoplay=1&loop=1&playlist=${anime.trailer.youtube_id}`}
              title="Trailer Video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="container">
          <div className="container--anime">
            <div className="container--anime--image">
              <img src={anime.image} alt={anime.title} />
            </div>
            <div className="container--anime--details">
              <div className="title">
                <h1>{anime.title}</h1>
              </div>
              <div className="synopsis">
                <p>
                  {showMore
                    ? anime.synopsis?.substring(0, 270) + "..."
                    : anime.synopsis}
                  <button onClick={() => setShowMore(!showMore)}>
                    {showMore ? "Read More" : "Show Less"}
                  </button>
                </p>
              </div>
              <div className="infomation">
                <ul>
                  <p>
                    <b>Aired : </b> {anime.aired}
                  </p>
                  <p>
                    <b>Rating : </b>
                    {anime.rating}
                  </p>
                  <p>
                    <b>Status : </b>
                    {anime.status}
                  </p>
                  <p>
                    <b>Score : </b>
                    {anime.score}
                  </p>
                  <p>
                    <b>Episodes : </b>
                    {anime.episodes} episodes
                  </p>
                  <p>
                    <b>Duration : </b>
                    {anime.duration}
                  </p>
                  <p>
                    <b>Season : </b>
                    {anime.season}
                  </p>
                  <p>
                    <b>Genres : </b>
                    {anime.genres}
                  </p>
                  <p>
                  <b>
                    Rating :
                    <div className="rating-star">
                      <PinkStars value={starsCount} inactiveColor="#C0C0C0" activeColor="#f7a6b9"/>
                    </div>
                  </b>
                </p>
                  <p>
                    <img src="/sharp-logo.png" alt="Sharp Logo" />
                  </p>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </StyledSlide>
      <StyledComment>
        <Comments animeId={accessDbId} />
        <CommentForm
          animeId={accessDbId}
          addCommentToState={addCommentToState}
        />
      </StyledComment>
    </>
  );
}

const StyledSlide = styled.div`
  /*anime details*/
  .container--anime {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #f7a6b9 -20%, black 50%);
    height: 600px;
    padding: 0px 50px 0 50px;
  }
  .container--anime--image {
    width: 40%;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .container--anime--image img {
    --c: #f7a6b9; /* สีขอบ */
    --b: 10px; /* ความหนาขอบ */
    --g: 5px; /* ช่องว่างเมื่อโฮเวอร์ */
    --_g: #0000 25%, var(--c) 0;
    width: 420px;
    height: 594px;
    transform: scale(1);
    transition: all ease 0.2s;
    border-radius: 5px;
    object-fit: cover;
    object-position: 100% 30%;
    cursor: pointer;
    padding: calc(var(--g) + var(--b));
    background: conic-gradient(
          from 180deg at top var(--b) right var(--b),
          var(--_g)
        )
        var(--_i, 200%) 0 / 200% var(--_i, var(--b)) no-repeat,
      conic-gradient(at bottom var(--b) left var(--b), var(--_g)) 0
        var(--_i, 200%) / var(--_i, var(--b)) 200% no-repeat;
    transition: 0.3s, background-position 0.3s 0.3s;
  }
  .container--anime--image img:hover {
    --_i: 100%;
    transition: 0.3s, background-size 0.3s 0.3s;
  }

  .container--anime--details {
    color: #fff;
    background-color: transparent;
    width: 60%;
    height: 500px;
  }
  .container--anime--details .infomation {
    display: flex;
    flex-direction: column;
    padding: 0 30px 0 30px;
  }
  .container--anime--details .title {
    color: #f7a6b9;
    display: flex;
    flex-direction: row;
    justify-content: center;
    list-style: none;
    background-color: transparent;
  }
  .container--anime--details .title {
    padding: 0 10px 0 10px;
    font-size: 16px;
  }
  .container--anime--details .synopsis {
    text-align: left;
    font-size: 16px;
    padding: 30px;
  }

  .container--anime--details .synopsis button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-weight: 600;
    color: #f7a6b9;
  }

  .container--anime--details .infomation {
    text-align: left;
    font-size: 16px;
  }
  .container--anime--details .infomation b {
    color: #f7a6b9;
  }

  .infomation ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    list-style: none;
    padding: 0;
  }
  .infomation ul img {
    width: 250px;
    float: right;
  }
  .container--anime--details .rating {
    display: flex;
    flex-direction: row;
    margin: 0 30px 0 30px;
    align-items: center;
  }
  .container--anime--details .rating p {
    padding-top: 10px;
  }
  .container--anime--details .rating-star {
    padding: 20px;
    font-size: 30px;
    color: #f7a6b9;
  }
`;

const StyledComment = styled.div`
  /*review*/
  .container--review {
    margin: 0 20px 20px 20px;
    color: #fff;
    background-color: transparent;
  }

  .container--review .heading {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }

  .container--review .heading p {
    padding-top: 15px;
    margin-left: 5px;
  }

  .container--review--box {
    background: #ffffff38;
    margin: 0 20px 20px 0;
    border-radius: 10px;
    padding: 20px;
    width: 100%;
  }

  .container--review--box .name {
    display: flex;
    flex-direction: row;
    font-size: 20px;
    color: #f7a6b9;
  }

  .container--review--box .name p {
    padding-left: 30px;
    color: #fff;
  }

  .container--review--box .comment {
    display: flex;
    flex-direction: column;
    padding-left: 100px;
    font-size: 20px;
    width: 100%;
    height: 50px;
  }

  .container--review--box .rating {
    display: flex;
    flex-direction: row;
    font-size: 20px;
    align-items: center;
    color: #f7a6b9;
  }

  .container--review--box .rating-star {
    padding-left: 20px;
    font-size: 30px;
    color: #f7a6b9;
  }

  .container--review--box .count {
    position: absolute;
    right: 50px;
    transform: translateY(-100%);
    font-size: 40px;
    color: #f7a6b9;
    font-weight: bold;
  }

  /*comment*/
  .container--comment {
    margin: 20px;
    color: #fff;
  }

  .container--comment h1 {
    margin-bottom: 20px;
  }

  .container--comment--box {
    padding: 20px;
    background-color: #1e1e1e;
    border-radius: 5px;
  }

  .container--comment--box .typename {
    width: 100%;
    height: 50px;
    background: #ffffff38;
    display: flex;
    justify-content: center;
    border-radius: 10px;
  }

  .container--comment--box .typecomment {
    width: 100%;
    height: 100px;
    background: #ffffff38;
    border-radius: 10px;
    margin: 20px 0 20px 0;
    display: flex;
    padding-top: 20px;
  }

  .container--comment--box input,
  textarea {
    background: transparent;
    width: auto;
    flex: 1;
    border: 0;
    outline: none;
    font-size: 15px;
    font-family: "Inter", sans-serif;
    color: #fff;
    padding-left: 20px;
  }

  .container--comment--box ::placeholder {
    color: #fff;
  }

  .container--comment--box .rating {
    display: flex;
    flex-direction: row;
    font-size: 20px;
    align-items: center;
  }

  .container--comment--box .rating-star {
    font-size: 30px;
    color: #f7a6b9;
    padding-left: 20px;
  }

  .container--comment--box .button {
    position: absolute;
    right: 40px;
    transform: translateY(-80%);
  }

  .container--comment--box button {
    font-size: 25px;
    font-weight: bold;
    color: #f7a6b9;
    border: 3px solid #f7a6b9;
    background: transparent;
    border-radius: 50px;
    padding: 10px 16px;
    cursor: pointer;
    transition: all ease 0.5s;
  }

  .container--comment--box button:hover {
    color: #ffffff;
    background: #ff0582;
    transition: all ease 0.5s;
  }

  .topBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .container--review--box .name {
    display: flex;
    align-items: center;
    margin-right: auto; /* Pushes the icons to the right */
  }

  .container--review--box .icon {
    display: flex;
    align-items: center;
  }

  .container--review--box .icon i {
    width: 35px; /* Set a fixed width for the icon */
    height: 35px; /* Set a fixed height for the icon */
    font-size: 15px;
    cursor: pointer;
    transition: color 0.3s;
    color: #f7a6b9;
    border: solid 2.5px #f7a6b9;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container--review--box .icon i:not(:last-child) {
    margin-right: 10px; /* Add equal spacing between icons */
  }

  .container--review--box .icon i:hover {
    color: #fff;
    background-color: #ff0582;
  }

  /* edit mode */
  .container--review--box .edit-mode {
    position: relative;
    margin: 30px 0;
    width: 100%;
    height: 100px;
    background: #ffffff38;
    border-radius: 10px;
  }

  .container--review--box .edit-fields textarea {
    background-color: transparent;
    width: calc(100% - 170px); /* Adjusted width calculation */
    padding: 20px; /* Equal padding on all sides */
    resize: none;
    margin: 10px;
  }

  .container--review--box .edit-fields textarea:focus {
    outline: none;
  }

  .container--review--box .edit-buttons {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 0; /* Position buttons at the bottom */
    right: 0; /* Align buttons to the right */
    margin: 10px; /* Equal margin for all sides */
  }

  .container--review--box .edit-buttons .save-button,
  .container--review--box .edit-buttons .cancel-button {
    font-size: 15px;
    font-weight: bold;
    color: #fff;
    border: 2px solid #f7a6b9;
    background: transparent;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    transition: all ease 0.3s;
    margin-left: 10px;
  }

  .container--review--box .edit-buttons .save-button:hover,
  .container--review--box .edit-buttons .cancel-button:hover {
    color: #ffffff;
    background: #ff0582;
    transition: all ease 0.3s;
  }
`;

const PinkStars = styled(BeautyStars)`
  
`;
