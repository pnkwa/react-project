import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pinkflix-review.css"; // Update the import path


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
        const response = await axios.get(apiUrl);// ส่งคำขอ GET ไปยัง API
        const animeData = response.data.data;// ข้อมูลอนิเมะที่ได้รับจาก API
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
          genres: animeData.genres.map(genre => genre.name).join(', '),
          trailer: animeData.trailer,
        });// อัปเดต state ด้วยข้อมูลอนิเมะ
        console.log(animeData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnimeData();// เรียกใช้ฟังก์ชันเมื่อคอมโพเนนต์โหลด
  }, []);// [] คือ dependency array เปล่าๆ หมายถึงให้ useEffect ทำงานเมื่อคอมโพเนนต์โหลดครั้งเดียว

  console.log("tr: "+anime.trailer.youtube_id);

  
// ตรวจสอบว่าควรแสดงวิดีโอตัวอย่างหรือไม่
  const shouldShowTrailer =
    anime.trailer && anime.trailer.youtube_id && !anime.trailer.error;

  return (
    <>
    <header>
      <div className="header--logo">
        <a href="/">
        <img src="round-logo.png" alt="Logo" />
        </a>
      </div>
      <a className="header--category" href="/">หมวดหมู่</a>
      <a className="header--category--genres" href="/">แฟนตาซี</a>
      <form action="" className="header--searchbar">
        <input type="text" placeholder="Search.." />
        <button type="submit">
          <img src="search.png" alt="img" />
        </button>
      </form>
    </header>

    <br/><br/><br/><br/>
    
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
              {showMore ? anime.synopsis?.substring(0, 270) + '...     ' : anime.synopsis}
              <button onClick={() => setShowMore(!showMore)}>
               {showMore ? 'Read More' : 'Show Less'}
              </button>
              </p>
              </div>
              <div className="infomation">
                <ul>
                <p><b>React.Aired : </b> {anime.aired}</p>
                  <p><b>Rating : </b>{anime.rating}</p>
                  <p><b>Status : </b>{anime.status}</p>
                  <p><b>Score : </b>{anime.score}</p>
                  <p><b>Episodes : </b>{anime.episodes} episodes</p>
                  <p><b>Duration : </b>{anime.duration}</p>
                  <p><b>Season : </b>{anime.season}</p>
                  <p><b>Genres : </b>{anime.genres}</p>
                  <p><b>Rating : </b> ★★★★☆</p>
                  <p><img src="sharp-logo.png" alt="Sharp Logo"/></p>
                </ul>
              </div>
            
          </div>
        </div>
      </div>
    </>
  );
}