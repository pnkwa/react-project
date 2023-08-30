import Category from "./Category";
import { Link } from "react-router-dom";

function Navbar() {

  return (
    <>
      <header>
        <div className="header--logo">
          <Link to="/">
            <img src="/round-logo.png" alt="img" />
          </Link>
        </div>
        
        <Category />

        <form action="" className="header--searchbar">
          <input type="text" placeholder="Search.." />
          <button type="submit">
            <img src="/search.png" alt="img" />
          </button>
        </form>
      </header>
    </>
  );
}
export default Navbar;
