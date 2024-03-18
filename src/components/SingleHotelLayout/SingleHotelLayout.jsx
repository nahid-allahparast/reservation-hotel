import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useHotel } from "../../context/HotelsProvider";

const SingleHotelLayout = () => {
  const { hotels } = useHotel();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocation={hotels} />
    </div>
  );
};

export default SingleHotelLayout;
