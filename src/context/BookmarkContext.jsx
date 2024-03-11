import { createContext, useContext, useEffect, useState } from "react";
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
        setBookmarks(data);
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
      setBookmarks((prev) => [...prev, data]);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const deletHandler = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${Based_URL}/bookmarks/${id}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
    setBookmarks((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        currentBookmark,
        getBookmark,
        createNewBookmark,
        deletHandler,
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
