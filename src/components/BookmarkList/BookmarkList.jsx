import { Link } from "react-router-dom";
import { useBookmark } from "../../context/BookmarkContext";
import Loader from "../Loader";
import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";

const Bookmarklist = () => {
  const { isLoading, bookmarks, currentBookmark, deletHandler } = useBookmark();

  const onDelete = async (e, id) => {
    e.preventDefault();
    await deletHandler(id);
  };
  if (isLoading) return <Loader />;

  if (!bookmarks.length)
    return <p style={{ color: "red" }}>Ther is no bookmark yet !</p>;
  return (
    <div>
      <h2>Bookmark List</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => (
          <Link
            key={item.id}
            to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              className={`bookmarkItem ${
                item.id === currentBookmark.id && "current-bookmark"
              }`}
            >
              <div>
                <ReactCountryFlag svg countryCode={item.countryCode} />
                &nbsp;
                <strong>{item.cityName}</strong> &nbsp;
                <span>{item.country}</span>
              </div>
              <button onClick={(e) => onDelete(e, item.id)}>
                <HiTrash className="redIcon" />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Bookmarklist;
