import { Link, useParams } from "react-router-dom";
import Loader from "../Loader";
import { useHotel } from "../../context/HotelsProvider";

const Hotels = () => {
  const { isLoading, hotels, currentHotel } = useHotel();
  if (isLoading) return <Loader />;
  return (
    <div className="searchList">
      <h2>Search Result({hotels.length})</h2>
      {hotels.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/Hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              key={item.id}
              className={`searchItem ${
                currentHotel.id === item.id && "current-hotel"
              } `}
            >
              <img src={item.picture_url.url} />
              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  €&nbsp;{item.price}&nbsp; <span>night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Hotels;
