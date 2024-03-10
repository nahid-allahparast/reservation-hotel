import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookmark } from "../../context/BookmarkContext";

const BookmarkLayout = ({ markerLocation }) => {
  const { bookmarks } = useBookmark();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocation={bookmarks} />
    </div>
  );
};

export default BookmarkLayout;
