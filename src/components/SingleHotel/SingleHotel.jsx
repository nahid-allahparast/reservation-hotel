import { useParams, useSearchParams } from "react-router-dom";
import Loader from "../Loader";
import { useHotel } from "../../context/HotelsProvider";
import { useEffect } from "react";

const SingleHotel = () => {
  const { id } = useParams();
  const { isLoadingCurrentHotel, currentHotel, getSingleHotel } = useHotel();
  useEffect(() => {
    getSingleHotel(id);
  }, [id]);
  if (isLoadingCurrentHotel || !currentHotel) return <Loader />;
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews} &bull; {currentHotel.smart_location}
        </div>
        <img src={currentHotel.xl_picture_url} />
      </div>
    </div>
  );
};

export default SingleHotel;
