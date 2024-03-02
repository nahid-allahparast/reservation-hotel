import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import ListLocation from "./components/ListLocation/ListLocation";

function App() {
  return (
    <div>
      <Toaster />
      <Header />
      <ListLocation/>
    </div>
  );
}

export default App;
