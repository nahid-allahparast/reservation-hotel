import { Link } from "react-router-dom";
import { useBookmark } from "../../context/BookmarkContext";
import Loader from "../Loader";
import ReactCountryFlag from "react-country-flag";

const Bookmarklist = () => {
  const { isLoading, bookmarks } = useBookmark();
  if (isLoading) return <Loader />;
  return (
    <div>
      <h2>Bookmark List</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => (
          <Link
            key={item.id}
            to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div className="bookmarkItem">
              <div>
                <strong>{item.cityName}</strong> &nbsp;
                <span>{item.country}</span>
              </div>
              <ReactCountryFlag svg countryCode={item.countryCode} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Bookmarklist;
