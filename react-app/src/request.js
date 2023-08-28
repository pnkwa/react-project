
// const baseURL = 'https://api.jikan.moe/v4/'

const requests = {
    fetchPopular: `top/anime?filter=bypopularity&limit=10`,
    fetchTopAiring: `top/anime?filter=airing&limit=10`,
    fetchTopAnime: `top/anime?filter=bypopularity&limit=10`,
    fetchAllTopAiring: `top/anime?filter=bypopularity`,
    // fetchWinterAnime: '/seasons/2022/winter',
    // fetchAutumnAnime: '/seasons/2022/spring',
    //fetchFallAnime:'/seasons/2022/Fall'
    // fetchSummerAnime:'/seasons/2022/summer',
    // ,

}

export default requests;
// https://api.jikan.moe/v4/seasons/{year}/{season}

// // Top 2022 Winter
// // Top 2022 Spring
// // Top 2022 Fall
// // Top 2022 Summer

// https://api.jikan.moe/v4/top/anime



// &genre=1