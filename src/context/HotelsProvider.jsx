import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const Based_URL = "http://localhost:5000/hotels";
const HotelContext = createContext();

const Hotelsprovider = ({ children }) => {
  const [currentHotel, setCurrentHotel] = useState({});
  const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.Room;
  const { isLoading, data: hotels } = useFetch(
    Based_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
  const getSingleHotel = async (id) => {
    setIsLoadingCurrentHotel(true);
    try {
      const { data } = await axios.get(`${Based_URL}/${id}`);
      setCurrentHotel(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingCurrentHotel(false);
    }
  };

  return (
    <HotelContext.Provider
      value={{
        isLoading,
        hotels,
        isLoadingCurrentHotel,
        currentHotel,
        getSingleHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export default Hotelsprovider;

export const useHotel = () => {
  return useContext(HotelContext);
};
