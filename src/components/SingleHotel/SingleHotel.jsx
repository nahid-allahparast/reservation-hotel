import { useParams } from "react-router-dom";
import Loader from "../Loader";
import { useHotel } from "../../context/HotelsProvider";
import { useEffect } from "react";
import { CiAlignLeft, CiUnlock } from "react-icons/ci";

const SingleHotel = () => {
  const { id } = useParams();
  const { isLoadingCurrentHotel, currentHotel, getSingleHotel } = useHotel();

  useEffect(() => {
    getSingleHotel(id);
  }, [id]);
  if (isLoadingCurrentHotel || !currentHotel) return <Loader />;
  console.log(currentHotel.features);
  return (
    <div className="room">
      <div className="album" style={{ display: "flex" }}>
        <div className="firstPicture">
          <img src={currentHotel.picture_url.url} />
        </div>
        <div className="hotelAlbum">
          {currentHotel?.picture_detaile?.slice(0, 4).map((item, index) => (
            <div key={index} className="detailePicture">
              <img src={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="roomDetail">
        <div className="roomDetaileItem">
          <h2> {currentHotel.name}</h2>
          <p>
            {currentHotel.number_of_reviews} &bull;
            {currentHotel.smart_location}
          </p>
        </div>
        <div className="roomDetaileItem">
          <h2>Amenities</h2>
          {currentHotel?.amenities?.slice(0, 4).map((item, index) => (
            <div key={index}>
              <CiUnlock />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="roomDetaileItem">
          <h2>Features</h2>
          {currentHotel?.features?.map((item, index) => (
            <div key={index}>
              <CiUnlock />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;
