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
import SingleBookMark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewbookmark";
import Login from "./components/Login/Login";
import AuthProvider from "./context/AuthProvider";
import ProtectedRouts from "./components/ProtectedRouts/ProtectedRouts";

function App() {
  return (
    <AuthProvider>
      <BookmarksProvider>
        <Hotelsprovider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<ListLocation />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index path="/hotels" element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route
              path="/bookmarks"
              element={
                <ProtectedRouts>
                  <BookmarkLayout />
                </ProtectedRouts>
              }
            >
              <Route index element={<Bookmarklist />} />
              <Route path=":id" element={<SingleBookMark />} />
              <Route path="add" element={<AddNewBookmark />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Routes>
          {/* <ListLocation/> */}
        </Hotelsprovider>
      </BookmarksProvider>
    </AuthProvider>
  );
}

export default App;
