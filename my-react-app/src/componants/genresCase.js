export const getGenreFromId = (id) => {
    switch (id) {
      case "1":
        return "Action";
      case "2":
        return "Fantasy";
      case "3":
        return "Adventure";
      case "4":
        return "Romance";
      case "5":
        return "Drama";
      case "6":
        return "Comedy";
      case "7":
        return "Horror";
      case "8":
        return "Sports";
      default:
        return "Genres";
    }
  };