import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import ListLocation from "./components/ListLocation/ListLocation";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import Hotelsprovider from "./context/HotelsProvider";

function App() {
  return (
    <Hotelsprovider>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<ListLocation />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index path="/hotels" element={<Hotels />} />
          <Route path=":id" element={<div>single hotel</div>} />
        </Route>
      </Routes>
      {/* <ListLocation/> */}
    </Hotelsprovider>
  );
}

export default App;
