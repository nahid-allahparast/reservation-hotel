import useFetch from "../../hooks/useFetch";

const ListLocation = () => {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");
  console.log(data);
  console.log(isLoading);
  if (isLoading) <p>Loading</p>;
  return (
    <div className="nearbyLocation">
      <h2>Nearby Location</h2>
      <div className="locationList"></div>
      {data.map((item) => {
        return (
          <div key={item.id} className="locationItem">
            <img src={item.picture_url.url} alt={item.name}></img>
            <div className="locationItemDesc">
              <p className="location">{item.smart_location}</p>
              <p className="name">{item.name}</p>
              <p className="price">
                €&nbsp;{item.price}&nbsp; <span>night</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListLocation;
