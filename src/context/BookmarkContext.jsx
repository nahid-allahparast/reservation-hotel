import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Based_URL = "http://localhost:5000";
const BookmarkContext = createContext();
const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: {},
  error: "",
};

const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "bookmarks/loaded":
      return { ...state, bookmarks: action.payload, isLoading: false };
    case "bookmark/loaded":
      return { ...state, currentBookmark: action.payload, isLoading: false };
    case "bookmark/created":
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload],
        isLoading: false,
        currentBookmark: action.payload,
      };

    case "bookmark/deleted":
      return {
        ...state,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
        isLoading: false,
      };
    case "rejected":
      return { ...state, error: action.paload };
    default:
      throw new Error("Unknown action");
  }
};

const BookmarksProvider = ({ children }) => {
  const [{ bookmarks, isLoading, currentBookmark, error }, dispatch] =
    useReducer(bookmarkReducer, initialState);
  // const [currentBookmark, setCurrentBookmark] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  // const [bookmarks, setBookmarks] = useState([]);
  // const { isLoading, data: bookmarks } = useFetch(`${Based_URL}/bookmarks`);
  useEffect(() => {
    const getBookmarksList = async () => {
      dispatch({ type: "loading" });
      // setIsLoading(true);
      try {
        const { data } = await axios.get(`${Based_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
        // setBookmarks(data);
      } catch (error) {
        toast.error(error.message);
        dispatch({ type: "rejected", payload: "some thing is wrong" });
      }
    };
    getBookmarksList();
  }, []);

  const getBookmark = async (id) => {
    if (Number(id) === currentBookmark?.id) return;
    // setIsLoading(true);
    dispatch({ type: "bookmark/loaded" });
    try {
      const { data } = await axios.get(`${Based_URL}/bookmarks/${id}`);
      // setCurrentBookmark(data);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: "ther is no bookmark" });
    }
  };
  const createNewBookmark = async (newBookmark) => {
    try {
      const { data } = await axios.post(`${Based_URL}/bookmarks/`, newBookmark);
      // setBookmarks((prev) => [...prev, data]);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: "did not add!" });
    }
  };
  const deletHandler = async (id) => {
    // setIsLoading(true);
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${Based_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      toast.error(error.message);
    }
    // setBookmarks((prev) => prev.filter((item) => item.id !== id));
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
