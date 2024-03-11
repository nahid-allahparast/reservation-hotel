import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const Based_URL = "http://localhost:5000";
const BookmarkContext = createContext();

const BookmarksProvider = ({ children }) => {
  const [currentBookmark, setCurrentBookmark] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  // const { isLoading, data: bookmarks } = useFetch(`${Based_URL}/bookmarks`);
  useEffect(() => {
    const getBookmarksList = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${Based_URL}/bookmarks`);
        setBookmarks(data)
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getBookmarksList();
  }, []);

  const getBookmark = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${Based_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const createNewBookmark = async (newBookmark) => {
    try {
      const { data } = await axios.post(`${Based_URL}/bookmarks/`, newBookmark);
      setCurrentBookmark(data);
      console.log(data);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        currentBookmark,
        getBookmark,
        createNewBookmark,
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
