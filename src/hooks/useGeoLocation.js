import { useState } from "react";

const useGeoLocation = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPositon] = useState({});

  const getGeoPosition = () => {
    if (!navigator.geolocation)
      return setError("Your browser does not support geo location");
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPositon({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  };
  return { isLoading, position, getGeoPosition, error };
};

export default useGeoLocation;
