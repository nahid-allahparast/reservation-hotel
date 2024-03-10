import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import ListLocation from "./components/ListLocation/ListLocation";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import Hotelsprovider from "./context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import BookmarksProvider from "./context/BookmarkContext";
import Bookmarklist from "./components/BookmarkList/BookmarkList";

function App() {
  return (
    <BookmarksProvider>
      {" "}
      <Hotelsprovider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<ListLocation />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index path="/hotels" element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmarks" element={<BookmarkLayout />}>
            <Route index element={<Bookmarklist />} />
            <Route path=":id" element={<div>single bookmark</div>} />
            <Route path="add" element={<div>add Bookmark</div>} />
          </Route>
        </Routes>
        {/* <ListLocation/> */}
      </Hotelsprovider>
    </BookmarksProvider>
  );
}

export default App;
