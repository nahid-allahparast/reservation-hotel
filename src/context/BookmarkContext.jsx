import { createContext, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const Based_URL = "http://localhost:5000";
const BookmarkContext = createContext();

const BookmarksProvider = ({ children }) => {
  const [currentBookmark, setCurrentBookmark] = useState({});
  const [isLoadingCurrentBookmark, setIsLoadingCurrentBookmark] =
    useState(false);
  const { isLoading, data: bookmarks } = useFetch(`${Based_URL}/bookmarks`);
  const getBookmark = async (id) => {
    setIsLoadingCurrentBookmark(true);
    try {
      const { data } = await axios.get(`${Based_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingCurrentBookmark(false);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        isLoadingCurrentBookmark,
        currentBookmark,
        getBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarksProvider;

export const useBookmark = () => {
  return useContext(BookmarkContext);
};
