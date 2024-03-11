import { useEffect } from "react";
import { useBookmark } from "../../context/BookmarkContext";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";
import ReactCountryFlag from "react-country-flag";

const SingleBookMark = () => {
  const { id } = useParams();
  const { isLoading, currentBookmark, getBookmark } = useBookmark();
  const navigate = useNavigate();
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  if (isLoading || !currentBookmark) return <Loader />;
  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn btn--back">
        &larr; Back
      </button>
      <h2>{currentBookmark.country}</h2>
      <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
      <span>{currentBookmark.country}</span> - {currentBookmark.cityName}
    </div>
  );
};

export default SingleBookMark;
