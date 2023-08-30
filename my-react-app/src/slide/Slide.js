import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const StyledSlide = styled.div`
    body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, #f7a6b9 -20%, black 50%);
    }

    header {
      position: fixed;
      z-index: 999;
      top: 0;
      left: 0;
      right: 0;
      height: 70px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 30px;
      background: black;
      transition: all ease 0.5s;
    }
    .header--logo {
      display: flex;
      align-items: center;
    }

    .header--logo a {
      text-decoration: none;
    }

    .header--logo img {
      width: 200px;
      height: auto;
      cursor: pointer;
    }

    .header--category {
      color: #f7a6b9;
      text-decoration: none;
      font-size: 20px;
      margin: 20px;
    }

    .header--category--genres {
      color: #fff;
      text-decoration: none;
      font-size: 15px;
      padding-top: 5px;
    }

    .header--searchbar {
      width: 100%;
      max-width: 20%;
      height: 50%;
      background: #f7a6b9;
      display: flex;
      align-items: center;
      border-radius: 60px;
      padding-right: 1%;
      padding-left: 10px;
      margin-left: auto;
    }

    .header--searchbar input {
      background: transparent;
      flex: 1;
      border: 0;
      outline: none;
      font-size: 15px;
      color: #fff;
    }

    .header--searchbar ::placeholder {
      color: #fff;
    }

    .header--searchbar button img {
      width: 25px;
      transition: filter 0.3s;
    }

    .header--searchbar button {
      border: 0;
      border-radius: 50%;
      cursor: pointer;
      background: transparent;
    }

    .header--searchbar button:hover img {
      filter: invert(100%) sepia(50%) saturate(50%);
    }
    /*anime details*/
    .container--anime {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      height: 1000px;
      padding: 0 30px 0 30px;
      margin: 30px 50px;
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
      width: 100px;
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
      padding-left: 20px;
      font-size: 30px;
      color: #f7a6b9;
    }

    .container--anime--details .logo {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin-right: 10px;
    }
    .container--anime--details .logo img {
      width: 230px;
    }
    .trailer-container {
      padding: 5px 5px 5px 5px;
      position: relative;
      background: linear-gradient(to right, #f7a6b9, #ff0582);
    }
  `;

export default function Slide() {
  
  const [showMore, setShowMore] = useState(false);
  const currentAnimeId = 5114; // รหัสอนิเมะที่ใช้ในการดึงข้อมูล
  // สร้าง state เพื่อเก็บข้อมูลอนิเมะ
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
  // ใช้ useEffect เพื่อดึงข้อมูลอนิเมะเมื่อคอมโพเนนต์โหลด
  useEffect(() => {
    const fetchAnimeData = async () => {
      const apiUrl = `https://api.jikan.moe/v4/anime/${currentAnimeId}/full`;

      try {
        const response = await axios.get(apiUrl); // ส่งคำขอ GET ไปยัง API
        const animeData = response.data.data; // ข้อมูลอนิเมะที่ได้รับจาก API
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
        }); // อัปเดต state ด้วยข้อมูลอนิเมะ
        console.log(animeData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnimeData(); // เรียกใช้ฟังก์ชันเมื่อคอมโพเนนต์โหลด
  }, []); // [] คือ dependency array เปล่าๆ หมายถึงให้ useEffect ทำงานเมื่อคอมโพเนนต์โหลดครั้งเดียว

  console.log("tr: " + anime.trailer.youtube_id);

  // ตรวจสอบว่าควรแสดงวิดีโอตัวอย่างหรือไม่
  const shouldShowTrailer =
    anime.trailer && anime.trailer.youtube_id && !anime.trailer.error;

  return (
    <>
      <StyledSlide>
        <header>
          <div className="header--logo">
            <a href="/">
              <img src="round-logo.png" alt="Logo" />
            </a>
          </div>
          <a className="header--category" href="/">
            หมวดหมู่
          </a>
          <a className="header--category--genres" href="/">
            แฟนตาซี
          </a>
          <form action="" className="header--searchbar">
            <input type="text" placeholder="Search.." />
            <button type="submit">
              <img src="search.png" alt="img" />
            </button>
          </form>
        </header>

        <body>
          <br />
          <br />
          <br />
          <br />

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
                      <b>Rating : </b> ★★★★☆
                    </p>
                    <p>
                      <img src="sharp-logo.png" alt="Sharp Logo" />
                    </p>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </body>
      </StyledSlide>
    </>
  );
}
