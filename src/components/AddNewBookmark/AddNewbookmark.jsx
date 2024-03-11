import { useEffect, useState } from "react";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";
import toast from "react-hot-toast";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../../context/BookmarkContext";
const BASE_GEOCODDING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

const AddNewBookmark = () => {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [geoLocationError, setGeoLocationError] = useState(null);
  const { createNewBookmark } = useBookmark();
  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchLocatinData() {
      setIsLoading(true);
      setGeoLocationError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODDING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "This Location is not a country please Click somewhere else!"
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeoLocationError(error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLocatinData();
  }, [lat, lng]);
  if (isLoading) return <Loader />;
  if (geoLocationError) return <p>{geoLocationError}</p>;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!cityName || !country) {
      return toast.error("Please ENTER a city or a country ");
    }
    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };
    await createNewBookmark(newBookmark);
    navigate("/bookmarks")
  };
  return (
    <div>
      <h2>Bookmark new Location</h2>
      <form className="form" onSubmit={submitHandler}>
        <div className="formControl">
          <label htmlFor="cityName">city</label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            name="cityName"
            id="cityName"
          />
        </div>
        <div className="formControl">
          <label htmlFor="countryName">country</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            name="countryName"
            id="countryName"
          />
          <ReactCountryFlag className="flag" svg countryCode={countryCode} />
        </div>
        <div className="buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="btn btn--back"
          >
            &larr; Back
          </button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewBookmark;
